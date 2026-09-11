import express from 'express';
import cors from 'cors';
import http from 'http';
import { WebSocketServer, WebSocket } from 'ws';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';
import { apiRouter } from './routes/api.js';
import { telemetrySimulator } from './services/telemetrySimulator.js';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const clientDistPath = path.resolve(__dirname, '../../client/dist');
const app = express();
const PORT = process.env.PORT || 5000;
// Middleware
app.use(cors({
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS']
}));
app.use(express.json());
// API Routes
app.use('/api', apiRouter);
// Static Client Files (Production)
if (fs.existsSync(clientDistPath)) {
    app.use(express.static(clientDistPath));
    app.get('*', (req, res, next) => {
        if (req.path.startsWith('/api') || req.path.startsWith('/ws')) {
            return next();
        }
        res.sendFile(path.join(clientDistPath, 'index.html'));
    });
}
// HTTP Server
const server = http.createServer(app);
// WebSocket Server for High-Speed Telemetry Streaming
const wss = new WebSocketServer({ server, path: '/ws' });
const connectedClients = new Set();
wss.on('connection', (ws) => {
    connectedClients.add(ws);
    // Send initial snapshot immediately upon connection
    try {
        const snapshot = telemetrySimulator.getCurrentTelemetry();
        ws.send(JSON.stringify({ type: 'TELEMETRY_SNAPSHOT', data: snapshot }));
    }
    catch (err) {
        console.error('Failed to send initial snapshot:', err);
    }
    ws.on('message', (message) => {
        try {
            const parsed = JSON.parse(message.toString());
            if (parsed.type === 'PING') {
                ws.send(JSON.stringify({ type: 'PONG', timestamp: Date.now() }));
            }
        }
        catch {
            // ignore non-JSON messages
        }
    });
    ws.on('close', () => {
        connectedClients.delete(ws);
    });
    ws.on('error', () => {
        connectedClients.delete(ws);
    });
});
// Telemetry Broadcast (10-20Hz)
telemetrySimulator.subscribe((telemetry) => {
    if (connectedClients.size === 0)
        return;
    const payload = JSON.stringify({
        type: 'TELEMETRY_UPDATE',
        data: telemetry
    });
    for (const client of connectedClients) {
        if (client.readyState === WebSocket.OPEN) {
            client.send(payload);
        }
    }
});
server.listen(PORT, () => {
    console.log(`[LH44 Platform] Server listening on http://localhost:${PORT}`);
    console.log(`[LH44 Platform] WebSocket stream available at ws://localhost:${PORT}/ws`);
    console.log(`[LH44 Platform] Telemetry engine running at 20Hz`);
});
// Graceful shutdown
const shutdown = () => {
    console.log('[LH44 Platform] Shutting down gracefully...');
    telemetrySimulator.stop();
    for (const client of connectedClients) {
        client.close();
    }
    server.close(() => {
        console.log('[LH44 Platform] Server closed.');
        process.exit(0);
    });
};
process.on('SIGINT', shutdown);
process.on('SIGTERM', shutdown);
