'use client';

import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { usePortfolioData } from '../hooks/usePortfolioData';
import { ScrollRevealSection } from '../components/ScrollRevealSection';
import {
  Sparkles,
  ExternalLink,
  Terminal,
  ArrowUpRight,
  Send,
  Play,
} from 'lucide-react';

export default function ProjectsSection() {
  const { data } = usePortfolioData();
  const { t, isBengali } = useLanguage();
  const [playingVideoId, setPlayingVideoId] = useState<string | null>(null);

  const vyrox = data.projects.items.find((p) => p.featured) || data.projects.items[0];
  const otherProjects = data.projects.items.filter((p) => p.id !== vyrox.id);

  return (
    <ScrollRevealSection id="projects" className="scroll-mt-28 space-y-12">
      <div className="space-y-2">
        <div className="flex items-center gap-2 text-xs font-mono text-[#C5A880] uppercase tracking-widest">
          <Terminal className="w-3.5 h-3.5" />
          <span>{t(data.navigation.projects)}</span>
        </div>
        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-display font-bold text-[#EAEAEA]">
          {t(data.projects.title)}
        </h2>
        <p className="text-[#8F909A] max-w-2xl text-xs sm:text-sm">
          {t(data.projects.subtitle)}
        </p>
      </div>

      {/* Flagship Feature: VYROX Card with Crisp Borders, Deep Shadows & No Glow */}
      <div className="group relative rounded-3xl transition-all duration-500">
        <div className="relative rounded-3xl bg-[#111115]/80 backdrop-blur-md border border-white/10 hover:border-white/20 p-6 sm:p-8 lg:p-10 shadow-[0_8px_30px_rgb(0,0,0,0.8)] transition-all duration-300 overflow-hidden">
          {/* Subtle watermarked typographic element */}
          <div className="absolute -right-4 -bottom-6 select-none pointer-events-none text-white/[0.02] font-display font-black text-8xl sm:text-9xl tracking-tighter">
            VYROX
          </div>

          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Left Column: Details */}
            <div className="lg:col-span-7 space-y-5">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#181820]/90 border border-white/10 text-[#C5A880] text-[10px] font-mono tracking-widest uppercase">
                <Sparkles className="w-3 h-3 text-[#C5A880]" />
                <span>{isBengali ? 'শীর্ষস্থানীয় উদ্ভাবনী ইকোসিস্টেম' : 'Flagship AI Media Project'}</span>
              </div>

              <div className="space-y-1.5">
                <h3 className="text-3xl sm:text-4xl font-display font-extrabold text-[#EAEAEA] tracking-tight">
                  {t(vyrox.title)}
                </h3>
                <div className="text-xs font-mono text-[#C5A880] tracking-wide">
                  {t(vyrox.category)} • {t(vyrox.role)}
                </div>
              </div>

              <p className="text-sm text-[#8F909A] leading-relaxed">
                {t(vyrox.description)}
              </p>

              {/* Status and Highlights */}
              <div className="flex flex-wrap items-center gap-3 text-xs font-mono">
                {vyrox.status && (
                  <span className="flex items-center gap-1.5 bg-[#181820]/90 text-[#EAEAEA] px-3.5 py-1 rounded-full border border-white/10">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#C5A880]" />
                    {t(vyrox.status)}
                  </span>
                )}
                <span className="bg-[#181820]/90 text-[#8F909A] px-3.5 py-1 rounded-full border border-white/10">
                  Moulvibazar Core
                </span>
              </div>

              {/* Tech stack badges */}
              <div className="flex flex-wrap gap-1.5 pt-2">
                {vyrox.technologies.map((tech, idx) => (
                  <span
                    key={idx}
                    className="px-3 py-1 rounded-full bg-[#181820]/80 border border-white/10 text-xs font-mono text-[#8F909A]"
                  >
                    {t(tech)}
                  </span>
                ))}
              </div>

              {/* Action Buttons: Pill-shaped */}
              <div className="flex flex-wrap items-center gap-3 pt-3">
                <a
                  href={data.contact.youtubeUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-[#C5A880] hover:bg-[#D4B48F] text-[#0A0A0C] text-xs font-semibold uppercase tracking-wider transition-all duration-300 shadow-[0_8px_30px_rgb(0,0,0,0.8)] active:scale-95"
                >
                  <span>{isBengali ? 'সম্প্রচার দেখুন' : 'Watch Broadcast'}</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </a>

                {vyrox.facebookUrl && (
                  <a
                    href={vyrox.facebookUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-[#111115]/80 hover:bg-[#18181F] text-[#EAEAEA] border border-white/10 hover:border-white/20 text-xs font-mono transition-all backdrop-blur-md active:scale-95 shadow-[0_8px_30px_rgb(0,0,0,0.8)]"
                  >
                    <span>{isBengali ? 'ফেসবুক পেজ' : 'Facebook Page'}</span>
                    <ExternalLink className="w-3.5 h-3.5 text-[#C5A880]" />
                  </a>
                )}

                <a
                  href="#contact"
                  className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-[#111115]/80 hover:bg-[#18181F] text-[#EAEAEA] border border-white/10 hover:border-white/20 text-xs font-mono transition-all backdrop-blur-md active:scale-95 shadow-[0_8px_30px_rgb(0,0,0,0.8)]"
                >
                  <span>{isBengali ? 'যৌথ উদ্যোগ' : 'Collaborate'}</span>
                  <Send className="w-3 h-3 text-[#C5A880]" />
                </a>
              </div>
            </div>

            {/* Right Column: Cinematic Media Embed or Player (No radial-gradient) */}
            <div className="lg:col-span-5">
              <div className="relative rounded-2xl overflow-hidden border border-white/10 bg-[#0A0A0C] shadow-[0_8px_30px_rgb(0,0,0,0.8)] aspect-video group/video">
                {playingVideoId === vyrox.id ? (
                  <iframe
                    className="w-full h-full"
                    src={`https://www.youtube-nocookie.com/embed/videoseries?list=PLp_${vyrox.id}&autoplay=1`}
                    title="VYROX Cinematic Showcase"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                ) : (
                  <div className="relative w-full h-full flex flex-col items-center justify-center p-6 text-center bg-[#0E0E12]">
                    <div className="relative z-10 space-y-4">
                      <div className="w-14 h-14 rounded-full bg-[#16161B] border border-white/10 flex items-center justify-center mx-auto text-[#C5A880] group-hover/video:scale-105 group-hover/video:bg-[#C5A880] group-hover/video:text-[#0A0A0C] transition-all duration-300 shadow-[0_8px_30px_rgb(0,0,0,0.8)]">
                        <Play className="w-6 h-6 fill-current ml-0.5" />
                      </div>
                      <div className="space-y-1">
                        <div className="text-xs font-mono text-[#C5A880] uppercase tracking-wider">
                          Cinematic Transmission
                        </div>
                        <div className="text-sm font-display font-semibold text-[#EAEAEA]">
                          VYROX Official Overview
                        </div>
                      </div>
                      <a
                        href={data.contact.youtubeUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 text-xs font-mono text-[#8F909A] hover:text-[#C5A880] transition-colors"
                      >
                        <span>Watch on YouTube</span>
                        <ExternalLink className="w-3 h-3" />
                      </a>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Secondary Projects Grid with Crisp Borders, Deep Shadows & No Glow */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {otherProjects.map((project) => (
          <div
            key={project.id}
            className="group relative rounded-2xl transition-all duration-300"
          >
            <div className="relative h-full p-6 sm:p-7 rounded-2xl bg-[#111115]/80 backdrop-blur-md border border-white/10 hover:border-white/20 shadow-[0_8px_30px_rgb(0,0,0,0.8)] transition-all duration-300 flex flex-col justify-between space-y-4">
              <div className="space-y-3">
                <div className="flex items-center justify-between text-[11px] font-mono">
                  <span className="text-[#C5A880] uppercase tracking-wider">{t(project.category)}</span>
                  {project.status && (
                    <span className="text-[#8F909A] bg-[#16161B]/80 px-2.5 py-0.5 rounded-full border border-white/10">
                      {t(project.status)}
                    </span>
                  )}
                </div>

                <h4 className="text-xl font-display font-bold text-[#EAEAEA] group-hover:text-white transition-colors">
                  {t(project.title)}
                </h4>
                <div className="text-xs font-mono text-[#8F909A]">
                  {t(project.subtitle)}
                </div>

                <p className="text-xs sm:text-sm text-[#8F909A] leading-relaxed">
                  {t(project.description)}
                </p>
              </div>

              <div className="space-y-4 pt-3 border-t border-white/[0.04]">
                <div className="flex flex-wrap gap-1.5">
                  {project.technologies.map((tech, idx) => (
                    <span
                      key={idx}
                      className="px-2.5 py-1 rounded-full bg-[#16161B]/80 border border-white/10 text-[10px] font-mono text-[#8F909A]"
                    >
                      {t(tech)}
                    </span>
                  ))}
                </div>

                <div className="flex items-center justify-between text-xs font-mono">
                  <span className="text-[#8F909A]">{t(project.role)}</span>
                  <a
                    href={data.contact.youtubeUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-[#C5A880] hover:text-[#D4B48F] transition-colors"
                  >
                    <span>{isBengali ? 'বিবরণ' : 'Explore'}</span>
                    <ArrowUpRight className="w-3 h-3" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </ScrollRevealSection>
  );
}
