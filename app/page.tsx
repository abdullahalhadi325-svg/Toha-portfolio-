'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { useLanguage } from '../context/LanguageContext';
import { usePortfolioData } from '../hooks/usePortfolioData';
import { ScrollRevealSection, StaggerItem } from '../components/ScrollRevealSection';
import ProjectsSection from '../components/ProjectsSection';
import ContactSection from '../components/ContactSection';
import { ExpertiseCategory } from '../types/portfolio';
import {
  Brain,
  Code2,
  Film,
  ShieldCheck,
  Compass,
  Sparkles,
  MapPin,
  ChevronRight,
  BookOpen,
  GraduationCap,
  Briefcase,
  Award,
  Globe2,
  Eye,
  Terminal,
  Layers,
  Send,
  Flame,
} from 'lucide-react';

const SECTION_IDS = [
  'hero',
  'about',
  'expertise',
  'projects',
  'research',
  'writing',
  'achievements',
  'vision',
  'education',
  'experience',
  'languages',
  'contact',
];

export default function PortfolioPage() {
  const { data } = usePortfolioData();
  const { t, isBengali } = useLanguage();
  const [activeExpertiseTab, setActiveExpertiseTab] = useState<'all' | 'ai' | 'digitalTech' | 'media' | 'cyber'>('all');

  // Keyboard navigation listener ('j' to scroll next section, 'k' to scroll prev section)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const target = e.target as HTMLElement | null;
      if (target && (target.tagName === 'INPUT' || target.tagName === 'TEXTAREA' || target.isContentEditable)) {
        return;
      }

      if (e.key === 'j' || e.key === 'J' || e.key === 'k' || e.key === 'K') {
        e.preventDefault();
        const scrollPosition = window.scrollY + 120;
        const sectionElements = SECTION_IDS.map((id) => document.getElementById(id)).filter(Boolean) as HTMLElement[];

        if (sectionElements.length === 0) return;

        let currentIndex = 0;
        for (let i = 0; i < sectionElements.length; i++) {
          if (sectionElements[i].offsetTop <= scrollPosition) {
            currentIndex = i;
          }
        }

        if (e.key.toLowerCase() === 'j') {
          const nextIndex = Math.min(sectionElements.length - 1, currentIndex + 1);
          sectionElements[nextIndex].scrollIntoView({ behavior: 'smooth' });
        } else if (e.key.toLowerCase() === 'k') {
          const prevIndex = Math.max(0, currentIndex - 1);
          sectionElements[prevIndex].scrollIntoView({ behavior: 'smooth' });
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const expertiseIcons: Record<string, React.ReactNode> = {
    brain: <Brain className="w-4 h-4 text-[#C5A880]" />,
    code: <Code2 className="w-4 h-4 text-[#C5A880]" />,
    film: <Film className="w-4 h-4 text-[#C5A880]" />,
    'shield-check': <ShieldCheck className="w-4 h-4 text-[#C5A880]" />,
  };

  const categoryEntries = Object.entries(data.expertise.categories) as [
    'ai' | 'digitalTech' | 'media' | 'cyber',
    ExpertiseCategory,
  ][];

  const filteredExpertise =
    activeExpertiseTab === 'all'
      ? categoryEntries
      : categoryEntries.filter(([key]) => key === activeExpertiseTab);

  return (
    <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-28 pb-24 space-y-28 md:space-y-36">
      {/* Crisp, Subdued Mathematical Precision Grid (Pure background, no artificial glows) */}
      <div className="fixed inset-0 pointer-events-none z-0 bg-[linear-gradient(to_right,#ffffff04_1px,transparent_1px),linear-gradient(to_bottom,#ffffff04_1px,transparent_1px)] bg-[size:32px_32px]" />

      {/* =========================================
          1. HERO SECTION (Split Grid & Limbic Hook)
         ========================================= */}
      <ScrollRevealSection id="hero" className="pt-6 md:pt-14 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          {/* Left Column: Dynamic Text, Tagline & CTAs */}
          <div className="lg:col-span-7 space-y-8">
            <StaggerItem>
              {/* Availability Status Pill */}
              <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-[#111115]/80 backdrop-blur-md border border-white/10 text-xs font-mono text-[#8F909A]">
                <span className="w-1.5 h-1.5 rounded-full bg-[#C5A880]" />
                <span>{t(data.hero.availability)}</span>
              </div>
            </StaggerItem>

            <StaggerItem>
              {/* Client Identity & Primary Role */}
              <div className="space-y-3">
                <h1 className="text-4xl sm:text-6xl lg:text-7xl font-display font-bold tracking-tight text-[#EAEAEA]">
                  {t(data.hero.name)}
                </h1>
                <p className="text-base sm:text-lg text-[#C5A880] font-mono tracking-wide">
                  {t(data.hero.headline)}
                </p>
              </div>
            </StaggerItem>

            <StaggerItem>
              {/* Dynamic Tagline */}
              <div className="relative pl-5 border-l-2 border-[#C5A880]/80 py-1">
                <blockquote className="text-2xl sm:text-3xl lg:text-4xl font-display font-semibold text-[#EAEAEA] leading-snug tracking-tight">
                  "{t(data.hero.tagline)}"
                </blockquote>
              </div>
            </StaggerItem>

            <StaggerItem>
              {/* Authentic Direct Summary */}
              <p className="text-sm sm:text-base text-[#8F909A] max-w-2xl leading-relaxed">
                {t(data.hero.summary)}
              </p>
            </StaggerItem>

            <StaggerItem>
              {/* Location & Core Technical Disciplines */}
              <div className="flex flex-wrap items-center gap-3 text-xs text-[#8F909A] font-mono pt-1">
                <span className="flex items-center gap-1.5 bg-[#111115]/80 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-white/10">
                  <MapPin className="w-3 h-3 text-[#C5A880]" />
                  {t(data.hero.location)}, Bangladesh
                </span>
                <span className="flex items-center gap-1.5 bg-[#111115]/80 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-white/10">
                  <Terminal className="w-3 h-3 text-[#C5A880]" />
                  TypeScript • AI Media • Systems
                </span>
              </div>
            </StaggerItem>

            <StaggerItem>
              {/* Action Buttons: Strictly Pill-shaped with Deep Shadow and No Artificial Glow */}
              <div className="flex flex-wrap items-center gap-4 pt-2">
                <a
                  href={data.hero.primaryCta.url}
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#C5A880] hover:bg-[#D4B48F] text-[#0A0A0C] font-semibold text-xs uppercase tracking-wider transition-all duration-300 shadow-[0_8px_30px_rgb(0,0,0,0.8)] active:scale-95"
                >
                  <span>{t(data.hero.primaryCta.label)}</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </a>

                <a
                  href={data.hero.secondaryCta.url}
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#111115]/80 hover:bg-[#18181F] text-[#EAEAEA] border border-white/10 hover:border-white/20 font-medium text-xs uppercase tracking-wider transition-all duration-300 backdrop-blur-md active:scale-95 shadow-[0_8px_30px_rgb(0,0,0,0.8)]"
                >
                  <span>{t(data.hero.secondaryCta.label)}</span>
                  <Briefcase className="w-3.5 h-3.5 text-[#C5A880]" />
                </a>

                <a
                  href="#contact"
                  className="inline-flex items-center gap-2 px-5 py-3 rounded-full bg-[#111115]/80 hover:bg-[#18181F] text-[#8F909A] hover:text-[#EAEAEA] border border-white/10 hover:border-white/20 text-xs font-mono transition-all backdrop-blur-md active:scale-95 shadow-[0_8px_30px_rgb(0,0,0,0.8)]"
                >
                  <span>{isBengali ? 'যোগাযোগ' : 'Get in Touch'}</span>
                  <Send className="w-3 h-3 text-[#C5A880]" />
                </a>
              </div>
            </StaggerItem>
          </div>

          {/* Right Column: The Limbic Hook (No Glow, Crisp Border & Deep Shadow) */}
          {data.hero.image_url && (
            <div className="lg:col-span-5 flex justify-center lg:justify-end">
              <StaggerItem className="w-full max-w-sm sm:max-w-md">
                <div className="relative group">
                  {/* Crisp Cinematic Portrait Container */}
                  <div className="relative rounded-3xl border border-white/10 hover:border-white/20 shadow-2xl shadow-black/50 shadow-[0_8px_30px_rgb(0,0,0,0.8)] overflow-hidden bg-[#111115]/80 backdrop-blur-md transition-all duration-300">
                    <div className="relative aspect-[4/5] w-full overflow-hidden">
                      <Image
                        src={data.hero.image_url}
                        alt={t(data.hero.name)}
                        width={600}
                        height={750}
                        priority
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover object-top grayscale contrast-125 hover:grayscale-0 transition-all duration-700 scale-100 group-hover:scale-105"
                      />

                      {/* Subtle dark gradient overlay to blend smoothly into background */}
                      <div className="absolute inset-x-0 bottom-0 h-44 bg-gradient-to-t from-[#0A0A0C] via-[#0A0A0C]/60 to-transparent pointer-events-none z-20" />
                    </div>

                    {/* Portrait Transmission Metadata */}
                    <div className="absolute bottom-4 left-4 right-4 z-30 flex items-center justify-between text-xs font-mono">
                      <div>
                        <div className="text-[10px] text-[#C5A880] uppercase tracking-widest flex items-center gap-1.5">
                          <span className="w-1.5 h-1.5 rounded-full bg-[#C5A880]" />
                          {isBengali ? 'ক্রিয়েটিভ টেকনোলজিস্ট' : 'Creative Technologist'}
                        </div>
                        <div className="font-display font-semibold text-white tracking-wide">
                          {t(data.hero.name)}
                        </div>
                      </div>
                      <span className="px-3 py-1 rounded-full bg-[#0A0A0C]/90 border border-white/10 text-[10px] text-[#8F909A]">
                        Direct Transmission
                      </span>
                    </div>
                  </div>
                </div>
              </StaggerItem>
            </div>
          )}
        </div>
      </ScrollRevealSection>

      {/* =========================================
          2. ABOUT SECTION (Hybrid Identity & Intellect)
         ========================================= */}
      <ScrollRevealSection id="about" className="scroll-mt-28 space-y-10 relative z-10">
        <StaggerItem>
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-xs font-mono text-[#C5A880] uppercase tracking-widest">
              <Compass className="w-3.5 h-3.5" />
              <span>{t(data.navigation.about)}</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-display font-bold text-[#EAEAEA]">
              {t(data.about.title)}
            </h2>
            <p className="text-[#8F909A] max-w-2xl text-xs sm:text-sm">
              {t(data.about.subtitle)}
            </p>
          </div>
        </StaggerItem>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          <div className="lg:col-span-7 space-y-5">
            {data.about.bioParagraphs.map((para, idx) => (
              <StaggerItem key={idx}>
                <p className="text-[#8F909A] hover:text-[#EAEAEA] transition-colors text-sm sm:text-base leading-relaxed">
                  {t(para)}
                </p>
              </StaggerItem>
            ))}

            <StaggerItem>
              <div className="p-6 sm:p-7 rounded-2xl bg-[#111115]/80 backdrop-blur-md border border-white/10 hover:border-white/20 space-y-3 shadow-[0_8px_30px_rgb(0,0,0,0.8)] transition-all">
                <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-[#C5A880]">
                  <Sparkles className="w-3.5 h-3.5 text-[#C5A880]" />
                  <span>{isBengali ? 'দার্শনিক মূলনীতি' : 'Core Working Philosophy'}</span>
                </div>
                <blockquote className="text-sm sm:text-base text-[#EAEAEA] italic leading-relaxed border-l-2 border-[#C5A880]/60 pl-3.5">
                  "{t(data.about.philosophy)}"
                </blockquote>
              </div>
            </StaggerItem>
          </div>

          <div className="lg:col-span-5 space-y-4">
            <StaggerItem>
              <div className="p-6 rounded-2xl bg-[#111115]/80 backdrop-blur-md border border-white/10 hover:border-white/20 space-y-3 shadow-[0_8px_30px_rgb(0,0,0,0.8)] transition-all">
                <div className="text-[11px] font-mono uppercase tracking-widest text-[#8F909A]">
                  {isBengali ? 'দ্রুত তথ্য' : 'Quick Data Points'}
                </div>
                <div className="grid grid-cols-2 gap-3 pt-1">
                  {data.about.quickFacts.map((fact, idx) => (
                    <div key={idx} className="p-3 rounded-xl bg-[#16161B]/80 border border-white/10">
                      <div className="text-[10px] font-mono text-[#8F909A]">{t(fact.label)}</div>
                      <div className="text-xs font-semibold text-[#EAEAEA] mt-0.5">{t(fact.value)}</div>
                    </div>
                  ))}
                </div>
              </div>
            </StaggerItem>

            <StaggerItem>
              <div className="p-6 rounded-2xl bg-[#111115]/80 backdrop-blur-md border border-white/10 hover:border-white/20 space-y-3 shadow-[0_8px_30px_rgb(0,0,0,0.8)] transition-all">
                <div className="text-[11px] font-mono uppercase tracking-widest text-[#C5A880]">
                  {isBengali ? 'মূল বিশ্বাস' : 'Core Values'}
                </div>
                <div className="space-y-3">
                  {data.about.coreValues.map((val, idx) => (
                    <div key={idx} className="space-y-0.5">
                      <div className="text-xs font-semibold text-[#EAEAEA]">{t(val.title)}</div>
                      <div className="text-[11px] text-[#8F909A] leading-relaxed">{t(val.description)}</div>
                    </div>
                  ))}
                </div>
              </div>
            </StaggerItem>
          </div>
        </div>
      </ScrollRevealSection>

      {/* =========================================
          3. EXPERTISE (4-Column Clean CSS Grid, Overflow Bug Fixed)
         ========================================= */}
      <ScrollRevealSection id="expertise" className="scroll-mt-28 space-y-10 relative z-10">
        <StaggerItem>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-xs font-mono text-[#C5A880] uppercase tracking-widest">
                <Layers className="w-3.5 h-3.5" />
                <span>{t(data.navigation.expertise)}</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-display font-bold text-[#EAEAEA]">
                {t(data.expertise.title)}
              </h2>
              <p className="text-[#8F909A] max-w-2xl text-xs sm:text-sm">
                {t(data.expertise.subtitle)}
              </p>
            </div>

            {/* Task 1: Fixed Overflow Bug with flex flex-wrap items-center gap-2 */}
            <div className="flex flex-wrap items-center gap-2 p-1.5 rounded-2xl sm:rounded-full bg-[#111115]/80 backdrop-blur-md border border-white/10 self-start">
              <button
                type="button"
                onClick={() => setActiveExpertiseTab('all')}
                className={`px-4 py-1.5 rounded-full text-xs font-medium transition-colors ${
                  activeExpertiseTab === 'all'
                    ? 'bg-[#1D1D24] text-[#C5A880] font-semibold shadow-sm'
                    : 'text-[#8F909A] hover:text-[#EAEAEA]'
                }`}
              >
                {isBengali ? 'সবগুলো' : 'All'}
              </button>
              {categoryEntries.map(([key, cat]) => (
                <button
                  key={key}
                  type="button"
                  onClick={() => setActiveExpertiseTab(key)}
                  className={`px-4 py-1.5 rounded-full text-xs font-medium transition-colors ${
                    activeExpertiseTab === key
                      ? 'bg-[#1D1D24] text-[#C5A880] font-semibold shadow-sm'
                      : 'text-[#8F909A] hover:text-[#EAEAEA]'
                  }`}
                >
                  {t(cat.title)}
                </button>
              ))}
            </div>
          </div>
        </StaggerItem>

        <div
          className={`grid gap-5 ${
            activeExpertiseTab === 'all'
              ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-4'
              : 'grid-cols-1 sm:grid-cols-2'
          }`}
        >
          {filteredExpertise.map(([catKey, category]) => (
            <StaggerItem key={catKey}>
              <div className="group h-full p-6 rounded-2xl bg-[#111115]/80 backdrop-blur-md border border-white/10 hover:border-white/20 shadow-[0_8px_30px_rgb(0,0,0,0.8)] transition-all duration-300 flex flex-col justify-between">
                <div>
                  <div className="flex items-start justify-between mb-3.5">
                    <div className="p-2.5 rounded-xl bg-[#16161B] border border-white/10 group-hover:border-white/20 transition-colors">
                      {expertiseIcons[category.icon] || <Layers className="w-4 h-4 text-[#C5A880]" />}
                    </div>
                    <span className="text-[10px] font-mono text-[#8F909A] uppercase tracking-widest">
                      {catKey.toUpperCase()}
                    </span>
                  </div>

                  <h3 className="text-base font-display font-semibold text-[#EAEAEA] group-hover:text-white transition-colors">
                    {t(category.title)}
                  </h3>
                  <p className="text-xs text-[#8F909A] mt-2 leading-relaxed">
                    {t(category.description)}
                  </p>
                </div>

                <div className="mt-5 pt-4 border-t border-white/[0.04] space-y-3">
                  {category.skills.map((skill, sIdx) => (
                    <div key={sIdx} className="space-y-1">
                      <div className="flex items-center justify-between text-xs">
                        <span className="font-medium text-[#EAEAEA]">{t(skill.name)}</span>
                        <span className="font-mono text-[10px] text-[#C5A880] bg-[#16161B] px-2.5 py-0.5 rounded-full border border-white/10">
                          {t(skill.level)}
                        </span>
                      </div>
                      {skill.description && (
                        <p className="text-[11px] text-[#8F909A] leading-relaxed">
                          {t(skill.description)}
                        </p>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </StaggerItem>
          ))}
        </div>
      </ScrollRevealSection>

      {/* =========================================
          4. PROJECTS (VYROX Prominence + Clean Deep Shadows)
         ========================================= */}
      <ProjectsSection />

      {/* =========================================
          5. RESEARCH, WRITING, ACHIEVEMENTS & VISION (Editorial Style)
         ========================================= */}
      {/* Research Section */}
      <ScrollRevealSection id="research" className="scroll-mt-28 space-y-10 relative z-10">
        <StaggerItem>
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-xs font-mono text-[#C5A880] uppercase tracking-widest">
              <Eye className="w-3.5 h-3.5" />
              <span>{t(data.navigation.research)}</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-display font-bold text-[#EAEAEA]">
              {t(data.research.title)}
            </h2>
            <p className="text-[#8F909A] max-w-2xl text-xs sm:text-sm">
              {t(data.research.subtitle)}
            </p>
          </div>
        </StaggerItem>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {data.research.items.map((item) => (
            <StaggerItem key={item.id}>
              <div className="h-full p-6 sm:p-7 rounded-2xl bg-[#111115]/80 backdrop-blur-md border border-white/10 hover:border-white/20 shadow-[0_8px_30px_rgb(0,0,0,0.8)] transition-all duration-300 space-y-3.5">
                <div className="flex items-center justify-between text-xs font-mono text-[#C5A880]">
                  <span>{t(item.field)}</span>
                  <span className="bg-[#16161B] px-2.5 py-0.5 rounded-full text-[10px] text-[#8F909A] border border-white/10">
                    {t(item.status)}
                  </span>
                </div>

                <h3 className="text-base sm:text-lg font-display font-semibold text-[#EAEAEA]">
                  {t(item.title)}
                </h3>

                <p className="text-xs text-[#8F909A] leading-relaxed">
                  {t(item.summary)}
                </p>

                {item.keyFindings && item.keyFindings.length > 0 && (
                  <div className="pt-3 border-t border-white/[0.04] space-y-1.5">
                    <div className="text-[10px] font-mono uppercase tracking-widest text-[#8F909A]">
                      {isBengali ? 'মূল পর্যবেক্ষণ' : 'Key Observations'}
                    </div>
                    <ul className="space-y-1 text-xs text-[#8F909A]">
                      {item.keyFindings.map((finding, fIdx) => (
                        <li key={fIdx} className="flex items-start gap-1.5">
                          <span className="text-[#C5A880]">•</span>
                          <span>{t(finding)}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </StaggerItem>
          ))}
        </div>
      </ScrollRevealSection>

      {/* Writing Section */}
      <ScrollRevealSection id="writing" className="scroll-mt-28 space-y-10 relative z-10">
        <StaggerItem>
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-xs font-mono text-[#C5A880] uppercase tracking-widest">
              <BookOpen className="w-3.5 h-3.5" />
              <span>{t(data.navigation.writing)}</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-display font-bold text-[#EAEAEA]">
              {t(data.writing.title)}
            </h2>
            <p className="text-[#8F909A] max-w-2xl text-xs sm:text-sm">
              {t(data.writing.subtitle)}
            </p>
          </div>
        </StaggerItem>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {data.writing.articles.map((article) => (
            <StaggerItem key={article.id}>
              <div className="h-full p-6 sm:p-7 rounded-2xl bg-[#111115]/80 backdrop-blur-md border border-white/10 hover:border-white/20 shadow-[0_8px_30px_rgb(0,0,0,0.8)] transition-all duration-300 space-y-3.5">
                <div className="flex items-center justify-between text-xs font-mono text-[#8F909A]">
                  <span className="text-[#C5A880]">{t(article.topic)}</span>
                  <span>{t(article.readingTime)}</span>
                </div>

                <h3 className="text-lg font-display font-semibold text-[#EAEAEA] leading-snug">
                  {t(article.title)}
                </h3>

                <p className="text-xs text-[#8F909A] leading-relaxed">
                  {t(article.summary)}
                </p>

                <div className="pt-2 text-xs font-mono text-[#8F909A]">
                  <span>{t(article.platform)}</span>
                </div>
              </div>
            </StaggerItem>
          ))}
        </div>
      </ScrollRevealSection>

      {/* Achievements Section - 1M+ views in 22 days, 8,500 subscribers */}
      <ScrollRevealSection id="achievements" className="scroll-mt-28 space-y-10 relative z-10">
        <StaggerItem>
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-xs font-mono text-[#C5A880] uppercase tracking-widest">
              <Award className="w-3.5 h-3.5" />
              <span>{t(data.navigation.achievements)}</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-display font-bold text-[#EAEAEA]">
              {t(data.achievements.title)}
            </h2>
            <p className="text-[#8F909A] max-w-2xl text-xs sm:text-sm">
              {t(data.achievements.subtitle)}
            </p>
          </div>
        </StaggerItem>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {data.achievements.items.map((ach) => {
            const isViralMilestone = ach.id === 'achieve-media-milestone';
            return (
              <StaggerItem key={ach.id}>
                <div className="h-full p-6 sm:p-7 rounded-2xl bg-[#111115]/80 backdrop-blur-md border border-white/10 hover:border-white/20 shadow-[0_8px_30px_rgb(0,0,0,0.8)] transition-all duration-300 space-y-3.5">
                  <div className="flex items-center justify-between text-xs font-mono text-[#C5A880]">
                    <span>{t(ach.issuer)}</span>
                    {isViralMilestone && <Flame className="w-3.5 h-3.5 text-amber-400" />}
                  </div>

                  <h3 className={`font-display font-bold text-[#EAEAEA] ${isViralMilestone ? 'text-lg text-white' : 'text-base'}`}>
                    {t(ach.title)}
                  </h3>

                  <p className="text-xs text-[#8F909A] leading-relaxed">
                    {t(ach.description)}
                  </p>
                </div>
              </StaggerItem>
            );
          })}
        </div>
      </ScrollRevealSection>

      {/* Vision & Horizons */}
      <ScrollRevealSection id="vision" className="scroll-mt-28 space-y-10 relative z-10">
        <StaggerItem>
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-xs font-mono text-[#C5A880] uppercase tracking-widest">
              <Sparkles className="w-3.5 h-3.5" />
              <span>{t(data.navigation.vision)}</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-display font-bold text-[#EAEAEA]">
              {t(data.vision.title)}
            </h2>
          </div>
        </StaggerItem>

        <StaggerItem>
          <div className="p-8 sm:p-12 rounded-3xl bg-[#111115]/80 backdrop-blur-md border border-white/10 hover:border-white/20 text-center space-y-4 shadow-[0_8px_30px_rgb(0,0,0,0.8)] transition-all">
            <div className="max-w-3xl mx-auto space-y-3">
              <p className="text-lg sm:text-2xl font-display font-semibold text-[#EAEAEA] leading-relaxed">
                "{t(data.vision.statement)}"
              </p>
              {data.vision.quote && (
                <div className="text-xs font-mono text-[#C5A880] tracking-wider">
                  — {t(data.vision.quote)}
                </div>
              )}
            </div>
          </div>
        </StaggerItem>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {data.vision.pillars.map((pillar, idx) => (
            <StaggerItem key={idx}>
              <div className="h-full p-6 rounded-2xl bg-[#111115]/80 backdrop-blur-md border border-white/10 hover:border-white/20 space-y-2.5 shadow-[0_8px_30px_rgb(0,0,0,0.8)] transition-all">
                <div className="text-xs font-mono text-[#C5A880] font-bold">
                  0{idx + 1}
                </div>
                <h3 className="text-base font-display font-semibold text-[#EAEAEA]">
                  {t(pillar.title)}
                </h3>
                <p className="text-xs text-[#8F909A] leading-relaxed">
                  {t(pillar.description)}
                </p>
              </div>
            </StaggerItem>
          ))}
        </div>
      </ScrollRevealSection>

      {/* Experience Section */}
      <ScrollRevealSection id="experience" className="scroll-mt-28 space-y-10 relative z-10">
        <StaggerItem>
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-xs font-mono text-[#C5A880] uppercase tracking-widest">
              <Briefcase className="w-3.5 h-3.5" />
              <span>{t(data.navigation.experience)}</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-display font-bold text-[#EAEAEA]">
              {t(data.experience.title)}
            </h2>
            <p className="text-[#8F909A] max-w-2xl text-xs sm:text-sm">
              {t(data.experience.subtitle)}
            </p>
          </div>
        </StaggerItem>

        <div className="space-y-4">
          {data.experience.items.map((exp) => (
            <StaggerItem key={exp.id}>
              <div className="p-6 sm:p-7 rounded-2xl bg-[#111115]/80 backdrop-blur-md border border-white/10 hover:border-white/20 transition-all shadow-[0_8px_30px_rgb(0,0,0,0.8)]">
                <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1 mb-2">
                  <div>
                    <h3 className="text-lg font-display font-semibold text-[#EAEAEA]">
                      {t(exp.role)}
                    </h3>
                    <div className="text-xs font-mono text-[#C5A880]">
                      {t(exp.organization)} • {t(exp.location)}
                    </div>
                  </div>
                  <span className="text-[11px] font-mono text-[#8F909A] bg-[#16161B] px-3 py-1 rounded-full border border-white/10 self-start">
                    {t(exp.period)}
                  </span>
                </div>

                <ul className="space-y-1.5 text-xs text-[#8F909A] mt-3.5">
                  {exp.responsibilities.map((resp, rIdx) => (
                    <li key={rIdx} className="flex items-start gap-2">
                      <span className="text-[#C5A880]">•</span>
                      <span>{t(resp)}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </StaggerItem>
          ))}
        </div>
      </ScrollRevealSection>

      {/* Education & Foundations */}
      <ScrollRevealSection id="education" className="scroll-mt-28 space-y-10 relative z-10">
        <StaggerItem>
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-xs font-mono text-[#C5A880] uppercase tracking-widest">
              <GraduationCap className="w-3.5 h-3.5" />
              <span>{t(data.navigation.education)}</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-display font-bold text-[#EAEAEA]">
              {t(data.education.title)}
            </h2>
            <p className="text-[#8F909A] max-w-2xl text-xs sm:text-sm">
              {t(data.education.subtitle)}
            </p>
          </div>
        </StaggerItem>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {data.education.items.map((edu) => (
            <StaggerItem key={edu.id}>
              <div className="h-full p-6 sm:p-7 rounded-2xl bg-[#111115]/80 backdrop-blur-md border border-white/10 hover:border-white/20 transition-all space-y-3 shadow-[0_8px_30px_rgb(0,0,0,0.8)]">
                <div className="flex items-center justify-between text-xs font-mono text-[#C5A880]">
                  <span>{t(edu.institution)}</span>
                  <span className="text-[#8F909A] text-[11px] bg-[#16161B] px-2.5 py-0.5 rounded-full border border-white/10">
                    {t(edu.period)}
                  </span>
                </div>
                <h3 className="text-base font-display font-semibold text-[#EAEAEA]">
                  {t(edu.degree)}
                </h3>
                <div className="text-[11px] font-mono text-[#8F909A] flex items-center gap-1.5">
                  <MapPin className="w-3 h-3 text-[#C5A880]" />
                  <span>{t(edu.location)}</span>
                </div>
                {edu.details && (
                  <p className="text-xs text-[#8F909A] leading-relaxed pt-2.5 border-t border-white/[0.04]">
                    {t(edu.details)}
                  </p>
                )}
              </div>
            </StaggerItem>
          ))}
        </div>
      </ScrollRevealSection>

      {/* Languages */}
      <ScrollRevealSection id="languages" className="scroll-mt-28 space-y-10 relative z-10">
        <StaggerItem>
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-xs font-mono text-[#C5A880] uppercase tracking-widest">
              <Globe2 className="w-3.5 h-3.5" />
              <span>{t(data.navigation.languages)}</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-display font-bold text-[#EAEAEA]">
              {t(data.languages.title)}
            </h2>
            <p className="text-[#8F909A] max-w-2xl text-xs sm:text-sm">
              {t(data.languages.subtitle)}
            </p>
          </div>
        </StaggerItem>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Operational / Active Use */}
          <div className="space-y-3">
            <StaggerItem>
              <div className="text-xs font-mono uppercase tracking-wider text-[#C5A880] flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#C5A880]" />
                <span>{isBengali ? 'সক্রিয় ব্যবহারিক ভাষাসমূহ' : 'Active Operational Languages'}</span>
              </div>
            </StaggerItem>

            <div className="space-y-3">
              {data.languages.use.map((langItem, idx) => (
                <StaggerItem key={idx}>
                  <div className="p-4 sm:p-5 rounded-2xl bg-[#111115]/80 backdrop-blur-md border border-white/10 hover:border-white/20 space-y-1.5 shadow-[0_8px_30px_rgb(0,0,0,0.8)] transition-all">
                    <div className="flex items-center justify-between">
                      <h3 className="font-medium text-[#EAEAEA] text-sm">{t(langItem.name)}</h3>
                      <span className="text-[10px] font-mono text-[#C5A880] bg-[#16161B] border border-white/10 px-2.5 py-0.5 rounded-full">
                        {t(langItem.proficiency)}
                      </span>
                    </div>
                    <p className="text-xs text-[#8F909A] leading-relaxed">
                      {t(langItem.context)}
                    </p>
                  </div>
                </StaggerItem>
              ))}
            </div>
          </div>

          {/* In Progress / Learning */}
          <div className="space-y-3">
            <StaggerItem>
              <div className="text-xs font-mono uppercase tracking-wider text-[#8F909A] flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#8F909A]" />
                <span>{isBengali ? 'চলমান ভাষা শিক্ষা' : 'Languages in Acquisition'}</span>
              </div>
            </StaggerItem>

            <div className="space-y-3">
              {data.languages.learning.map((learnItem, idx) => (
                <StaggerItem key={idx}>
                  <div className="p-4 sm:p-5 rounded-2xl bg-[#111115]/80 backdrop-blur-md border border-white/10 hover:border-white/20 space-y-1.5 shadow-[0_8px_30px_rgb(0,0,0,0.8)] transition-all">
                    <div className="flex items-center justify-between">
                      <h3 className="font-medium text-[#EAEAEA] text-sm">{t(learnItem.name)}</h3>
                      <span className="text-[10px] font-mono text-[#8F909A] bg-[#16161B] border border-white/10 px-2.5 py-0.5 rounded-full">
                        {t(learnItem.stage)}
                      </span>
                    </div>
                    <p className="text-xs text-[#8F909A] leading-relaxed">
                      <span className="text-[#EAEAEA]">{isBengali ? 'লক্ষ্য: ' : 'Objective: '}</span>
                      {t(learnItem.goal)}
                    </p>
                  </div>
                </StaggerItem>
              ))}
            </div>
          </div>
        </div>
      </ScrollRevealSection>

      {/* =========================================
          6. FOOTER & CONTACT
         ========================================= */}
      <ContactSection />
    </div>
  );
}
