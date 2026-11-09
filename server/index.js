// Rather Party — лёгкий relay-сервер для онлайн-комнат (2–4 телефона).
// Сервер НЕ знает игровую логику: он только держит комнаты, кэширует последний
// снапшот состояния от хоста и пересылает сообщения между клиентами.

const express = require('express');
const http = require('http');
const cors = require('cors');
const { WebSocketServer, WebSocket } = require('ws');

const PORT = process.env.PORT || 3001;
const MAX_PLAYERS = 4;
const ROOM_TTL_MS = 2 * 60 * 60 * 1000; // авто-удаление комнаты после 2ч неактивности
const HEARTBEAT_MS = 25000;
const SWEEP_MS = 60000;
const CODE_ALPHABET = 'ABCDEFGHJKMNPQRSTUVWXYZ'; // без I/L/O — меньше путаницы при вводе

// rooms: Map<code, {
//   clients: Map<playerId, { ws, name, avatar, connected }>,
//   hostId: string,
//   state: object|null,      // последний снапшот GameStateStore от хоста
//   started: boolean,
//   lastActivity: number
// }>
const rooms = new Map();

const app = express();
app.use(cors());
app.get('/health', (req, res) => {
  res.json({ status: 'ok', rooms: rooms.size });
});

const server = http.createServer(app);
const wss = new WebSocketServer({ server });

function send(ws, msg) {
  if (ws && ws.readyState === WebSocket.OPEN) {
    ws.send(JSON.stringify(msg));
  }
}

function genCode() {
  let code = '';
  do {
    code = Array.from({ length: 4 },
      () => CODE_ALPHABET[Math.floor(Math.random() * CODE_ALPHABET.length)]).join('');
  } while (rooms.has(code));
  return code;
}

function roomPlayers(room) {
  return [...room.clients.entries()].map(([playerId, c]) => ({
    playerId,
    name: c.name,
    avatar: c.avatar,
    isHost: playerId === room.hostId,
    connected: c.connected
  }));
}

function broadcast(room, msg, exceptPlayerId = null) {
  const data = JSON.stringify(msg);
  for (const [pid, client] of room.clients) {
    if (pid === exceptPlayerId) continue;
    if (client.connected && client.ws.readyState === WebSocket.OPEN) {
      client.ws.send(data);
    }
  }
}

function touch(room) {
  room.lastActivity = Date.now();
}

