import React, { useState, useEffect } from 'react';
import { MissionInitiative } from '../../types';
import { api } from '../../services/api';
import { soundEngine } from '../audio/SoundEngine';
import { Heart, Users, GraduationCap, Award, ArrowUpRight, CheckCircle2 } from 'lucide-react';

export const Mission44Section: React.FC = () => {
  const [missionData, setMissionData] = useState<{
    totalPledged: string;
    studentsImpacted: string;
    grantsAwarded: string;
    initiatives: MissionInitiative[];
  } | null>(null);

  const [email, setEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);

  useEffect(() => {
    api.getMissionData().then(setMissionData).catch(() => {});
  }, []);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.includes('@')) {
      soundEngine.playCelebration();
      setIsSubscribed(true);
    }
  };

  return (
    <section id="mission44" className="py-24 px-4 md:px-8 max-w-7xl mx-auto">
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 pb-6 border-b border-lh-border/60 gap-4">
        <div>
          <div className="flex items-center space-x-2 text-lh-purple font-mono text-xs uppercase tracking-widest mb-1.5">
            <Heart className="w-4 h-4 text-lh-purple" />
            <span>MISSION 44 FOUNDATION // EMPOWERING THE NEXT GENERATION</span>
          </div>
          <h2 className="font-display font-black text-4xl sm:text-6xl uppercase tracking-tighter text-white">
            BUILDING A MORE <span className="text-lh-purple">INCLUSIVE FUTURE</span>
          </h2>
        </div>

        <p className="max-w-md text-sm text-lh-muted">
          Founded by Sir Lewis Hamilton to transform education, champion diversity in STEM, and open doors for young people across the globe.
        </p>
      </div>

      {/* Impact Stat Counters */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-14">
        <div className="glass-panel p-8 rounded-2xl border border-lh-border/80 flex flex-col justify-between">
          <div className="flex items-center space-x-3 text-lh-purple mb-4">
            <Award className="w-6 h-6" />
            <span className="font-mono text-xs uppercase tracking-wider text-lh-muted">TOTAL PLEDGED</span>
          </div>
          <div className="font-display font-black text-5xl text-white tracking-tight">
            {missionData?.totalPledged || '£20 Million+'}
          </div>
          <span className="font-mono text-xs text-lh-muted mt-2">Personal philanthropic commitment</span>
        </div>

        <div className="glass-panel p-8 rounded-2xl border border-lh-border/80 flex flex-col justify-between">
          <div className="flex items-center space-x-3 text-lh-yellow mb-4">
            <Users className="w-6 h-6" />
            <span className="font-mono text-xs uppercase tracking-wider text-lh-muted">YOUTH IMPACTED</span>
          </div>
          <div className="font-display font-black text-5xl text-lh-yellow tracking-tight">
            {missionData?.studentsImpacted || '150,000+'}
          </div>
          <span className="font-mono text-xs text-lh-muted mt-2">Students across the UK and worldwide</span>
        </div>

        <div className="glass-panel p-8 rounded-2xl border border-lh-border/80 flex flex-col justify-between">
          <div className="flex items-center space-x-3 text-emerald-400 mb-4">
            <GraduationCap className="w-6 h-6" />
            <span className="font-mono text-xs uppercase tracking-wider text-lh-muted">GRANTS AWARDED</span>
          </div>
          <div className="font-display font-black text-5xl text-white tracking-tight">
            {missionData?.grantsAwarded || '85+'}
          </div>
          <span className="font-mono text-xs text-lh-muted mt-2">Grassroots educational programs funded</span>
        </div>
      </div>

      {/* Initiatives Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-14">
        {missionData?.initiatives.map(initiative => (
          <div
            key={initiative.id}
            className="glass-panel rounded-2xl p-6 border border-lh-border/80 hover:border-lh-purple/50 transition-all flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="px-2.5 py-1 rounded bg-lh-dark border border-lh-border text-[10px] font-mono text-lh-purple uppercase font-bold">
                  {initiative.category}
                </span>
                <span className="font-mono text-xs font-bold text-lh-yellow">
                  {initiative.grantAmount}
                </span>
              </div>

              <h3 className="font-display font-black text-2xl uppercase text-white mb-2">
                {initiative.title}
              </h3>

              <p className="text-xs text-lh-muted leading-relaxed font-mono mb-4">
                {initiative.summary}
              </p>
            </div>

            <div className="pt-4 border-t border-lh-border/50 flex items-center justify-between text-xs font-mono text-white/80">
              <span>PARTNER: <strong className="text-white">{initiative.partner}</strong></span>
              <span className="text-emerald-400 font-bold">{initiative.impactMetrics}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Newsletter Signup Banner */}
      <div className="glass-panel rounded-2xl p-8 border border-lh-purple/40 relative overflow-hidden bg-gradient-to-r from-lh-card via-purple-950/20 to-lh-card">
        <div className="max-w-2xl">
          <span className="font-mono text-xs text-lh-yellow font-bold uppercase tracking-widest">
            JOIN THE MOVEMENT // MISSION 44 DISPATCH
          </span>
          <h3 className="font-display font-black text-3xl sm:text-4xl uppercase text-white mt-2 mb-3">
            BE PART OF THE CHANGE
          </h3>
          <p className="text-xs font-mono text-lh-muted mb-6">
            Receive monthly impact updates, scholarship announcements, and volunteer opportunities.
          </p>

          {isSubscribed ? (
            <div className="flex items-center space-x-2 text-emerald-400 font-mono text-xs bg-emerald-950/40 p-3 rounded-xl border border-emerald-500/40">
              <CheckCircle2 className="w-5 h-5" />
              <span>Thank you for joining the Mission 44 movement. Confirmation sent to your inbox.</span>
            </div>
          ) : (
            <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-3">
              <input
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="Enter your email address"
                required
                className="flex-1 px-4 py-3 rounded-xl bg-lh-dark border border-lh-border text-white text-xs font-mono focus:border-lh-purple outline-none"
              />
              <button
                type="submit"
                className="px-6 py-3 rounded-xl bg-lh-purple hover:bg-lh-purpleLight text-white font-display font-bold text-xs uppercase tracking-wider transition-colors flex items-center justify-center space-x-2"
                data-cursor="SUBSCRIBE"
              >
                <span>SUPPORT MISSION 44</span>
                <ArrowUpRight className="w-4 h-4" />
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
};
