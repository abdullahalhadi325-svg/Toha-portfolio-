/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useRef, useCallback } from 'react';
import { LanguageProvider, useLanguage } from '../context/LanguageContext';
import { PortfolioProvider, usePortfolioData } from '../hooks/usePortfolioData';
import Navbar from '../components/Navbar';
import ScrollProgressBar from '../components/ScrollProgressBar';
import PortfolioPage from '../app/page';
import AdminModal from '../components/AdminModal';
import { Code } from 'lucide-react';
import { devWhatsAppUrl } from './constants';

function AppShell() {
  const { t, isBengali } = useLanguage();
  const { data, setIsLoginOpen, setIsAdminOpen, isAuthenticated } = usePortfolioData();
  const lastTapRef = useRef<number>(0);
  const tapTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Trigger admin modal or CMS drawer based on auth status
  const handleTriggerAdmin = useCallback(() => {
    // Subtle haptic response on supported mobile devices
    if (typeof navigator !== 'undefined' && typeof navigator.vibrate === 'function') {
      try {
        navigator.vibrate([30, 50, 30]);
      } catch {
        // Safe catch for permissions policy
      }
    }

    if (isAuthenticated) {
      setIsAdminOpen(true);
    } else {
      setIsLoginOpen(true);
    }
  }, [isAuthenticated, setIsAdminOpen, setIsLoginOpen]);

  // Mobile double-tap listener (fires within 300ms) with browser interference prevention
  const handleTouchEnd = useCallback(
    (e: React.TouchEvent<HTMLElement>) => {
      // Prevent browser default behaviors: text selection, magnifier lens, context copy menu, or double-tap zoom
      e.preventDefault();
      e.stopPropagation();

      const currentTime = Date.now();
      const tapInterval = currentTime - lastTapRef.current;

      if (tapInterval > 0 && tapInterval <= 300) {
        // Valid double-tap within 300ms detected!
        lastTapRef.current = 0;
        if (tapTimeoutRef.current) {
          clearTimeout(tapTimeoutRef.current);
          tapTimeoutRef.current = null;
        }
        handleTriggerAdmin();
      } else {
        lastTapRef.current = currentTime;
        if (tapTimeoutRef.current) {
          clearTimeout(tapTimeoutRef.current);
        }
        tapTimeoutRef.current = setTimeout(() => {
          lastTapRef.current = 0;
        }, 300);
      }
    },
    [handleTriggerAdmin]
  );

  // Support desktop double-click seamlessly
  const handleDoubleClick = useCallback(
    (e: React.MouseEvent<HTMLElement>) => {
      e.preventDefault();
      handleTriggerAdmin();
    },
    [handleTriggerAdmin]
  );

  return (
    <div
      className={`min-h-screen bg-[#0A0A0C] bg-[linear-gradient(to_right,#ffffff04_1px,transparent_1px),linear-gradient(to_bottom,#ffffff04_1px,transparent_1px)] bg-[size:32px_32px] text-[#EAEAEA] selection:bg-[#C5A880]/20 selection:text-[#C5A880] relative overflow-x-hidden ${
        isBengali ? 'font-bengali' : 'font-sans'
      }`}
    >
      <ScrollProgressBar />
      <Navbar />
      <PortfolioPage />

      {/* Global Cinematic Footer with Clean Mobile Double-Tap Admin Trigger */}
      <footer className="border-t border-white/[0.06] bg-[#070709] py-10 relative z-10">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#8F909A] font-mono">
          <div className="flex flex-col sm:flex-row sm:items-center">
            <div>
              ©{' '}
              <span
                role="button"
                tabIndex={0}
                onTouchStart={(e) => {
                  // Prevent iOS touch callout & context menu
                  e.stopPropagation();
                }}
                onTouchEnd={handleTouchEnd}
                onDoubleClick={handleDoubleClick}
                onContextMenu={(e) => e.preventDefault()}
                className="select-none touch-manipulation cursor-pointer font-medium text-[#B8B9C2] hover:text-white underline decoration-dotted decoration-white/20 underline-offset-4 transition-colors duration-200"
                style={{
                  userSelect: 'none',
                  WebkitUserSelect: 'none',
                  WebkitTouchCallout: 'none',
                }}
                title="Double-tap to open Admin"
                aria-label="Copyright 2026 Toha Al-Mahmudu. Double-tap to open Admin"
              >
                2026 {t(data.meta.clientName)}
              </span>
              . {isBengali ? 'সর্বস্বত্ব সংরক্ষিত।' : 'All rights reserved.'}
            </div>

            {/* Task 4: Developer Signature in Footer */}
            <a
              href={devWhatsAppUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="block mt-2 sm:mt-0 sm:ml-4 text-[10px] font-mono text-[#5A5B64] hover:text-[#C5A880] transition-colors"
            >
              Architected by Abdullah Al Hadi
            </a>
          </div>
          <div className="text-[#5A5B64]">{t(data.hero.tagline)}</div>
        </div>
      </footer>

      {/* Task 2: Global Floating Developer Signature Badge */}
      <a
        href={devWhatsAppUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-4 right-4 z-[60] px-3 py-1.5 rounded-full bg-[#111115]/90 backdrop-blur-md border border-white/10 text-[10px] font-mono text-[#8F909A] hover:text-[#C5A880] hover:border-[#C5A880]/30 transition-all flex items-center gap-1.5 shadow-[0_4px_20px_rgba(0,0,0,0.5)] cursor-pointer group"
      >
        <Code className="w-3 h-3 text-[#C5A880] group-hover:scale-110 transition-transform" />
        <span>Built by Abdullah Al Hadi</span>
      </a>

      {/* Admin Modal System (Authentication & CMS Drawer) */}
      <AdminModal />
    </div>
  );
}

export default function App() {
  return (
    <LanguageProvider>
      <PortfolioProvider>
        <AppShell />
      </PortfolioProvider>
    </LanguageProvider>
  );
}
