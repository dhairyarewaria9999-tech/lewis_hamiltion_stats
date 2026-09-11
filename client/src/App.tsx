import React, { useState, useEffect } from 'react';
import { AerodynamicTunnel } from './components/canvas/AerodynamicTunnel';
import { CustomCursor } from './components/cursor/CustomCursor';
import { soundEngine } from './components/audio/SoundEngine';
import { useTelemetry } from './hooks/useTelemetry';
import { Navbar } from './components/ui/Navbar';
import { HeroSection } from './components/sections/HeroSection';
import { TrackTelemetrySection } from './components/sections/TrackTelemetrySection';
import { CareerVault } from './components/sections/CareerVault';
import { StoreSection } from './components/sections/StoreSection';
import { CartDrawer } from './components/cart/CartDrawer';
import { Mission44Section } from './components/sections/Mission44Section';
import { PaddockPassSection } from './components/sections/PaddockPassSection';
import { HelmetVault } from './components/sections/HelmetVault';
import { Footer } from './components/ui/Footer';
import { CartItem, ProductItem } from './types';

export const App: React.FC = () => {
  const { telemetry, isConnected, speedHistory } = useTelemetry();

  // Audio Engine State
  const [isMuted, setIsMuted] = useState(soundEngine.getMuted());
  const [visualizerLevels, setVisualizerLevels] = useState<number[]>([10, 20, 15, 30, 25, 12, 18, 14]);

  // Cart State with localStorage
  const [cartItems, setCartItems] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem('lh44_cart');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');

  // Save cart changes
  useEffect(() => {
    try {
      localStorage.setItem('lh44_cart', JSON.stringify(cartItems));
    } catch {
      // ignore
    }
  }, [cartItems]);

  // Sound visualizer animation loop
  useEffect(() => {
    let animId: number;
    const updateVisualizer = () => {
      setVisualizerLevels(soundEngine.getVisualizerLevels());
      animId = requestAnimationFrame(updateVisualizer);
    };
    animId = requestAnimationFrame(updateVisualizer);

    const unsub = soundEngine.subscribe(muted => setIsMuted(muted));

    return () => {
      cancelAnimationFrame(animId);
      unsub();
    };
  }, []);

  // Track active section on scroll
  useEffect(() => {
    const handleScroll = () => {
      const sections = ['hero', 'telemetry', 'trophies', 'store', 'mission44', 'paddock'];
      const scrollPos = window.scrollY + 200;

      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPos >= top && scrollPos < top + height) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleToggleSound = () => {
    const newMuted = soundEngine.toggleMute();
    setIsMuted(newMuted);
  };

  const handleNavigate = (sectionId: string) => {
    if (sectionId === 'hero') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      const el = document.getElementById(sectionId);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  const handleAddToCart = (product: ProductItem, size: string, color: string) => {
    setCartItems(prev => {
      const existingIdx = prev.findIndex(
        item => item.product.id === product.id && item.size === size && item.color === color
      );
      if (existingIdx >= 0) {
        const copy = [...prev];
        copy[existingIdx].quantity += 1;
        return copy;
      }
      return [...prev, { product, size, color, quantity: 1 }];
    });
  };

  const handleUpdateQuantity = (index: number, newQty: number) => {
    if (newQty <= 0) {
      handleRemoveItem(index);
      return;
    }
    setCartItems(prev => {
      const copy = [...prev];
      copy[index].quantity = newQty;
      return copy;
    });
  };

  const handleRemoveItem = (index: number) => {
    setCartItems(prev => prev.filter((_, i) => i !== index));
  };

  const handleClearCart = () => {
    setCartItems([]);
  };

  const totalCartCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <div className="relative min-h-screen bg-lh-void text-lh-light selection:bg-lh-yellow selection:text-lh-void overflow-x-hidden">
      {/* Bespoke Active Theory Fluid Magnetic Cursor */}
      <CustomCursor />

      {/* Interactive Three.js Wind Tunnel Aerodynamics Background */}
      <AerodynamicTunnel />

      {/* Cybernetic Tech Grid & Scanline FX */}
      <div className="fixed inset-0 bg-grid-tech pointer-events-none opacity-20 z-0" />
      <div className="fixed inset-0 scanlines pointer-events-none z-0" />

      {/* Navigation Bar */}
      <Navbar
        cartCount={totalCartCount}
        onOpenCart={() => setIsCartOpen(true)}
        isMuted={isMuted}
        onToggleSound={handleToggleSound}
        visualizerLevels={visualizerLevels}
        activeSection={activeSection}
        onNavigate={handleNavigate}
      />

      {/* Main Content Sections */}
      <main className="relative z-10">
        <div id="hero">
          <HeroSection
            telemetry={telemetry}
            isConnected={isConnected}
            isMuted={isMuted}
            onToggleSound={handleToggleSound}
            visualizerLevels={visualizerLevels}
            onNavigate={handleNavigate}
          />
        </div>

        <TrackTelemetrySection
          telemetry={telemetry}
          isConnected={isConnected}
          speedHistory={speedHistory}
        />

          <CareerVault />
          <div id="helmets" className="relative">
            <HelmetVault />
          </div>

        <StoreSection
          onAddToCart={handleAddToCart}
          onOpenCart={() => setIsCartOpen(true)}
        />

        <Mission44Section />

        <PaddockPassSection />
      </main>

      {/* Shopping Bag Slide-over Drawer */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cartItems}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        onClearCart={handleClearCart}
      />

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default App;
