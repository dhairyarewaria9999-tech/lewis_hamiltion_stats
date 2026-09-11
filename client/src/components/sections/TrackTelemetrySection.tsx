import React, { useState, useEffect } from 'react';
import { TelemetryData, CircuitInfo } from '../../types';
import { api } from '../../services/api';
import { soundEngine } from '../audio/SoundEngine';
import { Radio, Gauge, Thermometer, BatteryCharging, MapPin, Flag } from 'lucide-react';

interface TrackTelemetrySectionProps {
  telemetry: TelemetryData;
  isConnected: boolean;
  speedHistory: number[];
}

export const TrackTelemetrySection: React.FC<TrackTelemetrySectionProps> = ({
  telemetry,
  isConnected,
  speedHistory
}) => {
  const [circuitsList, setCircuitsList] = useState<CircuitInfo[]>([]);
  const [selectedCircuitId, setSelectedCircuitId] = useState<string>('silverstone');

  useEffect(() => {
    api.getCircuits()
      .then((res) => {
        if (res?.data && res.data.length > 0) {
          setCircuitsList(res.data);
          if (res.activeTrackId) {
            setSelectedCircuitId(res.activeTrackId);
          }
        }
      })
      .catch(() => {});
  }, []);

  const activeCircuit = circuitsList.find(c => c.id === selectedCircuitId) || circuitsList[0] || {
    id: 'silverstone',
    name: 'Silverstone Grand Prix Circuit',
    country: 'United Kingdom',
    flag: '🇬🇧',
    lengthKm: 5.891,
    turns: 18,
    lapRecord: '1:24.303',
    recordHolder: 'Lewis Hamilton (Mercedes W11)',
    recordYear: 2020,
    hamiltonWins: 9,
    description: 'Lewis Hamilton’s home circuit and site of 9 British GP victories.',
    pathD: 'M 220 50 C 260 50, 310 70, 340 90 C 370 110, 420 120, 450 140 C 470 160, 460 200, 430 220 C 400 240, 370 230, 340 245 C 310 260, 290 300, 260 310 C 230 320, 180 300, 160 280 C 140 260, 120 220, 90 200 C 60 180, 40 140, 60 110 C 80 80, 140 85, 170 80 Z',
    zones: []
  };

  const handleSwitchCircuit = (circuitId: string) => {
    soundEngine.playClick();
    setSelectedCircuitId(circuitId);
    api.setTrack(circuitId).catch(() => {});
  };

  // Car position simulation along active SVG path
  const angle = (telemetry.lapProgress / 100) * Math.PI * 2;
  const carDotX = 250 + Math.cos(angle) * 150 + Math.sin(angle * 2) * 35;
  const carDotY = 180 + Math.sin(angle) * 105 + Math.cos(angle * 2) * 25;

  const getTireColor = (temp: number) => {
    if (temp < 95) return 'text-sky-400 border-sky-400/40 bg-sky-950/40';
    if (temp <= 108) return 'text-emerald-400 border-emerald-400/40 bg-emerald-950/40';
    if (temp <= 118) return 'text-lh-yellow border-lh-yellow/40 bg-yellow-950/40';
    return 'text-lh-red border-lh-red/40 bg-red-950/40';
  };

  return (
    <section id="telemetry" className="py-20 px-4 md:px-8 max-w-7xl mx-auto">
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 pb-6 border-b border-lh-border/60 gap-4">
        <div>
          <div className="flex items-center space-x-2 text-lh-yellow font-mono text-xs uppercase tracking-widest mb-1.5">
            <Radio className="w-4 h-4 animate-pulse" />
            <span>PIT WALL COMMAND CENTER // REAL-TIME TELEMETRY</span>
          </div>
          <h2 className="font-display font-black text-4xl sm:text-5xl uppercase tracking-tighter text-white">
            {activeCircuit.name.split(' ')[0]} <span className="text-lh-yellow">GP TRACK TRACE</span>
          </h2>
        </div>

        {/* Circuit Quick Stats Banner */}
        <div className="flex flex-wrap items-center gap-3">
          <div className="px-3 py-1.5 rounded-lg bg-lh-dark border border-lh-border text-xs font-mono text-lh-muted">
            LENGTH: <span className="text-white font-bold">{activeCircuit.lengthKm} KM</span>
          </div>
          <div className="px-3 py-1.5 rounded-lg bg-lh-dark border border-lh-border text-xs font-mono text-lh-muted">
            TURNS: <span className="text-white font-bold">{activeCircuit.turns}</span>
          </div>
          <div className="px-3 py-1.5 rounded-lg bg-lh-dark border border-lh-border text-xs font-mono text-lh-muted">
            LH WINS: <span className="text-lh-yellow font-bold">{activeCircuit.hamiltonWins} 🏆</span>
          </div>
          <div className="px-3 py-1.5 rounded-lg bg-lh-dark border border-lh-border text-xs font-mono text-lh-muted">
            LAP RECORD: <span className="text-emerald-400 font-bold">{activeCircuit.lapRecord}</span>
          </div>
        </div>
      </div>

      {/* Multi-Track Circuit Switcher Tabs */}
      <div className="flex flex-wrap items-center gap-2 mb-8">
        <span className="text-[11px] font-mono uppercase text-lh-muted mr-2 flex items-center space-x-1">
          <Flag className="w-3.5 h-3.5 text-lh-yellow" />
          <span>SELECT CIRCUIT:</span>
        </span>
        {(circuitsList.length > 0 ? circuitsList : [activeCircuit]).map(circuit => {
          const isSelected = selectedCircuitId === circuit.id;
          return (
            <button
              key={circuit.id}
              onClick={() => handleSwitchCircuit(circuit.id)}
              className={`px-4 py-2 rounded-xl text-xs font-mono uppercase font-bold tracking-wider transition-all flex items-center space-x-2 ${
                isSelected
                  ? 'bg-lh-yellow text-lh-void shadow-[0_0_18px_rgba(204,255,0,0.35)] scale-105'
                  : 'bg-lh-dark hover:bg-lh-card border border-lh-border text-lh-muted hover:text-white'
              }`}
              data-cursor="TRACK"
            >
              <span>{circuit.flag}</span>
              <span>{circuit.name.split(' ')[0]}</span>
              <span className={`text-[10px] px-1.5 py-0.2 rounded ${isSelected ? 'bg-lh-void/20 text-lh-void' : 'bg-lh-card text-lh-yellow'}`}>
                {circuit.hamiltonWins}W
              </span>
            </button>
          );
        })}
      </div>

      {/* Main Grid: Track Map + Telemetry Graphs */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Interactive Track Map (Left Column, 7 cols) */}
        <div className="lg:col-span-7 glass-panel rounded-2xl p-6 relative overflow-hidden flex flex-col justify-between">
          <div className="flex items-center justify-between mb-2">
            <span className="font-mono text-xs uppercase tracking-wider text-lh-muted flex items-center space-x-1.5">
              <MapPin className="w-3.5 h-3.5 text-lh-yellow" />
              <span>LIVE GPS CAR POSITION // {activeCircuit.name.toUpperCase()}</span>
            </span>
            <div className="flex items-center space-x-2">
              <span className={`w-2 h-2 rounded-full ${isConnected ? 'bg-lh-yellow animate-ping' : 'bg-lh-red'}`} />
              <span className="font-mono text-[11px] text-white/70 uppercase">
                {isConnected ? 'LIVE FEED (20HZ)' : 'OFFLINE SIM'}
              </span>
            </div>
          </div>

          {/* SVG Track Graphic */}
          <div className="relative w-full h-[330px] flex items-center justify-center my-4">
            <svg viewBox="0 0 500 350" className="w-full h-full max-h-[330px] overflow-visible">
              {/* Circuit Outline Shadow */}
              <path
                d={activeCircuit.pathD}
                fill="none"
                stroke="rgba(204,255,0,0.12)"
                strokeWidth="20"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              {/* Circuit Main Asphalt */}
              <path
                d={activeCircuit.pathD}
                fill="none"
                stroke="#1E2028"
                strokeWidth="11"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              {/* Active Racing Line / Sector Highlighting */}
              <path
                d={activeCircuit.pathD}
                fill="none"
                stroke="#CCFF00"
                strokeWidth="3"
                strokeDasharray="14 8"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="opacity-80"
              />

              {/* Dynamic Turn Labels Based on Circuit */}
              {selectedCircuitId === 'silverstone' && (
                <>
                  <text x="340" y="80" fill="#8A90A2" fontSize="10" fontFamily="monospace">Copse</text>
                  <text x="440" y="130" fill="#8A90A2" fontSize="10" fontFamily="monospace">Maggotts & Becketts</text>
                  <text x="350" y="270" fill="#8A90A2" fontSize="10" fontFamily="monospace">Stowe</text>
                  <text x="210" y="325" fill="#8A90A2" fontSize="10" fontFamily="monospace">Vale & Club</text>
                  <text x="140" y="65" fill="#CCFF00" fontSize="11" fontWeight="bold" fontFamily="monospace">Hamilton Straight</text>
                </>
              )}

              {selectedCircuitId === 'monza' && (
                <>
                  <text x="200" y="50" fill="#CCFF00" fontSize="11" fontWeight="bold" fontFamily="monospace">Rettifilo (350+ km/h)</text>
                  <text x="435" y="140" fill="#8A90A2" fontSize="10" fontFamily="monospace">Variante della Roggia</text>
                  <text x="420" y="280" fill="#8A90A2" fontSize="10" fontFamily="monospace">Lesmo 1 & 2</text>
                  <text x="230" y="220" fill="#8A90A2" fontSize="10" fontFamily="monospace">Variante Ascari</text>
                  <text x="90" y="325" fill="#FF1801" fontSize="11" fontWeight="bold" fontFamily="monospace">Curva Parabolica</text>
                </>
              )}

              {selectedCircuitId === 'spa' && (
                <>
                  <text x="130" y="80" fill="#8A90A2" fontSize="10" fontFamily="monospace">La Source</text>
                  <text x="260" y="50" fill="#CCFF00" fontSize="11" fontWeight="bold" fontFamily="monospace">Eau Rouge / Raidillon</text>
                  <text x="410" y="110" fill="#8A90A2" fontSize="10" fontFamily="monospace">Kemmel Straight</text>
                  <text x="410" y="280" fill="#8A90A2" fontSize="10" fontFamily="monospace">Pouhon (5G)</text>
                  <text x="130" y="335" fill="#8A90A2" fontSize="10" fontFamily="monospace">Bus Stop Chicane</text>
                </>
              )}

              {selectedCircuitId === 'interlagos' && (
                <>
                  <text x="260" y="65" fill="#FFDF00" fontSize="11" fontWeight="bold" fontFamily="monospace">Senna 'S' (T1-T2)</text>
                  <text x="380" y="180" fill="#8A90A2" fontSize="10" fontFamily="monospace">Reta Oposta</text>
                  <text x="340" y="255" fill="#8A90A2" fontSize="10" fontFamily="monospace">Descida do Lago</text>
                  <text x="160" y="260" fill="#8A90A2" fontSize="10" fontFamily="monospace">Bico de Pato</text>
                  <text x="60" y="280" fill="#009C3B" fontSize="11" fontWeight="bold" fontFamily="monospace">Junção</text>
                </>
              )}

              {selectedCircuitId === 'monaco' && (
                <>
                  <text x="160" y="100" fill="#8A90A2" fontSize="10" fontFamily="monospace">Sainte Dévote</text>
                  <text x="300" y="80" fill="#CCFF00" fontSize="11" fontWeight="bold" fontFamily="monospace">Casino Square</text>
                  <text x="380" y="200" fill="#FF1801" fontSize="10" fontFamily="monospace">Grand Hotel Hairpin</text>
                  <text x="280" y="295" fill="#8A90A2" fontSize="10" fontFamily="monospace">The Tunnel</text>
                  <text x="60" y="240" fill="#8A90A2" fontSize="10" fontFamily="monospace">Rascasse</text>
                </>
              )}

              {/* Live Animated Car Dot */}
              <g transform={`translate(${carDotX}, ${carDotY})`}>
                <circle r="13" fill="rgba(204,255,0,0.25)" className="animate-ping" />
                <circle r="6.5" fill="#CCFF00" stroke="#050507" strokeWidth="2" />
                <text x="12" y="4" fill="#FFFFFF" fontSize="10" fontWeight="bold" fontFamily="monospace">
                  LH 44
                </text>
              </g>
            </svg>
          </div>

          {/* Current Section & Splits Banner */}
          <div className="grid grid-cols-3 gap-3 pt-4 border-t border-lh-border/60 font-mono text-center">
            <div className="p-2 rounded-lg bg-lh-dark/60 border border-lh-border/40">
              <span className="text-[10px] text-lh-muted uppercase block">SECTOR 1</span>
              <span className={`text-sm font-bold ${telemetry.sector === 1 ? 'text-lh-yellow animate-pulse' : 'text-white'}`}>
                27.841s
              </span>
            </div>
            <div className="p-2 rounded-lg bg-lh-dark/60 border border-lh-border/40">
              <span className="text-[10px] text-lh-muted uppercase block">SECTOR 2</span>
              <span className={`text-sm font-bold ${telemetry.sector === 2 ? 'text-lh-yellow animate-pulse' : 'text-white'}`}>
                34.209s
              </span>
            </div>
            <div className="p-2 rounded-lg bg-lh-dark/60 border border-lh-border/40">
              <span className="text-[10px] text-lh-muted uppercase block">SECTOR 3</span>
              <span className={`text-sm font-bold ${telemetry.sector === 3 ? 'text-lh-yellow animate-pulse' : 'text-white'}`}>
                23.155s
              </span>
            </div>
          </div>
        </div>

        {/* Right Column: Thermal Matrix & ERS & Telemetry Curves (5 cols) */}
        <div className="lg:col-span-5 flex flex-col space-y-6">
          {/* Pirelli Tire Thermal Matrix */}
          <div className="glass-panel rounded-2xl p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-2">
                <Thermometer className="w-4 h-4 text-lh-yellow" />
                <span className="font-mono text-xs uppercase tracking-wider text-white font-bold">
                  PIRELLI P-ZERO THERMAL MATRIX
                </span>
              </div>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-lh-dark text-emerald-400 border border-emerald-400/30">
                OPTIMAL RANGE
              </span>
            </div>

            {/* 4 Tires Grid */}
            <div className="grid grid-cols-2 gap-3">
              <div className={`p-3 rounded-xl border flex flex-col items-center justify-center transition-all ${getTireColor(telemetry.tireTemps.fl)}`}>
                <span className="font-mono text-[10px] text-lh-muted uppercase font-bold">FRONT LEFT (FL)</span>
                <span className="font-display text-2xl font-black">{telemetry.tireTemps.fl}°C</span>
                <span className="text-[9px] font-mono opacity-80">COMPOUND: C3 SOFT</span>
              </div>

              <div className={`p-3 rounded-xl border flex flex-col items-center justify-center transition-all ${getTireColor(telemetry.tireTemps.fr)}`}>
                <span className="font-mono text-[10px] text-lh-muted uppercase font-bold">FRONT RIGHT (FR)</span>
                <span className="font-display text-2xl font-black">{telemetry.tireTemps.fr}°C</span>
                <span className="text-[9px] font-mono opacity-80">LOAD: 4.8 G</span>
              </div>

              <div className={`p-3 rounded-xl border flex flex-col items-center justify-center transition-all ${getTireColor(telemetry.tireTemps.rl)}`}>
                <span className="font-mono text-[10px] text-lh-muted uppercase font-bold">REAR LEFT (RL)</span>
                <span className="font-display text-2xl font-black">{telemetry.tireTemps.rl}°C</span>
                <span className="text-[9px] font-mono opacity-80">TRACTION: 99%</span>
              </div>

              <div className={`p-3 rounded-xl border flex flex-col items-center justify-center transition-all ${getTireColor(telemetry.tireTemps.rr)}`}>
                <span className="font-mono text-[10px] text-lh-muted uppercase font-bold">REAR RIGHT (RR)</span>
                <span className="font-display text-2xl font-black">{telemetry.tireTemps.rr}°C</span>
                <span className="text-[9px] font-mono opacity-80">TRACTION: 99%</span>
              </div>
            </div>
          </div>

          {/* ERS Hybrid Power & G-Forces */}
          <div className="glass-panel rounded-2xl p-6">
            <div className="flex items-center justify-between mb-3">
              <span className="font-mono text-xs uppercase tracking-wider text-lh-muted flex items-center space-x-1.5">
                <BatteryCharging className="w-3.5 h-3.5 text-lh-yellow" />
                <span>ENERGY RECOVERY SYSTEM (MGU-K / MGU-H)</span>
              </span>
              <span className="text-xs font-mono text-lh-yellow font-bold">
                {telemetry.ersDeploying ? 'DEPLOYING (160BHP)' : telemetry.ersHarvesting ? 'HARVESTING' : 'READY'}
              </span>
            </div>

            {/* ERS Battery Bar */}
            <div className="h-3 w-full bg-lh-dark rounded-full overflow-hidden border border-lh-border/60 mb-4">
              <div
                className={`h-full transition-all duration-150 ${
                  telemetry.ersDeploying
                    ? 'bg-gradient-to-r from-lh-yellow to-lh-purple shadow-[0_0_12px_#CCFF00]'
                    : 'bg-emerald-400'
                }`}
                style={{ width: `${Math.max(35, 92 - (telemetry.speed / 350) * 20)}%` }}
              />
            </div>

            {/* Live Speed Trace Sparkline */}
            <div className="pt-3 border-t border-lh-border/60">
              <div className="flex items-center justify-between text-[11px] font-mono text-lh-muted mb-2">
                <span className="flex items-center space-x-1">
                  <Gauge className="w-3 h-3 text-lh-yellow" />
                  <span>VELOCITY PROFILE TRACE</span>
                </span>
                <span className="text-white font-bold">{telemetry.speed} KM/H</span>
              </div>

              {/* Sparkline canvas bars */}
              <div className="flex items-end space-x-1 h-12 bg-lh-dark/60 p-1.5 rounded-lg border border-lh-border/40">
                {speedHistory.slice(-25).map((spd, i) => {
                  const heightPct = Math.max(10, Math.min(100, (spd / 350) * 100));
                  return (
                    <div
                      key={i}
                      className="flex-1 bg-gradient-to-t from-lh-border to-lh-yellow rounded-t transition-all duration-75"
                      style={{ height: `${heightPct}%` }}
                    />
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
