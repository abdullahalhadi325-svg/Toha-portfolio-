'use client';

import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { usePortfolioData } from '../hooks/usePortfolioData';
import { ScrollRevealSection } from '../components/ScrollRevealSection';
import {
  Mail,
  Send,
  MapPin,
  Check,
  Copy,
  Youtube,
  Facebook,
  MessageCircle,
  ExternalLink,
  ArrowUpRight,
  MessageSquare,
} from 'lucide-react';

export default function ContactSection() {
  const { data } = usePortfolioData();
  const { t, isBengali } = useLanguage();
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [formStatus, setFormStatus] = useState<'idle' | 'submitting' | 'success'>('idle');

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(data.contact.email);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2200);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.email || !formData.name || !formData.message) return;

    setFormStatus('submitting');
    setTimeout(() => {
      setFormStatus('success');
      setFormData({ name: '', email: '', message: '' });
      setTimeout(() => setFormStatus('idle'), 4000);
    }, 800);
  };

  const getSocialIcon = (platform: string) => {
    switch (platform.toLowerCase()) {
      case 'youtube':
        return <Youtube className="w-4 h-4 text-red-400" />;
      case 'facebook':
        return <Facebook className="w-4 h-4 text-blue-400" />;
      case 'whatsapp':
        return <MessageCircle className="w-4 h-4 text-emerald-400" />;
      default:
        return <Mail className="w-4 h-4 text-[#C5A880]" />;
    }
  };

  return (
    <ScrollRevealSection id="contact" className="scroll-mt-28 space-y-12">
      <div className="space-y-2">
        <div className="flex items-center gap-2 text-xs font-mono text-[#C5A880] uppercase tracking-widest">
          <Mail className="w-3.5 h-3.5" />
          <span>{t(data.navigation.contact)}</span>
        </div>
        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-display font-bold text-[#EAEAEA]">
          {t(data.contact.title)}
        </h2>
        <p className="text-[#8F909A] max-w-2xl text-xs sm:text-sm">
          {t(data.contact.subtitle)}
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Direct Electronic Mail & Channels */}
        <div className="lg:col-span-5 space-y-6">
          {/* Direct Email Card */}
          <div className="p-7 rounded-3xl bg-[#111115]/80 backdrop-blur-md border border-white/10 hover:border-white/20 space-y-6 shadow-[0_8px_30px_rgb(0,0,0,0.8)] transition-all">
            <div className="space-y-2">
              <div className="text-[11px] font-mono uppercase tracking-widest text-[#8F909A]">
                {isBengali ? 'সরাসরি ইলেকট্রনিক যোগাযোগ' : 'Direct Electronic Address'}
              </div>
              <div className="p-4 rounded-2xl bg-[#0A0A0C] border border-white/10 space-y-3">
                <span className="font-mono text-[#C5A880] text-sm break-all select-all block">
                  {data.contact.email}
                </span>
                <div className="flex items-center gap-2 pt-1">
                  <button
                    type="button"
                    onClick={handleCopyEmail}
                    className="px-4 py-2 rounded-full bg-[#16161B] hover:bg-[#1D1D24] border border-white/10 text-xs font-mono text-[#EAEAEA] flex items-center gap-1.5 transition-colors cursor-pointer"
                  >
                    {copiedEmail ? <Check className="w-3.5 h-3.5 text-[#C5A880]" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copiedEmail ? (isBengali ? 'অনুলিপি সম্পন্ন' : 'Copied') : (isBengali ? 'অনুলিপি' : 'Copy')}</span>
                  </button>
                  <a
                    href={`mailto:${data.contact.email}`}
                    className="px-4 py-2 rounded-full bg-[#C5A880] hover:bg-[#D4B48F] text-[#0A0A0C] text-xs font-semibold uppercase tracking-wider flex items-center gap-1.5 transition-colors shadow-sm cursor-pointer"
                  >
                    <span>{isBengali ? 'মেইল পাঠান' : 'Compose'}</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>
            </div>

            <p className="text-xs text-[#8F909A] leading-relaxed">
              {t(data.contact.responseExpectation)}
            </p>

            <div className="pt-4 border-t border-white/[0.04] space-y-2 text-xs font-mono text-[#8F909A]">
              <div className="flex items-center gap-2">
                <MapPin className="w-3.5 h-3.5 text-[#C5A880]" />
                <span>{t(data.contact.location)}, Bangladesh</span>
              </div>
            </div>
          </div>

          {/* Social Channels List (YouTube, Facebook, WhatsApp) */}
          <div className="space-y-3">
            <div className="text-[11px] font-mono uppercase tracking-widest text-[#8F909A] px-1">
              {isBengali ? 'সামাজিক ও যোগাযোগ চ্যানেল' : 'Direct Channels & Social Profiles'}
            </div>

            {data.contact.socials
              .filter((item) => item.platform.toLowerCase() !== 'email')
              .map((social, idx) => (
                <a
                  key={idx}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group block p-4 sm:p-5 rounded-2xl bg-[#111115]/80 backdrop-blur-md border border-white/10 hover:border-white/20 shadow-[0_8px_30px_rgb(0,0,0,0.8)] transition-all duration-300"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3.5">
                      <div className="p-2.5 rounded-xl bg-[#16161B] border border-white/10 group-hover:scale-105 transition-transform">
                        {getSocialIcon(social.platform)}
                      </div>
                      <div>
                        <div className="text-[10px] font-mono text-[#C5A880] uppercase tracking-wider">
                          {social.platform}
                        </div>
                        <div className="text-sm font-display font-semibold text-[#EAEAEA] group-hover:text-white transition-colors">
                          {social.handle || t(social.label)}
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#16161B]/80 border border-white/10 text-xs font-mono text-[#8F909A] group-hover:text-[#C5A880] group-hover:border-[#C5A880]/30 transition-colors">
                      <span className="text-[11px]">{isBengali ? 'সংযোগ' : 'Connect'}</span>
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    </div>
                  </div>
                </a>
              ))}
          </div>
        </div>

        {/* Right Column: Clean, Inviting HTML Form (Name, Email, Message, Send) */}
        <div className="lg:col-span-7">
          <div className="p-7 sm:p-8 rounded-3xl bg-[#111115]/80 backdrop-blur-md border border-white/10 hover:border-white/20 space-y-6 shadow-[0_8px_30px_rgb(0,0,0,0.8)] transition-all">
            <div className="space-y-1">
              <div className="text-[11px] font-mono uppercase tracking-widest text-[#C5A880] flex items-center gap-2">
                <MessageSquare className="w-3.5 h-3.5" />
                <span>{isBengali ? 'সরাসরি বার্তা প্রেরণ' : 'Transmit Message'}</span>
              </div>
              <h3 className="text-lg font-display font-semibold text-[#EAEAEA]">
                {isBengali ? 'যোগাযোগের বার্তা পাঠান' : 'Direct Inquiry Dispatch'}
              </h3>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-1.5">
                <label htmlFor="name" className="block text-xs font-mono text-[#8F909A]">
                  {isBengali ? 'আপনার নাম' : 'Your Name'}
                </label>
                <input
                  id="name"
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder={isBengali ? 'নাম লিখুন...' : 'Enter your name...'}
                  className="w-full px-4 py-2.5 rounded-xl bg-[#0A0A0C] border border-white/10 focus:border-[#C5A880] focus:outline-none text-xs sm:text-sm text-[#EAEAEA] placeholder:text-[#5A5B64] transition-colors"
                />
              </div>

              <div className="space-y-1.5">
                <label htmlFor="email" className="block text-xs font-mono text-[#8F909A]">
                  {isBengali ? 'ইমেইল ঠিকানা' : 'Email Address'}
                </label>
                <input
                  id="email"
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder={isBengali ? 'name@domain.com' : 'name@domain.com'}
                  className="w-full px-4 py-2.5 rounded-xl bg-[#0A0A0C] border border-white/10 focus:border-[#C5A880] focus:outline-none text-xs sm:text-sm text-[#EAEAEA] placeholder:text-[#5A5B64] transition-colors"
                />
              </div>

              <div className="space-y-1.5">
                <label htmlFor="message" className="block text-xs font-mono text-[#8F909A]">
                  {isBengali ? 'আপনার বার্তা / প্রস্তাবনা' : 'Message / Inquiry'}
                </label>
                <textarea
                  id="message"
                  required
                  rows={4}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder={isBengali ? 'আপনার বক্তব্য বিস্তারিত লিখুন...' : 'Outline your thoughts or collaboration proposal...'}
                  className="w-full px-4 py-2.5 rounded-xl bg-[#0A0A0C] border border-white/10 focus:border-[#C5A880] focus:outline-none text-xs sm:text-sm text-[#EAEAEA] placeholder:text-[#5A5B64] transition-colors resize-none"
                />
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  disabled={formStatus === 'submitting'}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-3.5 rounded-full bg-[#C5A880] hover:bg-[#D4B48F] disabled:opacity-50 text-[#0A0A0C] text-xs font-semibold uppercase tracking-wider transition-all duration-300 shadow-[0_8px_30px_rgb(0,0,0,0.8)] active:scale-95 cursor-pointer"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>
                    {formStatus === 'submitting'
                      ? (isBengali ? 'প্রেরণ করা হচ্ছে...' : 'Transmitting...')
                      : formStatus === 'success'
                      ? (isBengali ? 'বার্তা গৃহীত হয়েছে!' : 'Message Received!')
                      : (isBengali ? 'বার্তা পাঠান' : 'Send Message')}
                  </span>
                </button>

                {formStatus === 'success' && (
                  <p className="text-xs font-mono text-[#C5A880] mt-3 animate-fade-in">
                    {isBengali
                      ? 'ধন্যবাদ। আপনার বার্তা সফলভাবে গ্রহণ করা হয়েছে।'
                      : 'Thank you. Your message has been received with priority.'}
                  </p>
                )}
              </div>
            </form>
          </div>
        </div>
      </div>
    </ScrollRevealSection>
  );
}
