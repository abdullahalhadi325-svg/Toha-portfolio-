'use client';

import React, { useState } from 'react';
import { usePortfolioData } from '../hooks/usePortfolioData';
import { useLanguage } from '../context/LanguageContext';
import { Lock, X, KeyRound, ShieldAlert, ArrowRight, Eye, EyeOff } from 'lucide-react';

export default function LoginModal() {
  const { isLoginOpen, setIsLoginOpen, login } = usePortfolioData();
  const { isBengali } = useLanguage();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  if (!isLoginOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsSubmitting(true);

    setTimeout(() => {
      const res = login(username, password);
      setIsSubmitting(false);
      if (!res.success) {
        setError(res.error || 'Invalid credentials');
      } else {
        setUsername('');
        setPassword('');
        setError(null);
      }
    }, 400);
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-[#0A0A0C]/90 backdrop-blur-xl animate-fade-in">
      <div className="relative w-full max-w-md rounded-3xl bg-[#111115] border border-white/10 shadow-[0_20px_60px_rgba(0,0,0,0.9)] overflow-hidden">
        {/* Modal Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-white/10 bg-[#16161B]/60">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-[#0A0A0C] border border-white/10 text-[#C5A880]">
              <Lock className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-display font-bold text-sm tracking-wide text-[#EAEAEA]">
                {isBengali ? 'সিএমএস অ্যাডমিন লগইন' : 'Local CMS Authentication'}
              </h3>
              <p className="text-[10px] font-mono text-[#8F909A]">
                {isBengali ? 'অনুমোদিত সম্পাদনা অ্যাক্সেস' : 'Authorized Editorial Access'}
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={() => {
              setIsLoginOpen(false);
              setError(null);
            }}
            className="p-1.5 rounded-full bg-[#16161B] hover:bg-[#1D1D24] text-[#8F909A] hover:text-[#EAEAEA] border border-white/10 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          {error && (
            <div className="p-3 rounded-xl bg-red-950/40 border border-red-800/40 flex items-center gap-2.5 text-xs text-red-300">
              <ShieldAlert className="w-4 h-4 shrink-0 text-red-400" />
              <span>{error}</span>
            </div>
          )}

          <div className="space-y-1.5">
            <label className="block text-xs font-mono text-[#8F909A]">
              {isBengali ? 'ব্যবহারকারীর নাম' : 'Username'}
            </label>
            <input
              type="text"
              required
              autoFocus
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Mahmudul"
              className="w-full px-4 py-2.5 rounded-xl bg-[#0A0A0C] border border-white/10 focus:border-[#C5A880] focus:outline-none text-sm text-[#EAEAEA] placeholder:text-[#5A5B64] font-mono transition-colors"
            />
          </div>

          <div className="space-y-1.5">
            <label className="block text-xs font-mono text-[#8F909A]">
              {isBengali ? 'পাসওয়ার্ড' : 'Password'}
            </label>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••••••••"
                className="w-full px-4 py-2.5 rounded-xl bg-[#0A0A0C] border border-white/10 focus:border-[#C5A880] focus:outline-none text-sm text-[#EAEAEA] placeholder:text-[#5A5B64] font-mono transition-colors pr-12"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-0 flex items-center pr-3.5 text-[#8F909A] hover:text-[#EAEAEA] transition-colors"
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          <div className="pt-2">
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-[#C5A880] hover:bg-[#D4B48F] disabled:opacity-50 text-[#0A0A0C] font-semibold text-xs uppercase tracking-wider transition-all duration-300 shadow-[0_8px_30px_rgb(0,0,0,0.8)] active:scale-95 cursor-pointer"
            >
              <KeyRound className="w-3.5 h-3.5" />
              <span>
                {isSubmitting
                  ? (isBengali ? 'যাচাই করা হচ্ছে...' : 'Authenticating...')
                  : (isBengali ? 'অ্যাডমিন প্যানেলে প্রবেশ করুন' : 'Unlock CMS Dashboard')}
              </span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="text-center pt-2">
            <p className="text-[10px] font-mono text-[#5A5B64]">
              {isBengali
                ? 'সুরক্ষিত স্থানীয় সেশন • ব্রাউজার স্টোরেজ সিঙ্ক্রোনাইজড'
                : 'Secure Local Session • In-Browser Storage Synchronized'}
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}
