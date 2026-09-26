'use client';

import React, { useState, useEffect } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { usePortfolioData } from '../hooks/usePortfolioData';
import SecretTrigger from './SecretTrigger';
import { Menu, X, ArrowUpRight, MapPin, Keyboard, Settings, Globe } from 'lucide-react';
import { devWhatsAppUrl } from '../src/constants';

export default function Navbar() {
  const { language, setLanguage, t, isBengali } = useLanguage();
  const { data, isAuthenticated, setIsAdminOpen } = usePortfolioData();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 24);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Prevent background scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileMenuOpen]);

  const navLinks = [
    { href: '#about', label: t(data.navigation.about) },
    { href: '#expertise', label: t(data.navigation.expertise) },
    { href: '#projects', label: t(data.navigation.projects) },
    { href: '#research', label: t(data.navigation.research) },
    { href: '#writing', label: t(data.navigation.writing) },
    { href: '#achievements', label: t(data.navigation.achievements) },
    { href: '#vision', label: t(data.navigation.vision) },
    { href: '#contact', label: t(data.navigation.contact) },
  ];

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          isScrolled
            ? 'bg-[#0A0A0C]/90 backdrop-blur-md border-b border-white/[0.08] shadow-[0_4px_30px_rgba(0,0,0,0.5)] py-2'
            : 'bg-[#0A0A0C]/40 backdrop-blur-sm border-b border-transparent py-2.5 sm:py-3'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            {/* Brand Logo / Monogram & Elongated Single-line Name Layout */}
            <a
              href="#hero"
              onClick={() => setMobileMenuOpen(false)}
              className="group flex items-center gap-3 focus:outline-none"
            >
              <div className="w-8 h-8 rounded-full bg-[#16161B] border border-white/[0.08] group-hover:border-[#C5A880]/60 transition-colors flex items-center justify-center shrink-0">
                <span className="font-display font-bold text-xs tracking-wider text-[#EAEAEA] group-hover:text-[#C5A880] transition-colors">
                  TM
                </span>
              </div>
              <div className="flex flex-col sm:flex-row sm:items-baseline sm:gap-2.5">
                <span className="font-display text-sm sm:text-base font-semibold tracking-wide text-[#EAEAEA] group-hover:text-white transition-colors whitespace-nowrap">
                  {t(data.meta.clientName)}
                </span>
                <span className="text-[10px] text-[#8F909A] font-mono tracking-wider uppercase flex items-center gap-1.5 whitespace-nowrap">
                  <span className="hidden sm:inline text-white/20 select-none">•</span>
                  <span className="w-1.5 h-1.5 rounded-full bg-[#C5A880] shrink-0 sm:hidden" />
                  {isBengali ? 'ক্রিয়েটিভ টেকনোলজিস্ট' : 'Creative Technologist'}
                </span>
              </div>
            </a>

            {/* Desktop Navigation Links */}
            <nav className="hidden lg:flex items-center gap-6">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="text-xs uppercase tracking-cinematic text-[#8F909A] hover:text-[#EAEAEA] transition-colors relative py-1 after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[1px] after:bg-[#C5A880] hover:after:w-full after:transition-all after:duration-300"
                >
                  {link.label}
                </a>
              ))}
            </nav>

            {/* Top Right: Shortcuts, Language Switcher & Mobile Toggle */}
            <div className="flex items-center gap-3">
              {/* Keyboard shortcuts badge */}
              <div className="hidden xl:flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#121216]/80 border border-white/[0.06] text-[10px] font-mono text-[#8F909A]">
                <Keyboard className="w-3 h-3 text-[#C5A880]" />
                <span className="text-[#C5A880]">J</span>/<span className="text-[#C5A880]">K</span>
                <span>navigate</span>
              </div>

              {/* Explicit Language Switcher "EN | বাংলা" */}
              <div className="flex items-center rounded-full bg-[#121216]/90 border border-white/[0.08] p-1 text-xs font-medium backdrop-blur-sm">
                <button
                  type="button"
                  onClick={() => setLanguage('en')}
                  className={`px-3 py-1 rounded-full transition-colors ${
                    language === 'en'
                      ? 'bg-[#1D1D24] text-[#EAEAEA] font-semibold shadow-sm text-[#C5A880]'
                      : 'text-[#8F909A] hover:text-[#EAEAEA]'
                  }`}
                  aria-label="Switch to English"
                >
                  EN
                </button>
                <span className="text-white/20 select-none px-0.5">|</span>
                <button
                  type="button"
                  onClick={() => setLanguage('bn')}
                  className={`px-3 py-1 rounded-full font-bengali transition-colors ${
                    language === 'bn'
                      ? 'bg-[#1D1D24] text-[#EAEAEA] font-bold shadow-sm text-[#C5A880]'
                      : 'text-[#8F909A] hover:text-[#EAEAEA]'
                  }`}
                  aria-label="বাংলা ভাষায় পরিবর্তন করুন"
                >
                  বাংলা
                </button>
              </div>

              {/* External Channel Link (Desktop Only) */}
              <a
                href={data.contact.youtubeUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="hidden sm:inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-[#16161B]/80 hover:bg-[#1D1D24] border border-white/[0.08] hover:border-[#C5A880]/30 text-xs text-[#EAEAEA] font-mono transition-colors"
                title="Broadcasts & Productions"
              >
                <span>Channel</span>
                <ArrowUpRight className="w-3 h-3 text-[#C5A880]" />
              </a>

              {/* Mobile Hamburger Toggle Button */}
              <button
                type="button"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="lg:hidden p-2.5 rounded-xl bg-[#121216] border border-white/[0.08] text-[#EAEAEA] hover:text-[#C5A880] focus:outline-none transition-colors"
                aria-label="Toggle navigation menu"
                aria-expanded={mobileMenuOpen}
              >
                {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      <div
        className={`fixed inset-0 z-40 bg-[#0A0A0C]/95 backdrop-blur-xl lg:hidden transition-all duration-500 flex flex-col justify-between p-6 pt-24 ${
          mobileMenuOpen
            ? 'opacity-100 pointer-events-auto translate-y-0'
            : 'opacity-0 pointer-events-none -translate-y-4'
        }`}
      >
        <div className="flex flex-col space-y-4">
          <span className="text-[11px] font-mono tracking-widest uppercase text-[#8F909A] px-2">
            {isBengali ? 'মেনু ও সূচি' : 'Navigation Directory'}
          </span>
          <div className="flex flex-col space-y-1">
            {navLinks.map((link, idx) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                style={{
                  transitionDelay: mobileMenuOpen ? `${idx * 30}ms` : '0ms',
                }}
                className="px-3 py-2.5 rounded-lg text-base font-display tracking-wide text-[#EAEAEA] hover:text-[#C5A880] hover:bg-white/[0.03] border-b border-white/[0.04] transition-all flex items-center justify-between"
              >
                <span>{link.label}</span>
                <span className="text-xs font-mono text-[#8F909A]">0{idx + 1}</span>
              </a>
            ))}
          </div>
        </div>

        {/* Mobile Menu Footer Info */}
        <div className="pt-6 border-t border-white/[0.08] space-y-3">
          <div className="flex items-center justify-between text-xs font-mono text-[#8F909A]">
            <span className="flex items-center gap-1.5">
              <Globe className="w-3.5 h-3.5 text-[#C5A880]" />
              {isBengali ? 'ভাষা: বাংলা' : 'Active: English'}
            </span>
            <span>{t(data.meta.location)}</span>
          </div>
          <a
            href={data.contact.youtubeUrl}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => setMobileMenuOpen(false)}
            className="w-full py-2.5 rounded-full bg-[#16161B] border border-white/[0.08] text-xs font-mono text-[#EAEAEA] flex items-center justify-center gap-2 hover:border-[#C5A880]/40 transition-colors shadow-sm"
          >
            <span>Visit YouTube Broadcasts</span>
            <ArrowUpRight className="w-3.5 h-3.5 text-[#C5A880]" />
          </a>

          {/* Task 3: Mobile Menu Developer Credit Block */}
          <div className="mt-4 pt-4 border-t border-white/[0.04] text-center">
            <a
              href={devWhatsAppUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[10px] font-mono text-[#8F909A] hover:text-white transition-colors block"
            >
              Engineered & Developed by Abdullah Al Hadi
            </a>
          </div>
        </div>
      </div>
    </>
  );
}
