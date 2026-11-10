// Smoke-тест reconnect-сценариев relay-сервера.
// Запуск:
//   HOST_GRACE_MS=3000 npm start          # терминал 1 (короткая пауза хоста)
//   node test-reconnect.mjs               # терминал 2
// Проверяет: rejoin по playerId, кэш state, PLAYER_LEFT/HOST_LEFT,
// закрытие комнаты после grace и по явному выходу хоста,
// GAME_IN_PROGRESS + claimable и вход на своё место (claimSeat-путь).

import WebSocket from 'ws';

const URL = process.env.WS_URL || 'ws://localhost:3001';
const GRACE_WAIT = (parseInt(process.env.HOST_GRACE_MS, 10) || 3000) + 2500;

let pass = 0, fail = 0;
const ok = (cond, label, extra = '') => {
  if (cond) { pass++; console.log('  ok', label); }
  else { fail++; console.log('  FAIL', label, extra); }
};

function client(tag) {
  const ws = new WebSocket(URL);
  const c = { ws, tag, inbox: [] };
  ws.on('message', raw => {
    try { c.inbox.push(JSON.parse(raw)); } catch (e) {}
  });
  return c;
}

const send = (c, msg) => c.ws.send(JSON.stringify(msg));

// Ждём сообщение типа type (до timeoutMs), возвращаем само сообщение или null.
function waitFor(c, type, timeoutMs = 3000, pred = null) {
  return new Promise(resolve => {
    const started = Date.now();
    const iv = setInterval(() => {
      const idx = c.inbox.findIndex(m => m.type === type && (!pred || pred(m)));
      if (idx !== -1) {
        clearInterval(iv);
        resolve(c.inbox.splice(idx, 1)[0]);
      } else if (Date.now() - started > timeoutMs) {
        clearInterval(iv);
        resolve(null);
      }
    }, 25);
  });
}

const open = (c) => waitForOpenWs(c.ws);
function waitForOpenWs(ws) {
  return new Promise(resolve => {
    if (ws.readyState === WebSocket.OPEN) return resolve();
    ws.once('open', resolve);
  });
}

const sleep = (ms) => new Promise(r => setTimeout(r, ms));

async function scenarioGuestReconnect() {
  console.log('— guest reconnect + state cache —');
  const host = client('host');
  await open(host);
  send(host, { type: 'CREATE_ROOM', playerId: 'host1', name: 'HOST', avatar: '👑' });
  const created = await waitFor(host, 'ROOM_CREATED');
  ok(created && created.roomCode, 'host: ROOM_CREATED');
  const code = created.roomCode;

  const guest = client('guest');
  await open(guest);
  send(guest, { type: 'JOIN_ROOM', roomCode: code, playerId: 'guest1', name: 'GUEST', avatar: '🦊' });
  const joined = await waitFor(guest, 'ROOM_JOINED');
  ok(joined && joined.roomCode === code && joined.isHost === false, 'guest: ROOM_JOINED as guest');

  send(host, { type: 'STATE_SYNC', state: { phase: 'PICKING', match: { round: 1 } } });
  const sync = await waitFor(guest, 'STATE_SYNC');
  ok(sync && sync.state && sync.state.phase === 'PICKING', 'guest: STATE_SYNC received');

  // Гость «погас» — сокет умер. Сервер помечает offline и шлёт PLAYER_LEFT.
  guest.ws.terminate();
  const left = await waitFor(host, 'PLAYER_LEFT');
  ok(left && left.playerId === 'guest1', 'host: PLAYER_LEFT on guest drop');
  const roster = left && left.players.find(p => p.playerId === 'guest1');
  ok(roster && roster.connected === false, 'roster marks guest offline');

  // Гость вернулся тем же playerId — получает кэшированный state.
  const guest2 = client('guest2');
  await open(guest2);
  send(guest2, { type: 'JOIN_ROOM', roomCode: code, playerId: 'guest1', name: 'GUEST', avatar: '🦊' });
  const rejoined = await waitFor(guest2, 'ROOM_JOINED');
  ok(rejoined && rejoined.state && rejoined.state.phase === 'PICKING',
    'guest rejoin: cached state restored');

  // Незнакомый playerId в начатую комнату — GAME_IN_PROGRESS + claimable.
  const stranger = client('stranger');
  await open(stranger);
  send(stranger, { type: 'JOIN_ROOM', roomCode: code, playerId: 'newbie', name: 'NEW', avatar: '👽' });
  const err = await waitFor(stranger, 'ERROR');
  ok(err && err.code === 'GAME_IN_PROGRESS', 'stranger: GAME_IN_PROGRESS');
  ok(err && Array.isArray(err.claimable) && err.claimable.length === 0,
    'claimable empty — все места онлайн', JSON.stringify(err && err.claimable));

  // Гость снова «погас» → его место становится claimable.
  guest2.ws.terminate();
  await waitFor(host, 'PLAYER_LEFT');
  const stranger2 = client('stranger2');
  await open(stranger2);
  send(stranger2, { type: 'JOIN_ROOM', roomCode: code, playerId: 'newbie2', name: 'NEW', avatar: '👽' });
  const err2 = await waitFor(stranger2, 'ERROR');
  ok(err2 && err2.code === 'GAME_IN_PROGRESS', 'stranger2: GAME_IN_PROGRESS');
  const seat = err2 && err2.claimable && err2.claimable.find(p => p.name === 'GUEST');
  ok(!!seat && seat.playerId === 'guest1', 'claimable exposes offline seat');

  // Reclaim: входим под playerId места → штатный rejoin с кэшем.
  send(stranger2, { type: 'JOIN_ROOM', roomCode: code, playerId: seat ? seat.playerId : 'x', name: 'GUEST', avatar: '🦊' });
  const claimed = await waitFor(stranger2, 'ROOM_JOINED');
  ok(claimed && claimed.state && claimed.state.phase === 'PICKING',
    'claim seat: rejoined under old playerId with state');

  return { code, hostWs: host };
}

