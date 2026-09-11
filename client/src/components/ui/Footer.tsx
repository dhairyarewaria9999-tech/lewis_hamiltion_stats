import React, { useState } from 'react';
import { api } from '../../services/api';
import { soundEngine } from '../audio/SoundEngine';
import { Mail, Send, CheckCircle2, Globe, Shield } from 'lucide-react';

export const Footer: React.FC = () => {
  const [isContactOpen, setIsContactOpen] = useState(false);
  const [contactForm, setContactForm] = useState({
    name: '',
    email: '',
    subject: '',
    category: 'Partnership',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [contactSuccess, setContactSuccess] = useState<string | null>(null);

  const handleContactSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    soundEngine.playClick();

    try {
      const res = await api.sendContactInquiry(contactForm);
      if (res.success) {
        soundEngine.playCelebration();
        setContactSuccess(res.message);
        setContactForm({
          name: '',
          email: '',
          subject: '',
          category: 'Partnership',
          message: ''
        });
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <footer className="border-t border-lh-border/80 bg-lh-dark/90 relative overflow-hidden pt-16 pb-12 px-4 md:px-8">
      {/* Big Kinetic Watermark */}
      <div className="max-w-7xl mx-auto flex flex-col justify-between">
        <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-12 mb-16">
          <div className="max-w-md">
            <div className="flex items-center space-x-3 mb-4">
              <span className="w-10 h-10 rounded-xl bg-lh-card border border-lh-border flex items-center justify-center font-display font-black text-lh-yellow text-lg">
                44
              </span>
              <span className="font-display font-black text-2xl uppercase tracking-tight text-white">
                LEWIS HAMILTON
              </span>
            </div>
            <p className="text-xs text-lh-muted font-mono leading-relaxed mb-6">
              Official interactive platform combining live telemetry computational fluid dynamics with +44 luxury streetwear and Mission 44 philanthropy.
            </p>

            <button
              onClick={() => {
                soundEngine.playClick();
                setIsContactOpen(true);
              }}
              className="px-5 py-2.5 rounded-xl bg-lh-card hover:bg-lh-border border border-lh-border text-xs font-mono font-bold uppercase text-lh-yellow transition-all flex items-center space-x-2"
              data-cursor="CONTACT"
            >
              <Mail className="w-4 h-4" />
              <span>MEDIA & PARTNERSHIP DISPATCH</span>
            </button>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-8 text-xs font-mono">
            <div>
              <span className="text-lh-yellow font-bold uppercase block mb-3">PLATFORM</span>
              <ul className="space-y-2 text-lh-muted">
                <li><a href="#telemetry" className="hover:text-white transition-colors">Pit Wall Telemetry</a></li>
                <li><a href="#trophies" className="hover:text-white transition-colors">7X Trophy Vault</a></li>
                <li><a href="#store" className="hover:text-white transition-colors">+44 Streetwear</a></li>
                <li><a href="#paddock" className="hover:text-white transition-colors">Digital Paddock Pass</a></li>
              </ul>
            </div>

            <div>
              <span className="text-lh-purple font-bold uppercase block mb-3">INITIATIVES</span>
              <ul className="space-y-2 text-lh-muted">
                <li><a href="#mission44" className="hover:text-white transition-colors">Mission 44</a></li>
                <li><a href="#mission44" className="hover:text-white transition-colors">STEM Scholarships</a></li>
                <li><a href="#mission44" className="hover:text-white transition-colors">Girls On Track</a></li>
                <li><a href="#mission44" className="hover:text-white transition-colors">Ignite Partnership</a></li>
              </ul>
            </div>

            <div>
              <span className="text-white font-bold uppercase block mb-3">CHANNELS</span>
              <ul className="space-y-2 text-lh-muted">
                <li className="flex items-center space-x-2 hover:text-white transition-colors cursor-pointer">
                  <svg className="w-3.5 h-3.5 text-lh-yellow fill-current" viewBox="0 0 24 24">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                  </svg>
                  <span>@LewisHamilton</span>
                </li>
                <li className="flex items-center space-x-2 hover:text-white transition-colors cursor-pointer">
                  <svg className="w-3.5 h-3.5 text-lh-yellow fill-current" viewBox="0 0 24 24">
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                  </svg>
                  <span>@LewisHamilton</span>
                </li>
                <li className="flex items-center space-x-2 hover:text-white transition-colors cursor-pointer">
                  <Globe className="w-3.5 h-3.5 text-lh-yellow" />
                  <span>+44 World Store</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Huge Bottom Monogram */}
        <div className="pt-8 border-t border-lh-border/50 flex flex-col sm:flex-row items-center justify-between text-[11px] font-mono text-lh-muted gap-4">
          <div className="flex items-center space-x-2">
            <Shield className="w-3.5 h-3.5 text-lh-yellow" />
            <span>© 2025 SIR LEWIS HAMILTON MBE. ALL RIGHTS RESERVED.</span>
          </div>
          <div>
            FUSING ACTIVE THEORY CREATIVE TECHNOLOGY & LANDO NORRIS ATHLETE BRANDING
          </div>
        </div>
      </div>

      {/* Contact Inquiry Modal */}
      {isContactOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
          <div className="glass-panel w-full max-w-lg rounded-2xl p-6 md:p-8 border border-lh-border shadow-2xl relative">
            <button
              onClick={() => {
                setIsContactOpen(false);
                setContactSuccess(null);
              }}
              className="absolute top-4 right-4 p-2 rounded-lg bg-lh-dark text-lh-muted hover:text-white font-mono text-xs"
            >
              CLOSE [ESC]
            </button>

            <h3 className="font-display font-black text-2xl uppercase text-white mb-1">
              OFFICIAL DISPATCH
            </h3>
            <p className="text-xs font-mono text-lh-muted mb-6">
              Direct routing to Project 44 Management & Scuderia Ferrari Media relations.
            </p>

            {contactSuccess ? (
              <div className="p-4 rounded-xl bg-emerald-950/40 border border-emerald-500/40 text-emerald-400 font-mono text-xs space-y-3 text-center">
                <CheckCircle2 className="w-8 h-8 mx-auto" />
                <p>{contactSuccess}</p>
                <button
                  onClick={() => {
                    setIsContactOpen(false);
                    setContactSuccess(null);
                  }}
                  className="px-4 py-2 rounded-lg bg-emerald-500 text-lh-void font-bold text-xs uppercase"
                >
                  DONE
                </button>
              </div>
            ) : (
              <form onSubmit={handleContactSubmit} className="space-y-3 font-mono text-xs">
                <div>
                  <label className="block text-lh-muted uppercase mb-1">Your Full Name</label>
                  <input
                    type="text"
                    value={contactForm.name}
                    onChange={e => setContactForm({ ...contactForm, name: e.target.value })}
                    required
                    className="w-full px-3 py-2 rounded-lg bg-lh-dark border border-lh-border text-white focus:border-lh-yellow outline-none"
                    placeholder="Jane Doe"
                  />
                </div>

                <div>
                  <label className="block text-lh-muted uppercase mb-1">Email Address</label>
                  <input
                    type="email"
                    value={contactForm.email}
                    onChange={e => setContactForm({ ...contactForm, email: e.target.value })}
                    required
                    className="w-full px-3 py-2 rounded-lg bg-lh-dark border border-lh-border text-white focus:border-lh-yellow outline-none"
                    placeholder="contact@agency.com"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-lh-muted uppercase mb-1">Category</label>
                    <select
                      value={contactForm.category}
                      onChange={e => setContactForm({ ...contactForm, category: e.target.value })}
                      className="w-full px-3 py-2 rounded-lg bg-lh-dark border border-lh-border text-white focus:border-lh-yellow outline-none"
                    >
                      <option value="Partnership">Partnership</option>
                      <option value="Press & Media">Press & Media</option>
                      <option value="Mission 44 Grant">Mission 44 Grant</option>
                      <option value="General Inquiry">General Inquiry</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-lh-muted uppercase mb-1">Subject</label>
                    <input
                      type="text"
                      value={contactForm.subject}
                      onChange={e => setContactForm({ ...contactForm, subject: e.target.value })}
                      required
                      className="w-full px-3 py-2 rounded-lg bg-lh-dark border border-lh-border text-white focus:border-lh-yellow outline-none"
                      placeholder="Project Brief"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-lh-muted uppercase mb-1">Message</label>
                  <textarea
                    rows={3}
                    value={contactForm.message}
                    onChange={e => setContactForm({ ...contactForm, message: e.target.value })}
                    required
                    className="w-full px-3 py-2 rounded-lg bg-lh-dark border border-lh-border text-white focus:border-lh-yellow outline-none"
                    placeholder="Details of inquiry or collaboration..."
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-3 rounded-xl bg-lh-yellow text-lh-void font-display font-bold text-xs uppercase tracking-wider hover:bg-white transition-colors flex items-center justify-center space-x-2"
                >
                  {isSubmitting ? <span>TRANSMITTING...</span> : (
                    <>
                      <Send className="w-4 h-4" />
                      <span>TRANSMIT DISPATCH</span>
                    </>
                  )}
                </button>
              </form>
            )}
          </div>
        </div>
      )}
    </footer>
  );
};
