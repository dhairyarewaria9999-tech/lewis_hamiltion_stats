import React, { useState } from 'react';
import { TelemetryData } from '../../types';
import { soundEngine } from '../audio/SoundEngine';
import { Activity, Gauge, Zap, Disc3 } from 'lucide-react';

interface TelemetryHUDProps {
  telemetry: TelemetryData;
  isConnected: boolean;
}

export const TelemetryHUD: React.FC<TelemetryHUDProps> = ({ telemetry, isConnected }) => {
  const [unit, setUnit] = useState<'kmh' | 'mph'>('kmh');

  const displaySpeed = unit === 'kmh'
    ? telemetry.speed
    : Math.round(telemetry.speed * 0.621371);

  // Shift LED lights logic (15 LEDs: 5 Green, 5 Yellow, 5 Red/Purple)
  const rpmRatio = Math.max(0, Math.min(1, (telemetry.rpm - 5000) / 7500));
  const activeLeds = Math.floor(rpmRatio * 15);
  const isShiftWarning = telemetry.rpm > 12000;

  const toggleUnit = () => {
    soundEngine.playClick();
    setUnit(u => u === 'kmh' ? 'mph' : 'kmh');
  };

  return (
    <div className="glass-panel border-lh-border/80 rounded-2xl p-4 md:p-6 shadow-2xl relative overflow-hidden">
      {/* Background carbon pattern */}
      <div className="absolute inset-0 bg-carbon-pattern opacity-10 pointer-events-none" />

      {/* Top Header Row */}
      <div className="flex items-center justify-between border-b border-lh-border/50 pb-3 mb-4">
        <div className="flex items-center space-x-3">
          <div className="flex items-center space-x-1.5">
            <span className={`w-2.5 h-2.5 rounded-full ${isConnected ? 'bg-lh-yellow animate-ping' : 'bg-lh-red'}`} />
            <span className={`w-2 h-2 rounded-full ${isConnected ? 'bg-lh-yellow' : 'bg-lh-red'}`} />
          </div>
          <span className="font-mono text-xs uppercase tracking-wider text-lh-muted">
            {isConnected ? 'LIVE 20HZ PIT WALL' : 'SIMULATION MODE'}
          </span>
          <span className="hidden sm:inline-block px-2 py-0.5 rounded bg-lh-border/40 text-[10px] font-mono text-white">
            SF-25 TELEMETRY
          </span>
        </div>

        <div className="flex items-center space-x-2">
          <button
            onClick={toggleUnit}
            className="px-2 py-0.5 rounded bg-lh-dark hover:bg-lh-card border border-lh-border text-[11px] font-mono text-lh-yellow transition-colors"
            data-cursor="UNIT"
          >
            {unit.toUpperCase()}
          </button>
          <div className="font-mono text-xs text-white/70">
            SECTOR <span className="text-lh-yellow font-bold">{telemetry.sector}</span>
          </div>
        </div>
      </div>

      {/* Shift Light Strip */}
      <div className="mb-5">
        <div className="flex items-center justify-between text-[10px] font-mono text-lh-muted mb-1.5 px-1">
          <span>5000 RPM</span>
          <span className={isShiftWarning ? 'text-lh-red font-bold animate-pulse' : 'text-lh-yellow'}>
            {telemetry.rpm.toLocaleString()} RPM
          </span>
          <span>12500 RPM</span>
        </div>
        <div className="flex space-x-1 sm:space-x-1.5 h-2.5 w-full bg-lh-dark p-0.5 rounded-full border border-lh-border">
          {Array.from({ length: 15 }).map((_, i) => {
            const isActive = i < activeLeds;
            let activeColor = 'bg-emerald-500 shadow-[0_0_8px_#10B981]';
            if (i >= 5 && i < 10) activeColor = 'bg-lh-yellow shadow-[0_0_8px_#CCFF00]';
            if (i >= 10) activeColor = isShiftWarning ? 'bg-lh-purple animate-pulse shadow-[0_0_12px_#9945FF]' : 'bg-lh-red shadow-[0_0_8px_#FF1801]';

            return (
              <div
                key={i}
                className={`flex-1 rounded-full transition-all duration-75 ${
                  isActive ? activeColor : 'bg-neutral-800'
                }`}
              />
            );
          })}
        </div>
      </div>

      {/* Main Dial & Cockpit Metrics Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 items-center">
        {/* Gear Box Indicator */}
        <div className="flex flex-col items-center justify-center p-3 rounded-xl bg-lh-dark/80 border border-lh-border">
          <span className="font-mono text-[10px] uppercase tracking-widest text-lh-muted mb-1">
            GEAR
          </span>
          <span className="font-display text-5xl font-black text-white tracking-tighter">
            {telemetry.gear}
          </span>
          <span className="font-mono text-[10px] text-lh-yellow mt-1">
            SEMI-AUTO 8-SPD
          </span>
        </div>

        {/* Speedometer */}
        <div className="flex flex-col items-center justify-center p-3 rounded-xl bg-lh-dark/80 border border-lh-border">
          <span className="font-mono text-[10px] uppercase tracking-widest text-lh-muted mb-1 flex items-center space-x-1">
            <Gauge className="w-3 h-3 text-lh-yellow" />
            <span>VELOCITY</span>
          </span>
          <div className="flex items-baseline">
            <span className="font-display text-5xl font-black text-lh-yellow tracking-tighter">
              {displaySpeed}
            </span>
            <span className="ml-1 font-mono text-xs text-white/60 uppercase">
              {unit}
            </span>
          </div>
          <span className="font-mono text-[10px] text-lh-muted mt-1">
            DELTA {telemetry.deltaToFastest}
          </span>
        </div>

        {/* Throttle & Brake Pressure Bars */}
        <div className="flex flex-col p-3 rounded-xl bg-lh-dark/80 border border-lh-border space-y-2">
          {/* Throttle */}
          <div>
            <div className="flex justify-between text-[10px] font-mono mb-1">
              <span className="text-emerald-400 font-bold">THROTTLE</span>
              <span className="text-white">{telemetry.throttle}%</span>
            </div>
            <div className="h-2 w-full bg-neutral-800 rounded-full overflow-hidden">
              <div
                className="h-full bg-emerald-400 rounded-full transition-all duration-75 shadow-[0_0_8px_#34D399]"
                style={{ width: `${telemetry.throttle}%` }}
              />
            </div>
          </div>

          {/* Brake */}
          <div>
            <div className="flex justify-between text-[10px] font-mono mb-1">
              <span className="text-lh-red font-bold">BRAKE</span>
              <span className="text-white">{telemetry.brake}%</span>
            </div>
            <div className="h-2 w-full bg-neutral-800 rounded-full overflow-hidden">
              <div
                className="h-full bg-lh-red rounded-full transition-all duration-75 shadow-[0_0_8px_#FF1801]"
                style={{ width: `${telemetry.brake}%` }}
              />
            </div>
          </div>
        </div>

        {/* DRS & ERS Status Box */}
        <div className="flex flex-col justify-between p-3 rounded-xl bg-lh-dark/80 border border-lh-border h-full">
          <div className="flex items-center justify-between">
            <span className="font-mono text-[10px] text-lh-muted flex items-center space-x-1">
              <Zap className="w-3 h-3 text-lh-yellow" />
              <span>DRS STATUS</span>
            </span>
            <span
              className={`px-2 py-0.5 rounded text-[10px] font-mono font-bold uppercase ${
                telemetry.drsActive
                  ? 'bg-lh-yellow text-lh-void animate-pulse'
                  : 'bg-neutral-800 text-neutral-400'
              }`}
            >
              {telemetry.drsActive ? 'DRS OPEN' : 'CLOSED'}
            </span>
          </div>

          <div className="mt-2 pt-2 border-t border-lh-border/40 flex items-center justify-between">
            <span className="font-mono text-[10px] text-lh-muted flex items-center space-x-1">
              <Activity className="w-3 h-3 text-lh-purple" />
              <span>LAT G-FORCE</span>
            </span>
            <span className="font-mono text-xs font-bold text-white">
              {telemetry.gForceLat > 0 ? `+${telemetry.gForceLat}` : telemetry.gForceLat} G
            </span>
          </div>
        </div>
      </div>

      {/* Bottom Track Location Bar */}
      <div className="mt-4 pt-3 border-t border-lh-border/50 flex flex-wrap items-center justify-between gap-2 text-xs font-mono">
        <div className="flex items-center space-x-2 text-white/80">
          <Disc3 className="w-3.5 h-3.5 text-lh-yellow animate-spin" />
          <span className="text-lh-muted">CURRENT CIRCUIT SECTION:</span>
          <span className="text-lh-yellow font-bold">{telemetry.trackSection}</span>
        </div>
        <div className="flex items-center space-x-3 text-lh-muted">
          <span>LAP TIME: <strong className="text-white font-mono">{telemetry.lapTime}</strong></span>
          <span>PROGRESS: <strong className="text-lh-yellow font-mono">{telemetry.lapProgress}%</strong></span>
        </div>
      </div>
    </div>
  );
};