function handleMessage(ws, msg) {
  switch (msg.type) {
    case 'PING':
      send(ws, { type: 'PONG' });
      return;

    case 'CREATE_ROOM': {
      const code = genCode();
      const room = {
        clients: new Map(),
        hostId: msg.playerId,
        state: null,
        started: false,
        lastActivity: Date.now()
      };
      room.clients.set(msg.playerId, {
        ws,
        name: String(msg.name || 'PLAYER').slice(0, 24),
        avatar: String(msg.avatar || '🎮').slice(0, 8),
        connected: true
      });
      rooms.set(code, room);
      ws.playerId = msg.playerId;
      ws.roomCode = code;
      send(ws, { type: 'ROOM_CREATED', roomCode: code, isHost: true, players: roomPlayers(room) });
      return;
    }

    case 'JOIN_ROOM': {
      const code = String(msg.roomCode || '').toUpperCase().trim();
      const room = rooms.get(code);
      if (!room) {
        send(ws, { type: 'ERROR', code: 'ROOM_NOT_FOUND', message: 'Room not found. Check the code.' });
        return;
      }
      const existing = room.clients.get(msg.playerId);
      if (!existing) {
        if (room.clients.size >= MAX_PLAYERS) {
          send(ws, { type: 'ERROR', code: 'ROOM_FULL', message: 'Room is full (4 players max).' });
          return;
        }
        if (room.started) {
          send(ws, { type: 'ERROR', code: 'GAME_IN_PROGRESS', message: 'This game already started.' });
          return;
        }
      }

      if (existing) {
        // Переподключение: заменяем сокет, помечаем онлайн
        existing.ws = ws;
        existing.connected = true;
        if (msg.name) existing.name = String(msg.name).slice(0, 24);
        if (msg.avatar) existing.avatar = String(msg.avatar).slice(0, 8);
      } else {
        room.clients.set(msg.playerId, {
          ws,
          name: String(msg.name || 'PLAYER').slice(0, 24),
          avatar: String(msg.avatar || '🎮').slice(0, 8),
          connected: true
        });
      }
      ws.playerId = msg.playerId;
      ws.roomCode = code;
      touch(room);

      send(ws, {
        type: 'ROOM_JOINED',
        roomCode: code,
        isHost: msg.playerId === room.hostId,
        players: roomPlayers(room),
        state: room.state // снапшот для восстановления после переподключения
      });
      broadcast(room, { type: 'LOBBY_UPDATE', players: roomPlayers(room) }, msg.playerId);
      if (existing && msg.playerId === room.hostId) {
        broadcast(room, { type: 'HOST_BACK' }, msg.playerId);
      }
      return;
    }

    case 'LEAVE_ROOM': {
      const room = rooms.get(ws.roomCode);
      if (!room) return;
      room.clients.delete(ws.playerId);
      touch(room);
      broadcast(room, { type: 'PLAYER_LEFT', playerId: ws.playerId, players: roomPlayers(room) });
      if (ws.playerId === room.hostId) {
        broadcast(room, { type: 'HOST_LEFT' });
      }
      if (room.clients.size === 0) {
        rooms.delete(ws.roomCode);
      }
      ws.roomCode = null;
      return;
    }

    case 'STATE_SYNC': {
      const room = rooms.get(ws.roomCode);
      if (!room || ws.playerId !== room.hostId) return;
      room.state = msg.state;
      room.started = true;
      touch(room);
      broadcast(room, { type: 'STATE_SYNC', state: msg.state }, ws.playerId);
      return;
    }

    case 'CLIENT_ACTION': {
      const room = rooms.get(ws.roomCode);
      if (!room || !ws.playerId || !room.clients.has(ws.playerId)) return;
      touch(room);
      // Релей всем остальным: хост применяет игровые действия,
      // эфемерные UI-события рендерят все клиенты напрямую.
      broadcast(room, { type: 'CLIENT_ACTION', from: ws.playerId, action: msg.action }, ws.playerId);
      return;
    }
  }
}

function handleDisconnect(ws) {
  const room = ws.roomCode && rooms.get(ws.roomCode);
  if (!room) return;
  const client = room.clients.get(ws.playerId);
  if (!client || client.ws !== ws) return; // сокет уже заменён переподключением
  client.connected = false;
  touch(room);
  if (ws.playerId === room.hostId) {
    broadcast(room, { type: 'HOST_LEFT' });
  } else {
    broadcast(room, { type: 'PLAYER_LEFT', playerId: ws.playerId, players: roomPlayers(room) });
  }
}

wss.on('connection', (ws) => {
  ws.isAlive = true;
  ws.playerId = null;
  ws.roomCode = null;

  ws.on('pong', () => { ws.isAlive = true; });
  ws.on('message', (raw) => {
    let msg;
    try { msg = JSON.parse(raw); } catch { return; }
    try { handleMessage(ws, msg); } catch (err) { console.error('Message handling error:', err); }
  });
  ws.on('close', () => handleDisconnect(ws));
});

// Heartbeat: сервер пингует клиентов каждые 25с, мёртвые сокеты убиваются.
setInterval(() => {
  wss.clients.forEach((ws) => {
    if (!ws.isAlive) return ws.terminate();
    ws.isAlive = false;
    ws.ping();
  });
}, HEARTBEAT_MS);

// Уборка комнат: 2 часа без единого сообщения — комната удаляется.
setInterval(() => {
  const now = Date.now();
  for (const [code, room] of rooms) {
    if (now - room.lastActivity > ROOM_TTL_MS) {
      broadcast(room, { type: 'ROOM_CLOSED', reason: 'expired' });
      rooms.delete(code);
    }
  }
}, SWEEP_MS);

server.listen(PORT, () => {
  console.log(`Rather Party relay server listening on port ${PORT}`);
});