async function scenarioHostGone() {
  console.log('— host gone: pause then ROOM_CLOSED —');
  const host = client('host');
  await open(host);
  send(host, { type: 'CREATE_ROOM', playerId: 'host2', name: 'HOST', avatar: '👑' });
  const created = await waitFor(host, 'ROOM_CREATED');
  const code = created.roomCode;

  const guest = client('guest');
  await open(guest);
  send(guest, { type: 'JOIN_ROOM', roomCode: code, playerId: 'guest2', name: 'GUEST', avatar: '🐼' });
  await waitFor(guest, 'ROOM_JOINED');

  host.ws.terminate();
  const hostLeft = await waitFor(guest, 'HOST_LEFT');
  ok(!!hostLeft, 'guest: HOST_LEFT on host drop');

  const closed = await waitFor(guest, 'ROOM_CLOSED', GRACE_WAIT);
  ok(closed && closed.reason === 'host_gone', 'guest: ROOM_CLOSED host_gone after grace');

  // Опоздавший хост — комнаты уже нет.
  const lateHost = client('lateHost');
  await open(lateHost);
  send(lateHost, { type: 'JOIN_ROOM', roomCode: code, playerId: 'host2', name: 'HOST', avatar: '👑' });
  const err = await waitFor(lateHost, 'ERROR');
  ok(err && err.code === 'ROOM_NOT_FOUND', 'late host: ROOM_NOT_FOUND');
}

async function scenarioHostLeave() {
  console.log('— host explicit LEAVE closes room instantly —');
  const host = client('host');
  await open(host);
  send(host, { type: 'CREATE_ROOM', playerId: 'host3', name: 'HOST', avatar: '👑' });
  const created = await waitFor(host, 'ROOM_CREATED');
  const code = created.roomCode;

  const guest = client('guest');
  await open(guest);
  send(guest, { type: 'JOIN_ROOM', roomCode: code, playerId: 'guest3', name: 'GUEST', avatar: '🐱' });
  await waitFor(guest, 'ROOM_JOINED');

  send(host, { type: 'LEAVE_ROOM', roomCode: code, playerId: 'host3' });
  const closed = await waitFor(guest, 'ROOM_CLOSED');
  ok(closed && closed.reason === 'host_left', 'guest: ROOM_CLOSED host_left immediately');

  const timerCheck = await waitFor(guest, 'ROOM_CLOSED', 500);
  ok(!timerCheck, 'no second ROOM_CLOSED');
}

(async () => {
  try {
    await scenarioGuestReconnect();
    await scenarioHostGone();
    await scenarioHostLeave();
  } catch (e) {
    fail++;
    console.error('Scenario crashed:', e);
  }
  console.log(`\n=== ${pass} PASS / ${fail} FAIL ===`);
  process.exit(fail ? 1 : 0);
})();
