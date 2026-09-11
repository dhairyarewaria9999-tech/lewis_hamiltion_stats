import React, { useState, useEffect } from 'react';
import { EraInfo, ChampionshipTrophy, CareerOverview } from '../../types';
import { api } from '../../services/api';
import { soundEngine } from '../audio/SoundEngine';
import { Trophy, Award, Flag, Sparkles, Zap } from 'lucide-react';

export const CareerVault: React.FC = () => {
  const [overview, setOverview] = useState<CareerOverview | null>(null);
  const [eras, setEras] = useState<EraInfo[]>([]);
  const [trophies, setTrophies] = useState<ChampionshipTrophy[]>([]);
  const [selectedEra, setSelectedEra] = useState<string>('all');
  const [activeTrophy, setActiveTrophy] = useState<number | null>(2020);

  useEffect(() => {
    api.getCareerOverview().then(setOverview).catch(() => {});
    api.getCareerEras().then(setEras).catch(() => {});
    api.getCareerTrophies().then(setTrophies).catch(() => {});
  }, []);

  const filteredTrophies = selectedEra === 'all'
    ? trophies
    : selectedEra === 'mercedes'
    ? trophies.filter(t => t.team.includes('Mercedes'))
    : selectedEra === 'mclaren'
    ? trophies.filter(t => t.team.includes('McLaren'))
    : [];

  return (
    <section id="trophies" className="py-24 px-4 md:px-8 max-w-7xl mx-auto">
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 pb-6 border-b border-lh-border/60 gap-4">
        <div>
          <div className="flex items-center space-x-2 text-lh-yellow font-mono text-xs uppercase tracking-widest mb-1.5">
            <Trophy className="w-4 h-4 text-lh-yellow" />
            <span>THE DYNASTY // ALL-TIME F1 ARCHIVE</span>
          </div>
          <h2 className="font-display font-black text-4xl sm:text-6xl uppercase tracking-tighter text-white">
            7X WORLD <span className="text-lh-yellow">CHAMPION</span>
          </h2>
        </div>

        <p className="max-w-md text-sm text-lh-muted">
          From karting tracks in Stevenage to 7 World Titles, shattering every statistical milestone in Formula 1 history.
        </p>
      </div>

      {/* Record Stat Counters Banner */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-14">
        <div className="glass-panel p-6 rounded-2xl border border-lh-border/80 relative overflow-hidden group hover:border-lh-yellow/40 transition-all">
          <span className="font-mono text-xs text-lh-muted uppercase">WORLD TITLES</span>
          <div className="font-display font-black text-5xl sm:text-6xl text-lh-yellow tracking-tight mt-2">
            7
          </div>
          <span className="text-xs text-lh-muted font-mono mt-1 block">ALL-TIME RECORD TIED</span>
          <div className="absolute -right-4 -bottom-4 opacity-5 group-hover:opacity-10 transition-opacity">
            <Trophy className="w-24 h-24 text-lh-yellow" />
          </div>
        </div>

        <div className="glass-panel p-6 rounded-2xl border border-lh-border/80 relative overflow-hidden group hover:border-white/40 transition-all">
          <span className="font-mono text-xs text-lh-muted uppercase">GRAND PRIX WINS</span>
          <div className="font-display font-black text-5xl sm:text-6xl text-white tracking-tight mt-2">
            {overview?.raceWins ?? 105}
          </div>
          <span className="text-xs text-lh-yellow font-mono mt-1 block">ALL-TIME #1 RANK</span>
          <div className="absolute -right-4 -bottom-4 opacity-5 group-hover:opacity-10 transition-opacity">
            <Flag className="w-24 h-24 text-white" />
          </div>
        </div>

        <div className="glass-panel p-6 rounded-2xl border border-lh-border/80 relative overflow-hidden group hover:border-lh-purple/40 transition-all">
          <span className="font-mono text-xs text-lh-muted uppercase">POLE POSITIONS</span>
          <div className="font-display font-black text-5xl sm:text-6xl text-lh-purple tracking-tight mt-2">
            {overview?.polePositions ?? 104}
          </div>
          <span className="text-xs text-lh-muted font-mono mt-1 block">ALL-TIME #1 RANK</span>
          <div className="absolute -right-4 -bottom-4 opacity-5 group-hover:opacity-10 transition-opacity">
            <Zap className="w-24 h-24 text-lh-purple" />
          </div>
        </div>

        <div className="glass-panel p-6 rounded-2xl border border-lh-border/80 relative overflow-hidden group hover:border-lh-red/40 transition-all">
          <span className="font-mono text-xs text-lh-muted uppercase">PODIUM FINISHES</span>
          <div className="font-display font-black text-5xl sm:text-6xl text-white tracking-tight mt-2">
            {overview?.podiums ?? 201}
          </div>
          <span className="text-xs text-lh-red font-mono mt-1 block">FIRST DRIVER TO 200+</span>
          <div className="absolute -right-4 -bottom-4 opacity-5 group-hover:opacity-10 transition-opacity">
            <Award className="w-24 h-24 text-lh-red" />
          </div>
        </div>
      </div>

      {/* Eras Filter Tabs */}
      <div className="flex flex-wrap gap-2 mb-10">
        {[
          { id: 'all', label: 'ALL ERAS' },
          { id: 'ferrari', label: 'SCUDERIA FERRARI (2025–)' },
          { id: 'mercedes', label: 'MERCEDES-AMG (2013–2024)' },
          { id: 'mclaren', label: 'MCLAREN MERCEDES (2007–2012)' }
        ].map(tab => (
          <button
            key={tab.id}
            onClick={() => {
              soundEngine.playClick();
              setSelectedEra(tab.id);
            }}
            className={`px-4 py-2.5 rounded-xl font-mono text-xs uppercase tracking-wider transition-all ${
              selectedEra === tab.id
                ? 'bg-lh-yellow text-lh-void font-bold shadow-[0_0_15px_rgba(204,255,0,0.3)]'
                : 'bg-lh-dark/80 hover:bg-lh-card border border-lh-border text-lh-muted hover:text-white'
            }`}
            data-cursor="FILTER"
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Selected Era Details Banner */}
      {selectedEra !== 'all' && (() => {
        const activeEraInfo = eras.find(e => e.id === selectedEra);
        if (!activeEraInfo) return null;
        return (
          <div className="glass-panel p-6 rounded-2xl border border-lh-border/80 mb-8">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-lh-border/60">
              <div>
                <span className="text-[10px] font-mono text-lh-yellow uppercase font-bold tracking-wider">
                  ERA SPECIFICATION // {activeEraInfo.years}
                </span>
                <h3 className="font-display font-black text-2xl uppercase text-white mt-1">
                  {activeEraInfo.name} — {activeEraInfo.team}
                </h3>
              </div>
              <div className="flex items-center space-x-3 text-xs font-mono">
                <span className="px-3 py-1 rounded bg-lh-dark border border-lh-border text-white">
                  MACHINERY: <strong className="text-lh-yellow">{activeEraInfo.carModel}</strong>
                </span>
              </div>
            </div>
            <p className="text-xs text-lh-muted font-mono leading-relaxed mt-4">
              {activeEraInfo.description}
            </p>
            <div className="mt-4 flex flex-wrap gap-2">
              {activeEraInfo.highlights.map((hl, i) => (
                <span key={i} className="px-2.5 py-1 rounded bg-lh-dark/80 border border-lh-border/60 text-[11px] font-mono text-white/90">
                  ⚡ {hl}
                </span>
              ))}
            </div>
          </div>
        );
      })()}

      {/* Championship Trophies Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredTrophies.map(trophy => {
          const isExpanded = activeTrophy === trophy.year;
          return (
            <div
              key={trophy.year}
              onClick={() => {
                soundEngine.playHover();
                setActiveTrophy(isExpanded ? null : trophy.year);
              }}
              className={`glass-panel rounded-2xl p-6 border transition-all duration-300 cursor-pointer ${
                isExpanded
                  ? 'border-lh-yellow shadow-[0_0_30px_rgba(204,255,0,0.15)] bg-lh-card'
                  : 'border-lh-border/80 hover:border-white/30'
              }`}
              data-cursor="EXPAND"
            >
              <div className="flex items-start justify-between mb-4">
                <div>
                  <span className="px-2.5 py-1 rounded bg-lh-dark text-xs font-mono font-bold text-lh-yellow border border-lh-yellow/30">
                    {trophy.year} CHAMPION
                  </span>
                  <h3 className="font-display font-black text-2xl uppercase mt-2 text-white">
                    {trophy.team}
                  </h3>
                </div>
                <div className="w-10 h-10 rounded-full bg-lh-yellow/10 flex items-center justify-center text-lh-yellow">
                  <Trophy className="w-5 h-5" />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-2 py-3 border-y border-lh-border/50 text-center font-mono my-4">
                <div>
                  <span className="text-[10px] text-lh-muted uppercase block">WINS</span>
                  <span className="text-base font-bold text-white">{trophy.wins}</span>
                </div>
                <div>
                  <span className="text-[10px] text-lh-muted uppercase block">POLES</span>
                  <span className="text-base font-bold text-white">{trophy.poles}</span>
                </div>
                <div>
                  <span className="text-[10px] text-lh-muted uppercase block">POINTS</span>
                  <span className="text-base font-bold text-lh-yellow">{trophy.points}</span>
                </div>
              </div>

              <div className="space-y-2 text-xs font-mono text-lh-muted">
                <div className="flex justify-between">
                  <span>CAR MODEL:</span>
                  <strong className="text-white">{trophy.car}</strong>
                </div>
                <div className="flex justify-between">
                  <span>DECIDING RACE:</span>
                  <strong className="text-white text-right">{trophy.decidingRace}</strong>
                </div>
              </div>

              {/* Quote dropdown */}
              {isExpanded && (
                <div className="mt-4 pt-4 border-t border-lh-border/60 text-xs italic text-lh-yellow/90 bg-lh-dark/60 p-3 rounded-lg">
                  "{trophy.quote}"
                </div>
              )}
            </div>
          );
        })}

        {/* Special Ferrari Era Card */}
        {(selectedEra === 'all' || selectedEra === 'ferrari') && (
          <div className="glass-panel rounded-2xl p-6 border border-lh-red/50 relative overflow-hidden bg-gradient-to-b from-lh-card to-red-950/20">
            <div className="flex items-start justify-between mb-4">
              <div>
                <span className="px-2.5 py-1 rounded bg-lh-red text-xs font-mono font-bold text-white">
                  2025 CHAPTER // ACTIVE
                </span>
                <h3 className="font-display font-black text-2xl uppercase mt-2 text-white">
                  Scuderia Ferrari HP
                </h3>
              </div>
              <div className="w-10 h-10 rounded-full bg-lh-red/20 flex items-center justify-center text-lh-red">
                <Sparkles className="w-5 h-5" />
              </div>
            </div>

            <p className="text-xs text-lh-muted font-mono leading-relaxed mb-4">
              The historic transfer to Maranello. Partnering with Charles Leclerc and driving the Ferrari SF-25 in the hunt for the unprecedented 8th crown.
            </p>

            <div className="p-3 rounded-xl bg-lh-dark/80 border border-lh-border text-xs font-mono text-white/90">
              <span className="text-lh-red font-bold">STATUS:</span> In Pursuit of Title #8
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
