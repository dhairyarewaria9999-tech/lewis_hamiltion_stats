import React, { useState, useEffect } from 'react';
import { FanMessage, TeamRadioClip } from '../../types';
import { api } from '../../services/api';
import { soundEngine } from '../audio/SoundEngine';
import confetti from 'canvas-confetti';
import { ShieldCheck, Radio, MessageSquare, Send, Download, Sparkles, Volume2, Check } from 'lucide-react';

export const PaddockPassSection: React.FC = () => {
  // Paddock Pass Generator State
  const [guestName, setGuestName] = useState('ALEXANDER VANCE');
  const [guestNumber, setGuestNumber] = useState('44');
  const [accessLevel, setAccessLevel] = useState('VIP GARAGE ACCESS');

  // Radio clips state
  const [radioClips, setRadioClips] = useState<TeamRadioClip[]>([]);
  const [activeClipId, setActiveClipId] = useState<string | null>(null);

  // Fan message board state
  const [messages, setMessages] = useState<FanMessage[]>([]);
  const [formAuthor, setFormAuthor] = useState('');
  const [formHandle, setFormHandle] = useState('');
  const [formCountry, setFormCountry] = useState('');
  const [formFlag, setFormFlag] = useState('🇬🇧');
  const [formMessage, setFormMessage] = useState('');
  const [isSubmittingMessage, setIsSubmittingMessage] = useState(false);
  const [messageSuccess, setMessageSuccess] = useState(false);

  useEffect(() => {
    api.getRadioClips().then(setRadioClips).catch(() => {});
    api.getFanMessages().then(setMessages).catch(() => {});
  }, []);

  const handlePlayRadio = (clip: TeamRadioClip) => {
    setActiveClipId(clip.id);
    soundEngine.playRadioBeep();

    // Reset after 3 seconds
    setTimeout(() => {
      setActiveClipId(null);
    }, 3200);
  };

  const handleDownloadPass = () => {
    soundEngine.playCelebration();
    confetti({
      particleCount: 80,
      spread: 60,
      colors: ['#CCFF00', '#FF1801', '#9945FF']
    });

    // Create printable window or simulated download
    window.print();
  };

  const handleSubmitMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formAuthor.trim() || !formMessage.trim()) return;

    setIsSubmittingMessage(true);
    soundEngine.playClick();

    try {
      const res = await api.postFanMessage({
        author: formAuthor,
        handle: formHandle.startsWith('@') ? formHandle : `@${formHandle}`,
        country: formCountry || 'International',
        flag: formFlag || '🏁',
        message: formMessage,
      });

      if (res.success && res.data) {
        setMessages(prev => [res.data!, ...prev]);
        setFormMessage('');
        setMessageSuccess(true);
        setTimeout(() => setMessageSuccess(false), 3000);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsSubmittingMessage(false);
    }
  };

  return (
    <section id="paddock" className="py-24 px-4 md:px-8 max-w-7xl mx-auto">
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 pb-6 border-b border-lh-border/60 gap-4">
        <div>
          <div className="flex items-center space-x-2 text-lh-red font-mono text-xs uppercase tracking-widest mb-1.5">
            <ShieldCheck className="w-4 h-4 text-lh-red" />
            <span>PADDOCK CLUB & FAN ZONE // VIP ACCREDITATION</span>
          </div>
          <h2 className="font-display font-black text-4xl sm:text-6xl uppercase tracking-tighter text-white">
            PADDOCK <span className="text-lh-red">PASS & RADIO</span>
          </h2>
        </div>

        <p className="max-w-md text-sm text-lh-muted">
          Generate your personalized official LH44 Digital Paddock Pass, listen to legendary pit-wall radio archives, and share your dispatch with the global fanbase.
        </p>
      </div>

      {/* Grid: Paddock Pass Generator + Radio Soundboard */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-16">
        {/* Pass Customizer & Holographic Card (7 Cols) */}
        <div className="lg:col-span-7 glass-panel rounded-2xl p-6 md:p-8 border border-lh-border/80 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-6">
              <span className="font-mono text-xs uppercase tracking-wider text-lh-yellow font-bold flex items-center space-x-1.5">
                <Sparkles className="w-4 h-4 text-lh-yellow" />
                <span>INTERACTIVE DIGITAL CREDENTIAL</span>
              </span>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-lh-red text-white uppercase font-bold">
                FIA 2025 COMPLIANT
              </span>
            </div>

            {/* Inputs to customize pass */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-8">
              <div>
                <label className="block text-[10px] font-mono uppercase text-lh-muted mb-1">HOLDER NAME</label>
                <input
                  type="text"
                  value={guestName}
                  onChange={e => setGuestName(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg bg-lh-dark border border-lh-border text-xs font-mono text-white focus:border-lh-yellow outline-none uppercase"
                  placeholder="YOUR NAME"
                />
              </div>

              <div>
                <label className="block text-[10px] font-mono uppercase text-lh-muted mb-1">RACE NUMBER</label>
                <select
                  value={guestNumber}
                  onChange={e => setGuestNumber(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg bg-lh-dark border border-lh-border text-xs font-mono text-lh-yellow focus:border-lh-yellow outline-none font-bold"
                >
                  <option value="44">#44 (Lewis Hamilton)</option>
                  <option value="7">#7 (7x World Titles)</option>
                  <option value="1">#1 (World Champion)</option>
                  <option value="16">#16 (Charles Leclerc)</option>
                </select>
              </div>

              <div>
                <label className="block text-[10px] font-mono uppercase text-lh-muted mb-1">ACCESS TIER</label>
                <select
                  value={accessLevel}
                  onChange={e => setAccessLevel(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg bg-lh-dark border border-lh-border text-xs font-mono text-white focus:border-lh-yellow outline-none"
                >
                  <option value="VIP GARAGE ACCESS">VIP GARAGE ACCESS</option>
                  <option value="PIT WALL OBSERVER">PIT WALL OBSERVER</option>
                  <option value="PADDOCK CLUB PLATINUM">PADDOCK CLUB PLATINUM</option>
                </select>
              </div>
            </div>

            {/* The Holographic Digital Badge Itself */}
            <div className="relative rounded-2xl p-6 md:p-8 bg-gradient-to-br from-neutral-900 via-neutral-950 to-neutral-900 border-2 border-lh-border/80 shadow-2xl overflow-hidden group hover:border-lh-yellow/60 transition-all">
              {/* Lanyard Notch */}
              <div className="w-16 h-3 bg-lh-void rounded-full mx-auto mb-4 border border-lh-border/60" />

              {/* Hologram Shimmer Ribbon */}
              <div className="absolute top-0 right-0 w-32 h-full bg-gradient-to-l from-lh-yellow/10 via-lh-purple/10 to-transparent pointer-events-none" />

              <div className="flex justify-between items-start mb-6">
                <div>
                  <div className="text-[10px] font-mono tracking-widest text-lh-red font-bold uppercase">
                    SCUDERIA FERRARI HP // LH44
                  </div>
                  <h4 className="font-display font-black text-2xl md:text-3xl uppercase text-white mt-1">
                    OFFICIAL PADDOCK PASS
                  </h4>
                </div>
                <div className="font-display font-black text-4xl text-lh-yellow">
                  #{guestNumber}
                </div>
              </div>

              <div className="py-4 my-2 border-y border-neutral-800">
                <span className="text-[10px] font-mono text-lh-muted uppercase block">PASS HOLDER</span>
                <span className="font-display font-black text-2xl uppercase tracking-wide text-white">
                  {guestName || 'GUEST OF HONOR'}
                </span>
                <div className="mt-2 inline-block px-2.5 py-0.5 rounded bg-lh-yellow/20 text-lh-yellow border border-lh-yellow/40 font-mono text-[10px] font-bold uppercase">
                  {accessLevel}
                </div>
              </div>

              {/* Pass Security Barcode & QR Code simulation */}
              <div className="flex items-center justify-between pt-4">
                <div className="space-y-1">
                  <div className="flex space-x-0.5 h-7 items-end">
                    {[3, 7, 2, 5, 8, 4, 2, 6, 8, 3, 5, 7, 4, 8, 2, 5, 6, 3, 7, 4, 2, 6, 7].map((h, i) => (
                      <div key={i} className="w-1 bg-white/70 rounded-t" style={{ height: `${h * 3.5}px` }} />
                    ))}
                  </div>
                  <span className="font-mono text-[9px] text-neutral-500 block">SECURE-LH44-2025-VALID</span>
                </div>

                <div className="w-12 h-12 bg-white p-1 rounded-lg">
                  {/* High tech QR SVG */}
                  <svg viewBox="0 0 24 24" className="w-full h-full text-black fill-current">
                    <path d="M2 2h8v8H2zm2 2v4h4V4zm-2 10h8v8H2zm2 2v4h4v-4zm10-14h8v8h-8zm2 2v4h4V4zm-2 10h2v2h-2zm4 0h4v2h-4zm-4 4h4v2h-4zm4 2h2v2h-2zm2-2h2v2h-2zm-6 2h2v2h-2z" />
                  </svg>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-6 pt-4 border-t border-lh-border/60 flex justify-end">
            <button
              onClick={handleDownloadPass}
              className="px-6 py-3 rounded-xl bg-lh-yellow text-lh-void font-display font-bold text-xs uppercase tracking-wider hover:bg-white transition-colors flex items-center space-x-2 shadow-[0_0_15px_rgba(204,255,0,0.3)]"
              data-cursor="PRINT PASS"
            >
              <Download className="w-4 h-4" />
              <span>PRINT / SAVE CREDENTIAL</span>
            </button>
          </div>
        </div>

        {/* Team Radio Soundboard (5 Cols) */}
        <div className="lg:col-span-5 glass-panel rounded-2xl p-6 md:p-8 border border-lh-border/80 flex flex-col justify-between">
          <div>
            <div className="flex items-center space-x-2 text-lh-yellow font-mono text-xs uppercase tracking-wider mb-2">
              <Radio className="w-4 h-4 animate-pulse" />
              <span>TEAM RADIO COMMUNICATIONS</span>
            </div>
            <h3 className="font-display font-black text-2xl uppercase text-white mb-2">
              PIT WALL AUDIO ARCHIVE
            </h3>
            <p className="text-xs text-lh-muted font-mono mb-6">
              Click any transmission to hear synthesized team radio frequencies and iconic radio calls.
            </p>

            {/* Radio Clips List */}
            <div className="space-y-3">
              {radioClips.map(clip => {
                const isPlaying = activeClipId === clip.id;

                return (
                  <div
                    key={clip.id}
                    onClick={() => handlePlayRadio(clip)}
                    className={`p-4 rounded-xl border transition-all cursor-pointer ${
                      isPlaying
                        ? 'border-lh-yellow bg-lh-dark shadow-[0_0_20px_rgba(204,255,0,0.2)]'
                        : 'border-lh-border/80 bg-lh-dark/60 hover:border-white/30'
                    }`}
                    data-cursor="PLAY"
                  >
                    <div className="flex items-start justify-between">
                      <div>
                        <div className="flex items-center space-x-2">
                          <span className="font-display font-bold text-sm uppercase text-white">
                            {clip.title}
                          </span>
                          <span className="text-[10px] font-mono px-1.5 py-0.2 rounded bg-lh-card border border-lh-border text-lh-yellow">
                            {clip.year}
                          </span>
                        </div>
                        <p className="text-xs text-lh-muted italic mt-1 font-mono">
                          "{clip.quote}"
                        </p>
                      </div>

                      <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                        isPlaying ? 'bg-lh-yellow text-lh-void animate-spin' : 'bg-neutral-800 text-white'
                      }`}>
                        <Volume2 className="w-4 h-4" />
                      </div>
                    </div>

                    <div className="mt-2 pt-2 border-t border-lh-border/40 flex justify-between text-[10px] font-mono text-neutral-400">
                      <span>SPEAKER: {clip.speaker}</span>
                      <span>CIRCUIT: {clip.circuit}</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="mt-6 p-3 rounded-xl bg-lh-dark border border-lh-border text-center text-xs font-mono text-lh-muted">
            Radio transmissions broadcasted directly over FIA team frequencies.
          </div>
        </div>
      </div>

      {/* Fan Message Wall */}
      <div className="glass-panel rounded-2xl p-6 md:p-8 border border-lh-border/80">
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
          <div>
            <div className="flex items-center space-x-2 text-lh-purple font-mono text-xs uppercase tracking-wider mb-1">
              <MessageSquare className="w-4 h-4 text-lh-purple" />
              <span>GLOBAL FAN DISPATCH // +44 COMMUNITY WALL</span>
            </div>
            <h3 className="font-display font-black text-2xl sm:text-3xl uppercase text-white">
              DISPATCHES FOR LEWIS
            </h3>
          </div>
        </div>

        {/* Submission Form */}
        <form onSubmit={handleSubmitMessage} className="p-4 rounded-xl bg-lh-dark/80 border border-lh-border mb-8 space-y-3">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <input
              type="text"
              value={formAuthor}
              onChange={e => setFormAuthor(e.target.value)}
              placeholder="Your Name (e.g. Marcus)"
              className="px-3 py-2 rounded-lg bg-lh-card border border-lh-border text-xs font-mono text-white focus:border-lh-yellow outline-none"
              required
            />
            <input
              type="text"
              value={formHandle}
              onChange={e => setFormHandle(e.target.value)}
              placeholder="Social Handle (e.g. @marcus_f1)"
              className="px-3 py-2 rounded-lg bg-lh-card border border-lh-border text-xs font-mono text-white focus:border-lh-yellow outline-none"
              required
            />
            <div className="flex space-x-2">
              <input
                type="text"
                value={formCountry}
                onChange={e => setFormCountry(e.target.value)}
                placeholder="Country (e.g. UK)"
                className="flex-1 px-3 py-2 rounded-lg bg-lh-card border border-lh-border text-xs font-mono text-white focus:border-lh-yellow outline-none"
                required
              />
              <input
                type="text"
                value={formFlag}
                onChange={e => setFormFlag(e.target.value)}
                placeholder="Flag"
                className="w-14 px-2 py-2 rounded-lg bg-lh-card border border-lh-border text-xs text-center font-mono text-white focus:border-lh-yellow outline-none"
              />
            </div>
          </div>

          <div className="flex gap-2">
            <input
              type="text"
              value={formMessage}
              onChange={e => setFormMessage(e.target.value)}
              placeholder="Leave a message for Lewis as he embarks on the Ferrari era..."
              className="flex-1 px-4 py-2.5 rounded-lg bg-lh-card border border-lh-border text-xs font-mono text-white focus:border-lh-yellow outline-none"
              required
            />
            <button
              type="submit"
              disabled={isSubmittingMessage}
              className="px-5 py-2.5 rounded-lg bg-lh-yellow text-lh-void font-bold text-xs uppercase font-mono tracking-wider hover:bg-white transition-colors flex items-center space-x-1.5"
            >
              {isSubmittingMessage ? <span>SENDING...</span> : (
                <>
                  <Send className="w-3.5 h-3.5" />
                  <span>DISPATCH</span>
                </>
              )}
            </button>
          </div>

          {messageSuccess && (
            <div className="text-emerald-400 font-mono text-xs flex items-center space-x-1">
              <Check className="w-4 h-4" />
              <span>Message posted to the global wall!</span>
            </div>
          )}
        </form>

        {/* Messages List */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {messages.map(msg => (
            <div
              key={msg.id}
              className="p-4 rounded-xl bg-lh-dark/60 border border-lh-border/60 hover:border-lh-border transition-colors"
            >
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center space-x-2">
                  <span className="text-lg">{msg.flag}</span>
                  <div>
                    <span className="font-display font-bold text-sm text-white block">
                      {msg.author}
                    </span>
                    <span className="font-mono text-[10px] text-lh-muted">
                      {msg.handle} • {msg.country}
                    </span>
                  </div>
                </div>
                <span className="text-[10px] font-mono text-neutral-500">
                  {msg.timestamp}
                </span>
              </div>
              <p className="text-xs text-neutral-300 font-mono leading-relaxed mt-2">
                {msg.message}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
