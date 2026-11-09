# Rather Party — Online Relay Server

Tiny WebSocket room relay for the online mode (2–4 phones). It does **not** contain
game logic: the host player's browser is the referee. The server only manages
rooms, relays messages and caches the latest state snapshot for reconnects.

## Run locally

```bash
cd server
npm install
npm start        # listens on PORT or 3001
```

Client runs separately, e.g. from the repo root:

```bash
python -m http.server 8000
# open http://localhost:8000 — the client auto-uses ws://localhost:3001
```

## Deploy on Render (free Web Service)

1. Push the repo to GitHub.
2. Render Dashboard → **New → Web Service** → connect the repo.
3. Set **Root Directory** to `server`.
4. Build Command: `npm install`
5. Start Command: `npm start`
6. Instance type: **Free**.
7. After deploy, copy your service URL (e.g. `https://rather-party-server.onrender.com`)
   and set it as `DEFAULT_WS_URL` in `src/core/GameConfig.js`
   (use `wss://` scheme: `wss://rather-party-server.onrender.com`).

You can also override the server at runtime without redeploying:

```
https://your-game-url/?server=your-service.onrender.com
```

## Notes

- Free tier sleeps after ~15 min idle; first `/health` request wakes it (the client
  pings `/health` silently on page load so the server is awake by the time a
  player creates a room). Cold start can take ~50 s.
- Rooms live in memory only and expire after 2 h of inactivity. A restart of the
  Render service drops all rooms — clients will see "room not found" on rejoin.
- Endpoints: `GET /health` → `{status:"ok", rooms:N}`; WebSocket on the same port.
