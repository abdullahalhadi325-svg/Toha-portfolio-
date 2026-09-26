'use client';

import React, { useRef, useCallback, ReactNode } from 'react';
import { usePortfolioData } from '../hooks/usePortfolioData';

interface SecretTriggerProps {
  children: ReactNode;
  className?: string;
}

export default function SecretTrigger({ children, className = '' }: SecretTriggerProps) {
  const { setIsLoginOpen, setIsAdminOpen, isAuthenticated } = usePortfolioData();
  const lastTapRef = useRef<number>(0);
  const tapTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const triggerAdmin = useCallback(() => {
    if (typeof navigator !== 'undefined' && typeof navigator.vibrate === 'function') {
      try {
        navigator.vibrate([30, 50, 30]);
      } catch {
        // Safe catch
      }
    }
    if (isAuthenticated) {
      setIsAdminOpen(true);
    } else {
      setIsLoginOpen(true);
    }
  }, [isAuthenticated, setIsAdminOpen, setIsLoginOpen]);

  const handleTouchEnd = (e: React.TouchEvent<HTMLElement>) => {
    e.preventDefault();
    e.stopPropagation();

    const now = Date.now();
    const interval = now - lastTapRef.current;

    if (interval > 0 && interval <= 300) {
      lastTapRef.current = 0;
      if (tapTimeoutRef.current) {
        clearTimeout(tapTimeoutRef.current);
        tapTimeoutRef.current = null;
      }
      triggerAdmin();
    } else {
      lastTapRef.current = now;
      if (tapTimeoutRef.current) {
        clearTimeout(tapTimeoutRef.current);
      }
      tapTimeoutRef.current = setTimeout(() => {
        lastTapRef.current = 0;
      }, 300);
    }
  };

  const handleDoubleClick = (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault();
    triggerAdmin();
  };

  return (
    <span
      role="button"
      tabIndex={0}
      onTouchStart={(e) => e.stopPropagation()}
      onTouchEnd={handleTouchEnd}
      onDoubleClick={handleDoubleClick}
      onContextMenu={(e) => e.preventDefault()}
      className={`select-none touch-manipulation cursor-pointer inline-block ${className}`}
      style={{
        userSelect: 'none',
        WebkitUserSelect: 'none',
        WebkitTouchCallout: 'none',
      }}
      title="Double-tap to open Admin"
    >
      {children}
    </span>
  );
}
