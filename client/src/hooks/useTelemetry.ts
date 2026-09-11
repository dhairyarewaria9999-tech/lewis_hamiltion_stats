import { useEffect, useState, useRef } from 'react';
import { TelemetryData } from '../types';
import { api } from '../services/api';

const DEFAULT_TELEMETRY: TelemetryData = {
  speed: 312,
  rpm: 11850,
  gear: 8,
  throttle: 100,
  brake: 0,
  drsActive: true,
  ersHarvesting: false,
  ersDeploying: true,
  gForceLat: 0.15,
  gForceLong: 1.75,
  tireTemps: { fl: 102.1, fr: 103.5, rl: 99.2, rr: 100.1 },
  lapTime: '0:24.512',
  lapSeconds: 24.512,
  lapProgress: 28.5,
  trackSection: 'Wellington Straight',
  sector: 1,
  deltaToFastest: '-0.245s',
  timestamp: Date.now()
};

export function useTelemetry() {
  const [telemetry, setTelemetry] = useState<TelemetryData>(DEFAULT_TELEMETRY);
  const [isConnected, setIsConnected] = useState<boolean>(false);
  const [speedHistory, setSpeedHistory] = useState<number[]>([]);
  const wsRef = useRef<WebSocket | null>(null);
  const reconnectTimeoutRef = useRef<number | null>(null);

  useEffect(() => {
    let isMounted = true;

    // Initial snapshot via REST in case WS takes a moment
    api.getTelemetrySnapshot()
      .then((data) => {
        if (isMounted && data) {
          setTelemetry(data);
        }
      })
      .catch(() => {
        // Fallback default is already set
      });

    const connectWS = () => {
      const protocol = window.location.protocol === 'https:' ? 'wss:' : 'ws:';
      const host = window.location.host;
      const wsUrl = `${protocol}//${host}/ws`;

      try {
        const ws = new WebSocket(wsUrl);
        wsRef.current = ws;

        ws.onopen = () => {
          if (!isMounted) return;
          setIsConnected(true);
        };

        ws.onmessage = (event) => {
          if (!isMounted) return;
          try {
            const payload = JSON.parse(event.data);
            if (payload.type === 'TELEMETRY_UPDATE' || payload.type === 'TELEMETRY_SNAPSHOT') {
              const data = payload.data as TelemetryData;
              setTelemetry(data);
              setSpeedHistory((prev) => {
                const updated = [...prev, data.speed];
                return updated.length > 30 ? updated.slice(updated.length - 30) : updated;
              });
            }
          } catch {
            // ignore malformed frame
          }
        };

        ws.onclose = () => {
          if (!isMounted) return;
          setIsConnected(false);
          // Try reconnecting after 3 seconds
          reconnectTimeoutRef.current = window.setTimeout(connectWS, 3000);
        };

        ws.onerror = () => {
          if (!isMounted) return;
          setIsConnected(false);
        };
      } catch {
        setIsConnected(false);
        reconnectTimeoutRef.current = window.setTimeout(connectWS, 4000);
      }
    };

    connectWS();

    // Fallback polling if WebSocket fails to connect
    const pollInterval = setInterval(() => {
      if (!isConnected && isMounted) {
        api.getTelemetrySnapshot()
          .then((data) => {
            if (isMounted && data) {
              setTelemetry(data);
            }
          })
          .catch(() => {});
      }
    }, 500);

    return () => {
      isMounted = false;
      if (reconnectTimeoutRef.current) {
        clearTimeout(reconnectTimeoutRef.current);
      }
      if (wsRef.current) {
        wsRef.current.close();
      }
      clearInterval(pollInterval);
    };
  }, [isConnected]);

  return { telemetry, isConnected, speedHistory };
}
