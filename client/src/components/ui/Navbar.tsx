import React, { useState, useEffect } from 'react';
import { soundEngine } from '../audio/SoundEngine';
import { Volume2, VolumeX, ShoppingBag, Menu, X } from 'lucide-react';

interface NavbarProps {
  cartCount: number;
  onOpenCart: () => void;
  isMuted: boolean;
  onToggleSound: () => void;
  visualizerLevels: number[];
  activeSection: string;
  onNavigate: (sectionId: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  cartCount,
  onOpenCart,
  isMuted,
  onToggleSound,
  visualizerLevels,
  activeSection,
  onNavigate,
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { id: 'telemetry', label: 'PIT WALL' },
    { id: 'trophies', label: '7X VAULT' },
    { id: 'store', label: '+44 STORE' },
    { id: 'mission44', label: 'MISSION 44' },
    { id: 'paddock', label: 'PADDOCK PASS' },
  ];

  const handleNavClick = (id: string) => {
    soundEngine.playClick();
    onNavigate(id);
    setMobileMenuOpen(false);
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        isScrolled
          ? 'bg-lh-void/90 backdrop-blur-md border-b border-lh-border py-3 shadow-xl'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 md:px-8 flex items-center justify-between">
        {/* Monogram Logo */}
        <div
          onClick={() => handleNavClick('hero')}
          className="flex items-center space-x-2.5 cursor-pointer group"
          data-cursor="HOME"
        >
          <div className="w-9 h-9 rounded-xl bg-lh-card border border-lh-border/80 flex items-center justify-center font-display font-black text-sm text-lh-yellow group-hover:border-lh-yellow transition-all group-hover:scale-105 shadow-[0_0_15px_rgba(204,255,0,0.15)]">
            44
          </div>
          <div className="flex flex-col">
            <span className="font-display font-black text-sm tracking-tighter text-white uppercase group-hover:text-lh-yellow transition-colors">
              LEWIS HAMILTON
            </span>
            <span className="font-mono text-[9px] tracking-widest text-lh-muted uppercase -mt-0.5">
              OFFICIAL EXPERIENCE
            </span>
          </div>
        </div>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center space-x-1 p-1 rounded-full bg-lh-dark/70 border border-lh-border/80 backdrop-blur-md">
          {navLinks.map(link => {
            const isActive = activeSection === link.id;
            return (
              <button
                key={link.id}
                onClick={() => handleNavClick(link.id)}
                className={`px-4 py-1.5 rounded-full font-mono text-xs uppercase tracking-wider transition-all ${
                  isActive
                    ? 'bg-lh-yellow text-lh-void font-bold shadow-[0_0_12px_rgba(204,255,0,0.3)]'
                    : 'text-lh-muted hover:text-white hover:bg-lh-card'
                }`}
                data-cursor="NAV"
              >
                {link.label}
              </button>
            );
          })}
        </nav>

        {/* Right Actions: Sound Visualizer + Cart Bag + Mobile Hamburger */}
        <div className="flex items-center space-x-3">
          {/* Audio Engine Button */}
          <button
            onClick={onToggleSound}
            className="flex items-center space-x-2 p-2 sm:px-3 sm:py-1.5 rounded-xl bg-lh-dark/80 hover:bg-lh-card border border-lh-border hover:border-lh-yellow/50 text-lh-muted hover:text-white transition-all"
            data-cursor="AUDIO"
            title={isMuted ? 'Turn on sound engine' : 'Mute sound engine'}
          >
            {/* Visualizer bars */}
            <div className="hidden sm:flex items-end space-x-0.5 h-3">
              {visualizerLevels.slice(0, 4).map((lvl, idx) => (
                <div
                  key={idx}
                  className={`w-0.5 rounded-t transition-all duration-75 ${
                    isMuted ? 'bg-neutral-600 h-1' : 'bg-lh-yellow'
                  }`}
                  style={{ height: isMuted ? '3px' : `${Math.max(15, lvl)}%` }}
                />
              ))}
            </div>

            {isMuted ? (
              <VolumeX className="w-4 h-4 text-lh-muted" />
            ) : (
              <Volume2 className="w-4 h-4 text-lh-yellow animate-pulse" />
            )}
          </button>

          {/* +44 Shopping Bag Button */}
          <button
            onClick={() => {
              soundEngine.playClick();
              onOpenCart();
            }}
            className="relative p-2 sm:px-3 sm:py-1.5 rounded-xl bg-lh-dark/80 hover:bg-lh-card border border-lh-border hover:border-lh-yellow/50 text-white transition-all flex items-center space-x-1.5"
            data-cursor="BAG"
          >
            <ShoppingBag className="w-4 h-4 text-lh-yellow" />
            <span className="hidden sm:inline font-mono text-xs uppercase font-bold text-white">
              BAG
            </span>
            {cartCount > 0 && (
              <span className="w-4 h-4 rounded-full bg-lh-yellow text-lh-void font-mono font-black text-[9px] flex items-center justify-center animate-bounce">
                {cartCount}
              </span>
            )}
          </button>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-xl bg-lh-dark border border-lh-border text-white"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-lh-card/95 backdrop-blur-xl border-b border-lh-border px-6 py-6 space-y-3">
          {navLinks.map(link => (
            <button
              key={link.id}
              onClick={() => handleNavClick(link.id)}
              className="w-full text-left py-2.5 px-3 rounded-lg font-mono text-sm uppercase tracking-wider text-lh-muted hover:text-white hover:bg-lh-dark transition-colors"
            >
              {link.label}
            </button>
          ))}
        </div>
      )}
    </header>
  );
};
