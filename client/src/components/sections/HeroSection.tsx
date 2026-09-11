import React, { useState } from 'react';
import { TelemetryHUD } from '../hud/TelemetryHUD';
import { TelemetryData } from '../../types';
import { soundEngine } from '../audio/SoundEngine';
import {
  Volume2,
  VolumeX,
  ArrowUpRight,
  Flame,
  Trophy,
  ShoppingBag,
  Eye,
  Sparkles,
  Palette
} from 'lucide-react';

interface HeroSectionProps {
  telemetry: TelemetryData;
  isConnected: boolean;
  isMuted: boolean;
  onToggleSound: () => void;
  visualizerLevels: number[];
  onNavigate: (sectionId: string) => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  telemetry,
  isConnected,
  isMuted,
  onToggleSound,
  visualizerLevels,
  onNavigate
}) => {
  // Helmet & Portrait interactive state
  const [visorTint, setVisorTint] = useState<'gold' | 'purple' | 'smoke'>('gold');
  const [visorOpen, setVisorOpen] = useState<boolean>(false);
  const [lightingAura, setLightingAura] = useState<'ferrari' | 'fluo' | 'amethyst' | 'petronas'>('ferrari');

  const auraStyles = {
    ferrari: {
      shadow: 'rgba(255, 24, 1, 0.45)',
      border: 'border-lh-red/60',
      tagBg: 'bg-lh-red/20 text-lh-red border-lh-red/40',
      label: 'SCUDERIA SCARLET',
      accentHex: '#FF1801'
    },
    fluo: {
      shadow: 'rgba(204, 255, 0, 0.45)',
      border: 'border-lh-yellow/60',
      tagBg: 'bg-lh-yellow/20 text-lh-yellow border-lh-yellow/40',
      label: 'NEON HIGHLIGHTER',
      accentHex: '#CCFF00'
    },
    amethyst: {
      shadow: 'rgba(153, 69, 255, 0.45)',
      border: 'border-lh-purple/60',
      tagBg: 'bg-lh-purple/20 text-lh-purple border-lh-purple/40',
      label: 'STEALTH PURPLE',
      accentHex: '#9945FF'
    },
    petronas: {
      shadow: 'rgba(0, 210, 190, 0.45)',
      border: 'border-lh-cyan/60',
      tagBg: 'bg-lh-cyan/20 text-lh-cyan border-lh-cyan/40',
      label: 'PETRONAS TEAL',
      accentHex: '#00D2BE'
    }
  }[lightingAura];

  const visorStyles = {
    gold: 'from-amber-400 via-yellow-200 to-amber-600 opacity-90',
    purple: 'from-purple-500 via-fuchsia-400 to-indigo-600 opacity-90',
    smoke: 'from-neutral-900 via-neutral-800 to-black opacity-95'
  }[visorTint];

  return (
    <section className="relative min-h-screen pt-28 pb-16 px-4 md:px-8 max-w-7xl mx-auto flex flex-col justify-between">
      {/* Top Banner Ticker */}
      <div className="flex flex-wrap items-center justify-between gap-3 mb-8">
        <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-lh-dark/80 border border-lh-border/80 backdrop-blur-md">
          <span className="w-2 h-2 rounded-full bg-lh-red animate-pulse" />
          <span className="font-mono text-xs font-semibold text-white tracking-wider">
            SCUDERIA FERRARI CHAPTER 2025 // SF-25
          </span>
          <span className="text-lh-border">|</span>
          <span className="font-mono text-xs text-lh-yellow font-bold">
            #44
          </span>
        </div>

        {/* Audio Reactive Equalizer & Mute Toggle */}
        <button
          onClick={onToggleSound}
          className="flex items-center space-x-3 px-3.5 py-1.5 rounded-full bg-lh-dark/80 border border-lh-border/80 hover:border-lh-yellow/60 transition-all backdrop-blur-md group"
          data-cursor="SOUND"
          aria-label={isMuted ? 'Unmute procedural sound engine' : 'Mute audio'}
        >
          {/* Animated 8-band visualizer */}
          <div className="flex items-end space-x-1 h-3.5">
            {visualizerLevels.map((lvl, idx) => (
              <div
                key={idx}
                className={`w-0.5 rounded-t transition-all duration-75 ${
                  isMuted ? 'bg-lh-muted/40 h-1' : 'bg-lh-yellow'
                }`}
                style={{ height: isMuted ? '4px' : `${Math.max(15, lvl)}%` }}
              />
            ))}
          </div>

          <span className="font-mono text-xs text-white/80 group-hover:text-lh-yellow uppercase">
            {isMuted ? 'SOUND ENGINE: OFF' : 'AUDIO ACTIVE'}
          </span>

          {isMuted ? (
            <VolumeX className="w-3.5 h-3.5 text-lh-muted group-hover:text-lh-yellow" />
          ) : (
            <Volume2 className="w-3.5 h-3.5 text-lh-yellow animate-bounce" />
          )}
        </button>
      </div>

      {/* Main Hero Split: Kinetic Copy (Left) + Interactive Hamilton Portrait/Helmet (Right) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center my-auto py-4">
        {/* Left Column (7 cols) */}
        <div className="lg:col-span-7 flex flex-col justify-center">
          <div className="flex items-center space-x-4 mb-2">
            <span className="font-mono text-xs md:text-sm font-bold tracking-widest text-lh-yellow uppercase">
              // SIR LEWIS HAMILTON MBE
            </span>
            <div className="h-px flex-1 bg-gradient-to-r from-lh-yellow/40 to-transparent" />
          </div>

          <h1 className="font-display font-black text-6xl sm:text-7xl md:text-8xl xl:text-9xl tracking-tighter uppercase leading-[0.85] text-white">
            STILL I <span className="text-transparent bg-clip-text bg-gradient-to-r from-lh-yellow via-white to-lh-purple">RISE</span>
          </h1>

          <div className="mt-4 flex flex-wrap items-baseline gap-x-6 gap-y-2">
            <span className="font-display text-4xl sm:text-5xl md:text-6xl font-black text-white/20 tracking-tighter">
              44
            </span>
            <p className="max-w-xl text-sm md:text-base text-lh-muted font-normal leading-relaxed">
              7-Time Formula 1 World Champion, designer, and changemaker. Fusing computational telemetry, bespoke aerodynamic wind tunnels, and the world of +44.
            </p>
          </div>

          {/* Action Navigation Buttons */}
          <div className="mt-8 flex flex-wrap gap-3 sm:gap-4">
            <button
              onClick={() => {
                soundEngine.playClick();
                onNavigate('telemetry');
              }}
              className="flex items-center space-x-2 px-5 py-3 rounded-xl bg-lh-yellow text-lh-void font-display font-bold text-xs uppercase tracking-wider hover:bg-white transition-all shadow-[0_0_20px_rgba(204,255,0,0.3)] hover:scale-105"
              data-cursor="PIT WALL"
            >
              <Flame className="w-4 h-4" />
              <span>PIT WALL TELEMETRY</span>
              <ArrowUpRight className="w-4 h-4" />
            </button>

            <button
              onClick={() => {
                soundEngine.playClick();
                onNavigate('helmets');
              }}
              className="flex items-center space-x-2 px-5 py-3 rounded-xl bg-lh-dark/90 hover:bg-lh-card border border-lh-border hover:border-lh-yellow/60 text-white font-display font-bold text-xs uppercase tracking-wider transition-all hover:scale-105"
              data-cursor="HELMETS"
            >
              <Sparkles className="w-4 h-4 text-lh-yellow" />
              <span>HELMET VAULT</span>
            </button>

            <button
              onClick={() => {
                soundEngine.playClick();
                onNavigate('store');
              }}
              className="flex items-center space-x-2 px-5 py-3 rounded-xl bg-lh-dark/90 hover:bg-lh-card border border-lh-border hover:border-lh-purple/60 text-white font-display font-bold text-xs uppercase tracking-wider transition-all hover:scale-105"
              data-cursor="+44 STORE"
            >
              <ShoppingBag className="w-4 h-4 text-lh-purple" />
              <span>+44 WORLD</span>
            </button>

            <button
              onClick={() => {
                soundEngine.playClick();
                onNavigate('trophies');
              }}
              className="flex items-center space-x-2 px-5 py-3 rounded-xl bg-lh-dark/90 hover:bg-lh-card border border-lh-border hover:border-lh-yellow/60 text-white font-display font-bold text-xs uppercase tracking-wider transition-all hover:scale-105"
              data-cursor="VAULT"
            >
              <Trophy className="w-4 h-4 text-lh-yellow" />
              <span>7X VAULT</span>
            </button>
          </div>
        </div>

        {/* Right Column: Lando-style Interactive Lewis Hamilton Face & Helmet Visual (5 cols) */}
        <div className="lg:col-span-5 relative flex flex-col items-center">
          {/* Holographic Glowing Card Container */}
          <div
            className={`w-full max-w-md rounded-3xl p-5 md:p-6 glass-panel border transition-all duration-500 relative overflow-hidden group shadow-2xl ${auraStyles.border}`}
            style={{
              boxShadow: `0 0 45px ${auraStyles.shadow}`
            }}
          >
            {/* Background Aerodynamic Glow Ring */}
            <div
              className="absolute -top-16 -right-16 w-56 h-56 rounded-full blur-3xl opacity-30 pointer-events-none transition-all duration-500"
              style={{ backgroundColor: auraStyles.accentHex }}
            />

            {/* Top Badges */}
            <div className="flex items-center justify-between mb-3 z-10 relative">
              <div className="flex items-center space-x-2">
                <span className={`px-2.5 py-0.5 rounded text-[10px] font-mono font-bold uppercase border ${auraStyles.tagBg}`}>
                  {auraStyles.label}
                </span>
                <span className="px-2 py-0.5 rounded bg-lh-dark border border-lh-border text-[10px] font-mono text-white">
                  BELL HP77 ABP
                </span>
              </div>
              <span className="font-display font-black text-2xl text-lh-yellow">
                #44
              </span>
            </div>

            {/* Hamilton Face & Helmet Interactive Display */}
            <div className="relative w-full h-80 sm:h-96 rounded-2xl overflow-hidden bg-neutral-950 border border-lh-border flex items-center justify-center my-2">
              {/* Photo of Hamilton with Helmet / Face */}
              <img
                src="https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?auto=format&fit=crop&w=900&q=85"
                alt="Lewis Hamilton with Racing Helmet"
                className="w-full h-full object-cover object-top filter contrast-110 saturate-105 group-hover:scale-105 transition-transform duration-700"
              />

              {/* Holographic Visor Overlay Simulation */}
              <div
                className={`absolute left-[18%] right-[18%] top-[24%] h-20 rounded-2xl transition-all duration-500 flex items-center justify-center pointer-events-none ${
                  visorOpen
                    ? 'top-[16%] opacity-20 border-t-2 border-white/40'
                    : `bg-gradient-to-r ${visorStyles} border border-white/30 shadow-[0_0_20px_rgba(255,255,255,0.25)]`
                }`}
              >
                {!visorOpen && (
                  <div className="w-full px-4 flex justify-between items-center text-[9px] font-mono font-bold text-white/90 uppercase tracking-widest">
                    <span>BELL // 44</span>
                    <span className="text-white/60">FIA 8860</span>
                  </div>
                )}
              </div>

              {/* Bottom Helmet Label Overlay */}
              <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black via-black/80 to-transparent p-4 flex justify-between items-end">
                <div>
                  <span className="text-[10px] font-mono text-lh-yellow uppercase font-bold tracking-wider block">
                    DRIVER SPECIFICATION
                  </span>
                  <span className="font-display font-black text-lg text-white uppercase">
                    SIR LEWIS HAMILTON
                  </span>
                  <span className="font-mono text-[10px] text-lh-muted block">
                    SCUDERIA FERRARI HP • BELL HP77 ABP CARBON
                  </span>
                </div>
                <div className="w-9 h-9 rounded-full bg-lh-void/90 border border-lh-border flex items-center justify-center text-lh-yellow font-bold text-xs font-mono">
                  44
                </div>
              </div>
            </div>

            {/* Interactive Control Toggles (Visor + Lighting Aura) */}
            <div className="mt-4 pt-3 border-t border-lh-border/60 space-y-2.5">
              {/* Visor State Toggle & Tint Select */}
              <div className="flex items-center justify-between">
                <button
                  onClick={() => {
                    soundEngine.playClick();
                    setVisorOpen(!visorOpen);
                  }}
                  className="flex items-center space-x-1.5 text-xs font-mono px-3 py-1.5 rounded-lg bg-lh-dark border border-lh-border hover:border-lh-yellow text-white transition-colors"
                  data-cursor="VISOR"
                >
                  <Eye className="w-3.5 h-3.5 text-lh-yellow" />
                  <span>{visorOpen ? 'VISOR: OPEN' : 'VISOR: CLOSED'}</span>
                </button>

                <div className="flex items-center space-x-1">
                  {(['gold', 'purple', 'smoke'] as const).map(tint => (
                    <button
                      key={tint}
                      onClick={() => {
                        soundEngine.playHover();
                        setVisorTint(tint);
                      }}
                      className={`px-2 py-1 rounded text-[10px] font-mono uppercase font-bold transition-all ${
                        visorTint === tint
                          ? 'bg-lh-yellow text-lh-void shadow-[0_0_8px_#CCFF00]'
                          : 'bg-lh-dark text-lh-muted hover:text-white border border-lh-border'
                      }`}
                      data-cursor="TINT"
                    >
                      {tint}
                    </button>
                  ))}
                </div>
              </div>

              {/* Lighting Aura Switcher */}
              <div className="flex items-center justify-between pt-1">
                <span className="text-[10px] font-mono text-lh-muted uppercase flex items-center space-x-1">
                  <Palette className="w-3 h-3 text-lh-yellow" />
                  <span>AERO LIGHTING</span>
                </span>
                <div className="flex space-x-2">
                  {[
                    { id: 'ferrari', color: '#FF1801', title: 'Ferrari Scarlet' },
                    { id: 'fluo', color: '#CCFF00', title: 'Fluo Yellow' },
                    { id: 'amethyst', color: '#9945FF', title: 'Amethyst Purple' },
                    { id: 'petronas', color: '#00D2BE', title: 'Petronas Teal' }
                  ].map(a => (
                    <button
                      key={a.id}
                      onClick={() => {
                        soundEngine.playHover();
                        setLightingAura(a.id as typeof lightingAura);
                      }}
                      className={`w-5 h-5 rounded-full border-2 transition-transform ${
                        lightingAura === a.id ? 'scale-125 border-white' : 'border-transparent hover:scale-110'
                      }`}
                      style={{ backgroundColor: a.color }}
                      title={a.title}
                      data-cursor="LIGHT"
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Live Cockpit HUD Overlay */}
      <div className="mt-8">
        <TelemetryHUD telemetry={telemetry} isConnected={isConnected} />
      </div>
    </section>
  );
};
