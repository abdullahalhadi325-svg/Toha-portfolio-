'use client';

import React, { useState } from 'react';
import { usePortfolioData } from '../hooks/usePortfolioData';
import { PortfolioData, BilingualText } from '../types/portfolio';
import {
  X,
  Save,
  Download,
  RotateCcw,
  LogOut,
  Plus,
  Trash2,
  Edit2,
  Check,
  ChevronRight,
  Sparkles,
  Layers,
  Terminal,
  Eye,
  BookOpen,
  Award,
  Compass,
  Briefcase,
  Mail,
  GraduationCap,
  Globe2,
  ExternalLink,
  Upload,
  Shield,
} from 'lucide-react';

type SectionKey =
  | 'hero'
  | 'about'
  | 'expertise'
  | 'projects'
  | 'research'
  | 'writing'
  | 'achievements'
  | 'vision'
  | 'experience'
  | 'contact'
  | 'education'
  | 'languages'
  | 'security';

const SECTIONS: { id: SectionKey; label: string; icon: React.ReactNode }[] = [
  { id: 'hero', label: 'Hero Section', icon: <Sparkles className="w-4 h-4" /> },
  { id: 'about', label: 'About & Philosophy', icon: <Compass className="w-4 h-4" /> },
  { id: 'expertise', label: 'Expertise & Skills', icon: <Layers className="w-4 h-4" /> },
  { id: 'projects', label: 'Projects & VYROX', icon: <Terminal className="w-4 h-4" /> },
  { id: 'research', label: 'Research & Studies', icon: <Eye className="w-4 h-4" /> },
  { id: 'writing', label: 'Writing & Articles', icon: <BookOpen className="w-4 h-4" /> },
  { id: 'achievements', label: 'Milestones & Achievements', icon: <Award className="w-4 h-4" /> },
  { id: 'vision', label: 'Vision & Pillars', icon: <Sparkles className="w-4 h-4" /> },
  { id: 'experience', label: 'Experience & Career', icon: <Briefcase className="w-4 h-4" /> },
  { id: 'contact', label: 'Contact & Socials', icon: <Mail className="w-4 h-4" /> },
  { id: 'education', label: 'Education & Hifz', icon: <GraduationCap className="w-4 h-4" /> },
  { id: 'languages', label: 'Languages', icon: <Globe2 className="w-4 h-4" /> },
  { id: 'security', label: 'Security & Access', icon: <Shield className="w-4 h-4" /> },
];

export default function AdminPanel() {
  const {
    data: globalData,
    updateData,
    resetData,
    exportData,
    isAdminOpen,
    setIsAdminOpen,
    logout,
    updateCredentials,
  } = usePortfolioData();

  // Local draft state of data being edited in the CMS
  const [draft, setDraft] = useState<PortfolioData>(() => JSON.parse(JSON.stringify(globalData)));
  const [activeSection, setActiveSection] = useState<SectionKey>('hero');
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [statusMessage, setStatusMessage] = useState<string | null>(null);
  const [isCompressingImage, setIsCompressingImage] = useState(false);
  const [imageUploadError, setImageUploadError] = useState<string | null>(null);

  const [newUsername, setNewUsername] = useState('');
  const [newPassword, setNewPassword] = useState('');

  // Task 1: Local Image Upload with Canvas Compression (Max 800px, 0.7 quality WebP/JPEG)
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      setImageUploadError('Please select a valid image file.');
      return;
    }

    setIsCompressingImage(true);
    setImageUploadError(null);

    const reader = new FileReader();
    reader.onload = (uploadEvent) => {
      const img = new Image();
      img.onload = () => {
        try {
          const canvas = document.createElement('canvas');
          let width = img.width;
          let height = img.height;
          const maxDimension = 800;

          // Resize proportionally to a maximum width/height of 800px
          if (width > maxDimension || height > maxDimension) {
            if (width > height) {
              height = Math.round((height * maxDimension) / width);
              width = maxDimension;
            } else {
              width = Math.round((width * maxDimension) / height);
              height = maxDimension;
            }
          }

          canvas.width = width;
          canvas.height = height;

          const ctx = canvas.getContext('2d');
          if (!ctx) {
            throw new Error('Canvas 2D context is not available');
          }

          // Draw the resized image into the canvas
          ctx.drawImage(img, 0, 0, width, height);

          // Convert to WebP or JPEG Base64 string with 0.7 quality
          let compressedBase64 = canvas.toDataURL('image/webp', 0.7);
          if (!compressedBase64.startsWith('data:image/webp')) {
            compressedBase64 = canvas.toDataURL('image/jpeg', 0.7);
          }

          const approxKb = Math.round((compressedBase64.length * 3) / 4 / 1024);

          // Save this lightweight Base64 string into the image_url field of the JSON state
          setDraft((prev) => ({
            ...prev,
            hero: {
              ...prev.hero,
              image_url: compressedBase64,
            },
          }));

          setStatusMessage(`Portrait image compressed (${width}×${height}px, ~${approxKb} KB) and loaded!`);
          setTimeout(() => setStatusMessage(null), 3500);
        } catch (err) {
          console.error('Image compression error:', err);
          setImageUploadError('Failed to compress image.');
        } finally {
          setIsCompressingImage(false);
        }
      };

      img.onerror = () => {
        setImageUploadError('Failed to read image data.');
        setIsCompressingImage(false);
      };

      if (uploadEvent.target?.result) {
        img.src = uploadEvent.target.result as string;
      }
    };

    reader.onerror = () => {
      setImageUploadError('Error reading file from disk.');
      setIsCompressingImage(false);
    };

    reader.readAsDataURL(file);
    // Reset file input value to allow re-uploading the same file if desired
    e.target.value = '';
  };

  if (!isAdminOpen) return null;

  const handleSave = () => {
    const success = updateData(draft);
    if (success) {
      setSaveSuccess(true);
      setStatusMessage('Changes saved to localStorage and applied to portfolio!');
      setTimeout(() => {
        setSaveSuccess(false);
        setStatusMessage(null);
      }, 3500);
    } else {
      setStatusMessage('Failed to save to localStorage.');
    }
  };

  const handleUpdateCredentials = (e: React.FormEvent) => {
    e.preventDefault();
    if (newUsername.trim() && newPassword.trim()) {
      updateCredentials(newUsername.trim(), newPassword.trim());
      setStatusMessage('Credentials updated successfully!');
      setNewUsername('');
      setNewPassword('');
      setTimeout(() => setStatusMessage(null), 3500);
    }
  };

  const handleReset = () => {
    if (window.confirm('Are you sure you want to discard all CMS modifications and reset to initial JSON defaults?')) {
      resetData();
      setDraft(JSON.parse(JSON.stringify(globalData)));
      setStatusMessage('Portfolio reset to default JSON configuration.');
      setTimeout(() => setStatusMessage(null), 3500);
    }
  };

  // Helper for updating bilingual field
  const updateBilingual = (
    setter: (fn: (prev: PortfolioData) => PortfolioData) => void,
    path: (d: PortfolioData) => BilingualText,
    lang: 'en' | 'bn',
    val: string
  ) => {
    setDraft((prev) => {
      const copy = JSON.parse(JSON.stringify(prev));
      const target = path(copy);
      target[lang] = val;
      return copy;
    });
  };

  return (
    <div className="fixed inset-0 z-[120] bg-[#0A0A0C] text-[#EAEAEA] flex flex-col overflow-hidden animate-fade-in">
      {/* Top Navbar */}
      <header className="h-16 px-4 sm:px-6 bg-[#111115] border-b border-white/10 flex items-center justify-between shrink-0">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-[#C5A880]/15 border border-[#C5A880]/30 flex items-center justify-center text-[#C5A880]">
            <Terminal className="w-4 h-4" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-display font-bold text-sm tracking-wide text-white">
                Portfolio Local CMS
              </span>
              <span className="px-2 py-0.5 rounded-full bg-[#181820] border border-white/10 text-[10px] font-mono text-[#C5A880]">
                Zero-Backend
              </span>
            </div>
            <p className="text-[10px] font-mono text-[#8F909A] hidden sm:block">
              Edit 10+ sections in real-time • Stored in browser localStorage
            </p>
          </div>
        </div>

        {/* Global CMS Actions */}
        <div className="flex items-center gap-2 sm:gap-3">
          <button
            type="button"
            onClick={handleSave}
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-[#C5A880] hover:bg-[#D4B48F] text-[#0A0A0C] font-semibold text-xs uppercase tracking-wider transition-all shadow-[0_4px_20px_rgba(197,168,128,0.25)] active:scale-95 cursor-pointer"
          >
            {saveSuccess ? <Check className="w-3.5 h-3.5" /> : <Save className="w-3.5 h-3.5" />}
            <span>{saveSuccess ? 'Saved!' : 'Save Changes'}</span>
          </button>

          <button
            type="button"
            onClick={exportData}
            title="Download full portfolioData.json file"
            className="hidden sm:inline-flex items-center gap-1.5 px-3.5 py-2 rounded-full bg-[#16161B] hover:bg-[#1D1D24] border border-white/10 text-xs font-mono text-[#EAEAEA] transition-colors cursor-pointer"
          >
            <Download className="w-3.5 h-3.5 text-[#C5A880]" />
            <span>Export JSON</span>
          </button>

          <button
            type="button"
            onClick={handleReset}
            title="Reset to default JSON content"
            className="p-2 rounded-full bg-[#16161B] hover:bg-red-950/30 text-[#8F909A] hover:text-red-400 border border-white/10 hover:border-red-800/40 transition-colors cursor-pointer"
          >
            <RotateCcw className="w-4 h-4" />
          </button>

          <button
            type="button"
            onClick={logout}
            title="Log out of CMS"
            className="p-2 rounded-full bg-[#16161B] hover:bg-[#1D1D24] text-[#8F909A] hover:text-[#EAEAEA] border border-white/10 transition-colors cursor-pointer"
          >
            <LogOut className="w-4 h-4" />
          </button>

          <button
            type="button"
            onClick={() => setIsAdminOpen(false)}
            title="Close editor and preview site"
            className="p-2 rounded-full bg-[#16161B] hover:bg-[#1D1D24] text-[#8F909A] hover:text-white border border-white/10 transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </header>

      {/* Status Alert if visible */}
      {statusMessage && (
        <div className="bg-[#181820] border-b border-[#C5A880]/30 px-6 py-2 text-xs font-mono text-[#C5A880] flex items-center justify-between">
          <span>{statusMessage}</span>
          <button type="button" onClick={() => setStatusMessage(null)} className="text-white/40 hover:text-white">
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      )}

      {/* Main CMS Workspace */}
      <div className="flex-1 flex flex-col md:flex-row overflow-hidden">
        {/* Sidebar Navigation */}
        <aside className="w-full md:w-64 bg-[#111115]/90 border-b md:border-b-0 md:border-r border-white/10 flex md:flex-col overflow-x-auto md:overflow-y-auto shrink-0 p-2 md:p-3 space-x-1 md:space-x-0 md:space-y-1">
          {SECTIONS.map((sec) => (
            <button
              key={sec.id}
              type="button"
              onClick={() => setActiveSection(sec.id)}
              className={`flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-medium text-left whitespace-nowrap transition-colors cursor-pointer shrink-0 md:w-full ${
                activeSection === sec.id
                  ? 'bg-[#1D1D24] text-[#C5A880] font-semibold border border-white/10'
                  : 'text-[#8F909A] hover:text-[#EAEAEA] hover:bg-[#16161B]'
              }`}
            >
              <span className={activeSection === sec.id ? 'text-[#C5A880]' : 'text-[#8F909A]'}>
                {sec.icon}
              </span>
              <span className="truncate">{sec.label}</span>
            </button>
          ))}
        </aside>

        {/* Section Editing Canvas */}
        <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8 space-y-8 bg-[#0A0A0C]">
          {/* Active Section Header */}
          <div className="flex items-center justify-between pb-4 border-b border-white/10">
            <div>
              <h2 className="text-xl sm:text-2xl font-display font-bold text-white capitalize">
                {SECTIONS.find((s) => s.id === activeSection)?.label}
              </h2>
              <p className="text-xs font-mono text-[#8F909A]">
                Update bilingual strings and structural parameters
              </p>
            </div>
            <button
              type="button"
              onClick={handleSave}
              className="px-4 py-1.5 rounded-full bg-[#181820] hover:bg-[#20202A] border border-white/10 text-xs font-mono text-[#C5A880] transition-colors cursor-pointer"
            >
              Apply Updates
            </button>
          </div>

          {/* SECTION 1: HERO */}
          {activeSection === 'hero' && (
            <div className="space-y-6 max-w-4xl">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <BilingualField
                  label="Client Name"
                  value={draft.hero.name}
                  onChangeEn={(v) => (draft.hero.name.en = v)}
                  onChangeBn={(v) => (draft.hero.name.bn = v)}
                />
                <BilingualField
                  label="Headline / Role"
                  value={draft.hero.headline}
                  onChangeEn={(v) => (draft.hero.headline.en = v)}
                  onChangeBn={(v) => (draft.hero.headline.bn = v)}
                />
              </div>

              <BilingualField
                label="Dynamic Tagline"
                value={draft.hero.tagline}
                onChangeEn={(v) => (draft.hero.tagline.en = v)}
                onChangeBn={(v) => (draft.hero.tagline.bn = v)}
              />

              <BilingualField
                label="Executive Summary"
                isTextarea
                value={draft.hero.summary}
                onChangeEn={(v) => (draft.hero.summary.en = v)}
                onChangeBn={(v) => (draft.hero.summary.bn = v)}
              />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <BilingualField
                  label="Location"
                  value={draft.hero.location}
                  onChangeEn={(v) => (draft.hero.location.en = v)}
                  onChangeBn={(v) => (draft.hero.location.bn = v)}
                />
                <BilingualField
                  label="Availability Status"
                  value={draft.hero.availability}
                  onChangeEn={(v) => (draft.hero.availability.en = v)}
                  onChangeBn={(v) => (draft.hero.availability.bn = v)}
                />
              </div>

              {/* Task 1: Local Image Upload with Canvas Compression */}
              <div className="p-5 rounded-2xl bg-[#111115] border border-white/10 shadow-[0_8px_30px_rgb(0,0,0,0.8)] space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div>
                    <label className="block text-xs font-mono text-[#C5A880] tracking-wider uppercase">
                      Portrait Hero Image
                    </label>
                    <p className="text-[11px] text-[#8F909A] font-mono mt-0.5">
                      Canvas compression (max 800px, 0.7 quality) ensures localStorage safety (&lt; 5MB limit).
                    </p>
                  </div>

                  {/* Beautifully styled "Upload Image" button (pill-shaped, NO glow) */}
                  <label className="inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-full bg-[#C5A880] hover:bg-[#D4B48F] text-[#0A0A0C] text-xs font-semibold uppercase tracking-wider transition-all duration-300 shadow-[0_8px_30px_rgb(0,0,0,0.8)] active:scale-95 cursor-pointer shrink-0">
                    <Upload className="w-3.5 h-3.5" />
                    <span>{isCompressingImage ? 'Compressing...' : 'Upload Image'}</span>
                    <input
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={handleImageUpload}
                      disabled={isCompressingImage}
                    />
                  </label>
                </div>

                {imageUploadError && (
                  <div className="p-3 rounded-xl bg-red-950/40 border border-red-800/40 text-xs text-red-300 font-mono">
                    {imageUploadError}
                  </div>
                )}

                {draft.hero.image_url ? (
                  <div className="pt-2 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-3.5 rounded-xl bg-[#0A0A0C] border border-white/10">
                    <div className="flex items-center gap-3.5">
                      <img
                        src={draft.hero.image_url}
                        alt="Portrait preview"
                        className="w-14 h-16 object-cover rounded-xl border border-white/10 shadow-md shrink-0"
                      />
                      <div className="space-y-1">
                        <div className="text-xs font-medium text-white flex items-center gap-1.5">
                          <Check className="w-3.5 h-3.5 text-emerald-400" />
                          <span>Compressed Image Active</span>
                        </div>
                        <p className="text-[10px] text-[#8F909A] font-mono break-all line-clamp-1">
                          {draft.hero.image_url.startsWith('data:')
                            ? `Base64 Encoded (~${Math.round((draft.hero.image_url.length * 3) / 4 / 1024)} KB)`
                            : draft.hero.image_url}
                        </p>
                      </div>
                    </div>

                    <button
                      type="button"
                      onClick={() =>
                        setDraft((prev) => ({
                          ...prev,
                          hero: { ...prev.hero, image_url: '' },
                        }))
                      }
                      className="text-xs font-mono text-red-400 hover:text-red-300 px-3 py-1.5 rounded-full bg-red-950/30 hover:bg-red-950/50 border border-red-800/30 transition-colors cursor-pointer"
                    >
                      Remove Image
                    </button>
                  </div>
                ) : (
                  <div className="p-4 rounded-xl border border-dashed border-white/10 text-center text-xs font-mono text-[#8F909A]">
                    No portrait image loaded. Click &quot;Upload Image&quot; to pick an image from your device.
                  </div>
                )}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 rounded-2xl bg-[#111115] border border-white/10 space-y-3">
                  <span className="text-xs font-mono text-[#C5A880] block">Primary CTA</span>
                  <BilingualField
                    label="Label"
                    value={draft.hero.primaryCta.label}
                    onChangeEn={(v) => (draft.hero.primaryCta.label.en = v)}
                    onChangeBn={(v) => (draft.hero.primaryCta.label.bn = v)}
                  />
                  <input
                    type="text"
                    value={draft.hero.primaryCta.url}
                    onChange={(e) => {
                      draft.hero.primaryCta.url = e.target.value;
                      setDraft({ ...draft });
                    }}
                    placeholder="#projects"
                    className="w-full px-3 py-1.5 rounded-lg bg-[#0A0A0C] border border-white/10 text-xs font-mono text-[#EAEAEA]"
                  />
                </div>

                <div className="p-4 rounded-2xl bg-[#111115] border border-white/10 space-y-3">
                  <span className="text-xs font-mono text-[#C5A880] block">Secondary CTA</span>
                  <BilingualField
                    label="Label"
                    value={draft.hero.secondaryCta.label}
                    onChangeEn={(v) => (draft.hero.secondaryCta.label.en = v)}
                    onChangeBn={(v) => (draft.hero.secondaryCta.label.bn = v)}
                  />
                  <input
                    type="text"
                    value={draft.hero.secondaryCta.url}
                    onChange={(e) => {
                      draft.hero.secondaryCta.url = e.target.value;
                      setDraft({ ...draft });
                    }}
                    placeholder="#experience"
                    className="w-full px-3 py-1.5 rounded-lg bg-[#0A0A0C] border border-white/10 text-xs font-mono text-[#EAEAEA]"
                  />
                </div>
              </div>
            </div>
          )}

          {/* SECTION 2: ABOUT */}
          {activeSection === 'about' && (
            <div className="space-y-6 max-w-4xl">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <BilingualField
                  label="Section Title"
                  value={draft.about.title}
                  onChangeEn={(v) => (draft.about.title.en = v)}
                  onChangeBn={(v) => (draft.about.title.bn = v)}
                />
                <BilingualField
                  label="Section Subtitle"
                  value={draft.about.subtitle}
                  onChangeEn={(v) => (draft.about.subtitle.en = v)}
                  onChangeBn={(v) => (draft.about.subtitle.bn = v)}
                />
              </div>

              <BilingualField
                label="Core Philosophy Thesis"
                isTextarea
                value={draft.about.philosophy}
                onChangeEn={(v) => (draft.about.philosophy.en = v)}
                onChangeBn={(v) => (draft.about.philosophy.bn = v)}
              />

              {/* Bio Paragraphs Array */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono uppercase tracking-widest text-[#C5A880]">
                    Bio Paragraphs ({draft.about.bioParagraphs.length})
                  </span>
                  <button
                    type="button"
                    onClick={() => {
                      draft.about.bioParagraphs.push({ en: 'New narrative paragraph.', bn: 'নতুন অনুচ্ছেদ।' });
                      setDraft({ ...draft });
                    }}
                    className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-[#181820] text-xs font-mono text-[#C5A880] border border-white/10 hover:border-[#C5A880]/40 cursor-pointer"
                  >
                    <Plus className="w-3 h-3" />
                    <span>Add Paragraph</span>
                  </button>
                </div>

                {draft.about.bioParagraphs.map((para, idx) => (
                  <div key={idx} className="p-4 rounded-2xl bg-[#111115] border border-white/10 space-y-2 relative">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-mono text-[#8F909A]">Paragraph 0{idx + 1}</span>
                      <button
                        type="button"
                        onClick={() => {
                          draft.about.bioParagraphs.splice(idx, 1);
                          setDraft({ ...draft });
                        }}
                        className="text-red-400 hover:text-red-300 p-1 cursor-pointer"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                    <BilingualField
                      label=""
                      isTextarea
                      value={para}
                      onChangeEn={(v) => (para.en = v)}
                      onChangeBn={(v) => (para.bn = v)}
                    />
                  </div>
                ))}
              </div>

              {/* Quick Facts Array */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono uppercase tracking-widest text-[#C5A880]">
                    Quick Facts ({draft.about.quickFacts.length})
                  </span>
                  <button
                    type="button"
                    onClick={() => {
                      draft.about.quickFacts.push({
                        label: { en: 'Metric', bn: 'মেট্রিক' },
                        value: { en: 'Value', bn: 'মান' },
                      });
                      setDraft({ ...draft });
                    }}
                    className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-[#181820] text-xs font-mono text-[#C5A880] border border-white/10 cursor-pointer"
                  >
                    <Plus className="w-3 h-3" />
                    <span>Add Fact</span>
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {draft.about.quickFacts.map((fact, idx) => (
                    <div key={idx} className="p-4 rounded-xl bg-[#111115] border border-white/10 space-y-2 relative">
                      <div className="flex justify-between items-center">
                        <span className="text-[10px] font-mono text-[#8F909A]">Fact #{idx + 1}</span>
                        <button
                          type="button"
                          onClick={() => {
                            draft.about.quickFacts.splice(idx, 1);
                            setDraft({ ...draft });
                          }}
                          className="text-red-400 hover:text-red-300 p-1 cursor-pointer"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                      <BilingualField
                        label="Label"
                        value={fact.label}
                        onChangeEn={(v) => (fact.label.en = v)}
                        onChangeBn={(v) => (fact.label.bn = v)}
                      />
                      <BilingualField
                        label="Value"
                        value={fact.value}
                        onChangeEn={(v) => (fact.value.en = v)}
                        onChangeBn={(v) => (fact.value.bn = v)}
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* SECTION 3: EXPERTISE */}
          {activeSection === 'expertise' && (
            <div className="space-y-6 max-w-4xl">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <BilingualField
                  label="Section Title"
                  value={draft.expertise.title}
                  onChangeEn={(v) => (draft.expertise.title.en = v)}
                  onChangeBn={(v) => (draft.expertise.title.bn = v)}
                />
                <BilingualField
                  label="Section Subtitle"
                  value={draft.expertise.subtitle}
                  onChangeEn={(v) => (draft.expertise.subtitle.en = v)}
                  onChangeBn={(v) => (draft.expertise.subtitle.bn = v)}
                />
              </div>

              {/* Categories Accordion */}
              {Object.entries(draft.expertise.categories).map(([catKey, category]) => (
                <div key={catKey} className="p-5 rounded-2xl bg-[#111115] border border-white/10 space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-xs font-mono uppercase tracking-widest text-[#C5A880]">
                        Domain: {catKey.toUpperCase()}
                      </span>
                      <h4 className="text-base font-semibold text-white">{category.title.en}</h4>
                    </div>
                    <button
                      type="button"
                      onClick={() => {
                        category.skills.push({
                          name: { en: 'New Skill', bn: 'নতুন দক্ষতা' },
                          level: { en: 'Proficient', bn: 'দক্ষ' },
                          description: { en: 'Skill description', bn: 'দক্ষতার বিবরণ' },
                        });
                        setDraft({ ...draft });
                      }}
                      className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-[#181820] text-xs font-mono text-[#C5A880] border border-white/10 cursor-pointer"
                    >
                      <Plus className="w-3 h-3" />
                      <span>Add Skill</span>
                    </button>
                  </div>

                  <div className="space-y-3">
                    {category.skills.map((skill, sIdx) => (
                      <div
                        key={sIdx}
                        className="p-3.5 rounded-xl bg-[#0A0A0C] border border-white/10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3"
                      >
                        <div className="flex-1 grid grid-cols-1 sm:grid-cols-3 gap-2 w-full">
                          <input
                            type="text"
                            value={skill.name.en}
                            onChange={(e) => {
                              skill.name.en = e.target.value;
                              setDraft({ ...draft });
                            }}
                            placeholder="Skill (EN)"
                            className="px-2.5 py-1.5 rounded-lg bg-[#16161B] border border-white/10 text-xs text-white"
                          />
                          <input
                            type="text"
                            value={skill.name.bn}
                            onChange={(e) => {
                              skill.name.bn = e.target.value;
                              setDraft({ ...draft });
                            }}
                            placeholder="Skill (BN)"
                            className="px-2.5 py-1.5 rounded-lg bg-[#16161B] border border-white/10 text-xs text-white font-bengali"
                          />
                          <input
                            type="text"
                            value={skill.level.en}
                            onChange={(e) => {
                              skill.level.en = e.target.value;
                              setDraft({ ...draft });
                            }}
                            placeholder="Level (e.g. Production)"
                            className="px-2.5 py-1.5 rounded-lg bg-[#16161B] border border-white/10 text-xs text-[#C5A880]"
                          />
                        </div>
                        <button
                          type="button"
                          onClick={() => {
                            category.skills.splice(sIdx, 1);
                            setDraft({ ...draft });
                          }}
                          className="text-red-400 hover:text-red-300 p-1 cursor-pointer self-end sm:self-auto"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* SECTION 4: PROJECTS */}
          {activeSection === 'projects' && (
            <div className="space-y-6 max-w-4xl">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <BilingualField
                  label="Section Title"
                  value={draft.projects.title}
                  onChangeEn={(v) => (draft.projects.title.en = v)}
                  onChangeBn={(v) => (draft.projects.title.bn = v)}
                />
                <BilingualField
                  label="Section Subtitle"
                  value={draft.projects.subtitle}
                  onChangeEn={(v) => (draft.projects.subtitle.en = v)}
                  onChangeBn={(v) => (draft.projects.subtitle.bn = v)}
                />
              </div>

              <div className="flex items-center justify-between">
                <span className="text-xs font-mono uppercase tracking-widest text-[#C5A880]">
                  Project Items ({draft.projects.items.length})
                </span>
                <button
                  type="button"
                  onClick={() => {
                    draft.projects.items.push({
                      id: `proj-${Date.now()}`,
                      title: { en: 'New Project Title', bn: 'নতুন প্রজেক্ট' },
                      subtitle: { en: 'Project Subtitle', bn: 'প্রজেক্ট সাবটাইটেল' },
                      description: { en: 'Project summary description.', bn: 'প্রজেক্টের বিবরণ।' },
                      category: { en: 'Digital Media', bn: 'ডিজিটাল মিডিয়া' },
                      role: { en: 'Creator', bn: 'স্রষ্টা' },
                      status: { en: 'Active', bn: 'সক্রিয়' },
                      featured: false,
                      technologies: [{ en: 'TypeScript', bn: 'টাইপস্ক্রিপ্ট' }],
                      liveUrl: '',
                      githubUrl: '',
                    });
                    setDraft({ ...draft });
                  }}
                  className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-[#C5A880] text-[#0A0A0C] text-xs font-semibold uppercase tracking-wider cursor-pointer"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Add Project</span>
                </button>
              </div>

              {draft.projects.items.map((proj, idx) => (
                <div key={proj.id || idx} className="p-5 rounded-2xl bg-[#111115] border border-white/10 space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-mono text-[#C5A880]">#{idx + 1}</span>
                      <h4 className="font-semibold text-white">{proj.title.en}</h4>
                      {proj.featured && (
                        <span className="px-2 py-0.5 rounded-full bg-[#C5A880]/20 text-[#C5A880] text-[10px] font-mono">
                          FEATURED (VYROX)
                        </span>
                      )}
                    </div>
                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={() => {
                          proj.featured = !proj.featured;
                          setDraft({ ...draft });
                        }}
                        className={`px-3 py-1 rounded-full text-[10px] font-mono border cursor-pointer ${
                          proj.featured ? 'bg-[#C5A880] text-[#0A0A0C] border-[#C5A880]' : 'border-white/10 text-[#8F909A]'
                        }`}
                      >
                        {proj.featured ? 'Featured' : 'Make Featured'}
                      </button>
                      <button
                        type="button"
                        onClick={() => {
                          draft.projects.items.splice(idx, 1);
                          setDraft({ ...draft });
                        }}
                        className="text-red-400 hover:text-red-300 p-1 cursor-pointer"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <BilingualField
                      label="Title"
                      value={proj.title}
                      onChangeEn={(v) => (proj.title.en = v)}
                      onChangeBn={(v) => (proj.title.bn = v)}
                    />
                    <BilingualField
                      label="Category"
                      value={proj.category}
                      onChangeEn={(v) => (proj.category.en = v)}
                      onChangeBn={(v) => (proj.category.bn = v)}
                    />
                  </div>

                  <BilingualField
                    label="Description"
                    isTextarea
                    value={proj.description}
                    onChangeEn={(v) => (proj.description.en = v)}
                    onChangeBn={(v) => (proj.description.bn = v)}
                  />

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                    <input
                      type="text"
                      value={proj.role.en}
                      onChange={(e) => {
                        proj.role.en = e.target.value;
                        setDraft({ ...draft });
                      }}
                      placeholder="Role (e.g. Lead Technologist)"
                      className="px-3 py-1.5 rounded-lg bg-[#0A0A0C] border border-white/10 text-xs text-white"
                    />
                    <input
                      type="text"
                      value={proj.liveUrl || ''}
                      onChange={(e) => {
                        proj.liveUrl = e.target.value;
                        setDraft({ ...draft });
                      }}
                      placeholder="Live URL"
                      className="px-3 py-1.5 rounded-lg bg-[#0A0A0C] border border-white/10 text-xs text-white font-mono"
                    />
                    <input
                      type="text"
                      value={proj.youtubeEmbedId || ''}
                      onChange={(e) => {
                        proj.youtubeEmbedId = e.target.value;
                        setDraft({ ...draft });
                      }}
                      placeholder="YouTube Embed ID"
                      className="px-3 py-1.5 rounded-lg bg-[#0A0A0C] border border-white/10 text-xs text-[#C5A880] font-mono"
                    />
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* SECTION 5: RESEARCH */}
          {activeSection === 'research' && (
            <div className="space-y-6 max-w-4xl">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <BilingualField
                  label="Section Title"
                  value={draft.research.title}
                  onChangeEn={(v) => (draft.research.title.en = v)}
                  onChangeBn={(v) => (draft.research.title.bn = v)}
                />
                <BilingualField
                  label="Section Subtitle"
                  value={draft.research.subtitle}
                  onChangeEn={(v) => (draft.research.subtitle.en = v)}
                  onChangeBn={(v) => (draft.research.subtitle.bn = v)}
                />
              </div>

              <div className="flex items-center justify-between">
                <span className="text-xs font-mono uppercase tracking-widest text-[#C5A880]">
                  Research Inquiries ({draft.research.items.length})
                </span>
                <button
                  type="button"
                  onClick={() => {
                    draft.research.items.push({
                      id: `res-${Date.now()}`,
                      title: { en: 'New Research Topic', bn: 'নতুন গবেষণা' },
                      field: { en: 'AI & Systems', bn: 'এআই ও সিস্টেম' },
                      status: { en: 'Active Exploration', bn: 'চলমান গবেষণা' },
                      summary: { en: 'Research overview summary.', bn: 'গবেষণার সারসংক্ষেপ।' },
                      keyFindings: [{ en: 'Key observation 1', bn: 'পর্যবেক্ষণ ১' }],
                    });
                    setDraft({ ...draft });
                  }}
                  className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-[#181820] text-xs font-mono text-[#C5A880] border border-white/10 cursor-pointer"
                >
                  <Plus className="w-3 h-3" />
                  <span>Add Topic</span>
                </button>
              </div>

              {draft.research.items.map((item, idx) => (
                <div key={item.id || idx} className="p-5 rounded-2xl bg-[#111115] border border-white/10 space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-xs font-mono text-[#C5A880]">Research Item #{idx + 1}</span>
                    <button
                      type="button"
                      onClick={() => {
                        draft.research.items.splice(idx, 1);
                        setDraft({ ...draft });
                      }}
                      className="text-red-400 hover:text-red-300 p-1 cursor-pointer"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                  <BilingualField
                    label="Title"
                    value={item.title}
                    onChangeEn={(v) => (item.title.en = v)}
                    onChangeBn={(v) => (item.title.bn = v)}
                  />
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <BilingualField
                      label="Field"
                      value={item.field}
                      onChangeEn={(v) => (item.field.en = v)}
                      onChangeBn={(v) => (item.field.bn = v)}
                    />
                    <BilingualField
                      label="Status"
                      value={item.status}
                      onChangeEn={(v) => (item.status.en = v)}
                      onChangeBn={(v) => (item.status.bn = v)}
                    />
                  </div>
                  <BilingualField
                    label="Summary"
                    isTextarea
                    value={item.summary}
                    onChangeEn={(v) => (item.summary.en = v)}
                    onChangeBn={(v) => (item.summary.bn = v)}
                  />
                </div>
              ))}
            </div>
          )}

          {/* SECTION 6: WRITING */}
          {activeSection === 'writing' && (
            <div className="space-y-6 max-w-4xl">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <BilingualField
                  label="Section Title"
                  value={draft.writing.title}
                  onChangeEn={(v) => (draft.writing.title.en = v)}
                  onChangeBn={(v) => (draft.writing.title.bn = v)}
                />
                <BilingualField
                  label="Section Subtitle"
                  value={draft.writing.subtitle}
                  onChangeEn={(v) => (draft.writing.subtitle.en = v)}
                  onChangeBn={(v) => (draft.writing.subtitle.bn = v)}
                />
              </div>

              <div className="flex items-center justify-between">
                <span className="text-xs font-mono uppercase tracking-widest text-[#C5A880]">
                  Articles & Essays ({draft.writing.articles.length})
                </span>
                <button
                  type="button"
                  onClick={() => {
                    draft.writing.articles.push({
                      id: `art-${Date.now()}`,
                      title: { en: 'New Essay Title', bn: 'নতুন প্রবন্ধ' },
                      topic: { en: 'Technology', bn: 'প্রযুক্তি' },
                      readingTime: { en: '5 min read', bn: '৫ মিনিট পাঠ' },
                      platform: { en: 'Independent', bn: 'স্বাধীন' },
                      summary: { en: 'Essay summary.', bn: 'প্রবন্ধের সারসংক্ষেপ।' },
                    });
                    setDraft({ ...draft });
                  }}
                  className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-[#181820] text-xs font-mono text-[#C5A880] border border-white/10 cursor-pointer"
                >
                  <Plus className="w-3 h-3" />
                  <span>Add Article</span>
                </button>
              </div>

              {draft.writing.articles.map((art, idx) => (
                <div key={art.id || idx} className="p-5 rounded-2xl bg-[#111115] border border-white/10 space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-xs font-mono text-[#C5A880]">Essay #{idx + 1}</span>
                    <button
                      type="button"
                      onClick={() => {
                        draft.writing.articles.splice(idx, 1);
                        setDraft({ ...draft });
                      }}
                      className="text-red-400 hover:text-red-300 p-1 cursor-pointer"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                  <BilingualField
                    label="Title"
                    value={art.title}
                    onChangeEn={(v) => (art.title.en = v)}
                    onChangeBn={(v) => (art.title.bn = v)}
                  />
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <BilingualField
                      label="Topic"
                      value={art.topic}
                      onChangeEn={(v) => (art.topic.en = v)}
                      onChangeBn={(v) => (art.topic.bn = v)}
                    />
                    <BilingualField
                      label="Reading Time"
                      value={art.readingTime}
                      onChangeEn={(v) => (art.readingTime.en = v)}
                      onChangeBn={(v) => (art.readingTime.bn = v)}
                    />
                  </div>
                  <BilingualField
                    label="Summary"
                    isTextarea
                    value={art.summary}
                    onChangeEn={(v) => (art.summary.en = v)}
                    onChangeBn={(v) => (art.summary.bn = v)}
                  />
                </div>
              ))}
            </div>
          )}

          {/* SECTION 7: ACHIEVEMENTS */}
          {activeSection === 'achievements' && (
            <div className="space-y-6 max-w-4xl">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <BilingualField
                  label="Section Title"
                  value={draft.achievements.title}
                  onChangeEn={(v) => (draft.achievements.title.en = v)}
                  onChangeBn={(v) => (draft.achievements.title.bn = v)}
                />
                <BilingualField
                  label="Section Subtitle"
                  value={draft.achievements.subtitle}
                  onChangeEn={(v) => (draft.achievements.subtitle.en = v)}
                  onChangeBn={(v) => (draft.achievements.subtitle.bn = v)}
                />
              </div>

              <div className="flex items-center justify-between">
                <span className="text-xs font-mono uppercase tracking-widest text-[#C5A880]">
                  Milestones ({draft.achievements.items.length})
                </span>
                <button
                  type="button"
                  onClick={() => {
                    draft.achievements.items.push({
                      id: `ach-${Date.now()}`,
                      title: { en: 'New Milestone Title', bn: 'নতুন অর্জন' },
                      issuer: { en: 'Organization / Metric', bn: 'প্রতিষ্ঠান / মেট্রিক' },
                      description: { en: 'Milestone description.', bn: 'অর্জনের বিবরণ।' },
                      year: '2024',
                    });
                    setDraft({ ...draft });
                  }}
                  className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-[#181820] text-xs font-mono text-[#C5A880] border border-white/10 cursor-pointer"
                >
                  <Plus className="w-3 h-3" />
                  <span>Add Milestone</span>
                </button>
              </div>

              {draft.achievements.items.map((ach, idx) => (
                <div key={ach.id || idx} className="p-5 rounded-2xl bg-[#111115] border border-white/10 space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-xs font-mono text-[#C5A880]">Milestone #{idx + 1}</span>
                    <button
                      type="button"
                      onClick={() => {
                        draft.achievements.items.splice(idx, 1);
                        setDraft({ ...draft });
                      }}
                      className="text-red-400 hover:text-red-300 p-1 cursor-pointer"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                  <BilingualField
                    label="Title"
                    value={ach.title}
                    onChangeEn={(v) => (ach.title.en = v)}
                    onChangeBn={(v) => (ach.title.bn = v)}
                  />
                  <BilingualField
                    label="Issuer / Context"
                    value={ach.issuer}
                    onChangeEn={(v) => (ach.issuer.en = v)}
                    onChangeBn={(v) => (ach.issuer.bn = v)}
                  />
                  <BilingualField
                    label="Description"
                    isTextarea
                    value={ach.description}
                    onChangeEn={(v) => (ach.description.en = v)}
                    onChangeBn={(v) => (ach.description.bn = v)}
                  />
                </div>
              ))}
            </div>
          )}

          {/* SECTION 8: VISION */}
          {activeSection === 'vision' && (
            <div className="space-y-6 max-w-4xl">
              <BilingualField
                label="Section Title"
                value={draft.vision.title}
                onChangeEn={(v) => (draft.vision.title.en = v)}
                onChangeBn={(v) => (draft.vision.title.bn = v)}
              />

              <BilingualField
                label="Vision Statement"
                isTextarea
                value={draft.vision.statement}
                onChangeEn={(v) => (draft.vision.statement.en = v)}
                onChangeBn={(v) => (draft.vision.statement.bn = v)}
              />

              {draft.vision.quote && (
                <BilingualField
                  label="Subtext Quote"
                  value={draft.vision.quote}
                  onChangeEn={(v) => (draft.vision.quote!.en = v)}
                  onChangeBn={(v) => (draft.vision.quote!.bn = v)}
                />
              )}

              {/* Pillars Array */}
              <div className="space-y-3">
                <span className="text-xs font-mono uppercase tracking-widest text-[#C5A880]">
                  Core Pillars ({draft.vision.pillars.length})
                </span>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                  {draft.vision.pillars.map((pillar, idx) => (
                    <div key={idx} className="p-4 rounded-xl bg-[#111115] border border-white/10 space-y-2">
                      <span className="text-xs font-mono text-[#C5A880]">Pillar 0{idx + 1}</span>
                      <BilingualField
                        label="Title"
                        value={pillar.title}
                        onChangeEn={(v) => (pillar.title.en = v)}
                        onChangeBn={(v) => (pillar.title.bn = v)}
                      />
                      <BilingualField
                        label="Description"
                        isTextarea
                        value={pillar.description}
                        onChangeEn={(v) => (pillar.description.en = v)}
                        onChangeBn={(v) => (pillar.description.bn = v)}
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* SECTION 9: EXPERIENCE */}
          {activeSection === 'experience' && (
            <div className="space-y-6 max-w-4xl">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <BilingualField
                  label="Section Title"
                  value={draft.experience.title}
                  onChangeEn={(v) => (draft.experience.title.en = v)}
                  onChangeBn={(v) => (draft.experience.title.bn = v)}
                />
                <BilingualField
                  label="Section Subtitle"
                  value={draft.experience.subtitle}
                  onChangeEn={(v) => (draft.experience.subtitle.en = v)}
                  onChangeBn={(v) => (draft.experience.subtitle.bn = v)}
                />
              </div>

              <div className="flex items-center justify-between">
                <span className="text-xs font-mono uppercase tracking-widest text-[#C5A880]">
                  Positions ({draft.experience.items.length})
                </span>
                <button
                  type="button"
                  onClick={() => {
                    draft.experience.items.push({
                      id: `exp-${Date.now()}`,
                      role: { en: 'New Role Title', bn: 'নতুন ভূমিকা' },
                      organization: { en: 'Organization', bn: 'প্রতিষ্ঠান' },
                      period: { en: '2025 – Present', bn: '২০২৫ – বর্তমান' },
                      location: { en: 'Moulvibazar', bn: 'মৌলভীবাজার' },
                      responsibilities: [{ en: 'Core responsibility', bn: 'প্রধান দায়িত্ব' }],
                    });
                    setDraft({ ...draft });
                  }}
                  className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-[#181820] text-xs font-mono text-[#C5A880] border border-white/10 cursor-pointer"
                >
                  <Plus className="w-3 h-3" />
                  <span>Add Experience</span>
                </button>
              </div>

              {draft.experience.items.map((exp, idx) => (
                <div key={exp.id || idx} className="p-5 rounded-2xl bg-[#111115] border border-white/10 space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-xs font-mono text-[#C5A880]">Experience #{idx + 1}</span>
                    <button
                      type="button"
                      onClick={() => {
                        draft.experience.items.splice(idx, 1);
                        setDraft({ ...draft });
                      }}
                      className="text-red-400 hover:text-red-300 p-1 cursor-pointer"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <BilingualField
                      label="Role"
                      value={exp.role}
                      onChangeEn={(v) => (exp.role.en = v)}
                      onChangeBn={(v) => (exp.role.bn = v)}
                    />
                    <BilingualField
                      label="Organization"
                      value={exp.organization}
                      onChangeEn={(v) => (exp.organization.en = v)}
                      onChangeBn={(v) => (exp.organization.bn = v)}
                    />
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <BilingualField
                      label="Period"
                      value={exp.period}
                      onChangeEn={(v) => (exp.period.en = v)}
                      onChangeBn={(v) => (exp.period.bn = v)}
                    />
                    <BilingualField
                      label="Location"
                      value={exp.location}
                      onChangeEn={(v) => (exp.location.en = v)}
                      onChangeBn={(v) => (exp.location.bn = v)}
                    />
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* SECTION 10: CONTACT */}
          {activeSection === 'contact' && (
            <div className="space-y-6 max-w-4xl">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <BilingualField
                  label="Section Title"
                  value={draft.contact.title}
                  onChangeEn={(v) => (draft.contact.title.en = v)}
                  onChangeBn={(v) => (draft.contact.title.bn = v)}
                />
                <BilingualField
                  label="Section Subtitle"
                  value={draft.contact.subtitle}
                  onChangeEn={(v) => (draft.contact.subtitle.en = v)}
                  onChangeBn={(v) => (draft.contact.subtitle.bn = v)}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 rounded-2xl bg-[#111115] border border-white/10 space-y-1.5">
                  <label className="block text-xs font-mono text-[#C5A880]">Direct Email Address</label>
                  <input
                    type="email"
                    value={draft.contact.email}
                    onChange={(e) => setDraft({ ...draft, contact: { ...draft.contact, email: e.target.value } })}
                    className="w-full px-3 py-2 rounded-xl bg-[#0A0A0C] border border-white/10 text-xs font-mono text-white"
                  />
                </div>

                <div className="p-4 rounded-2xl bg-[#111115] border border-white/10 space-y-1.5">
                  <label className="block text-xs font-mono text-[#C5A880]">YouTube Channel URL</label>
                  <input
                    type="url"
                    value={draft.contact.youtubeUrl}
                    onChange={(e) => setDraft({ ...draft, contact: { ...draft.contact, youtubeUrl: e.target.value } })}
                    className="w-full px-3 py-2 rounded-xl bg-[#0A0A0C] border border-white/10 text-xs font-mono text-white"
                  />
                </div>
              </div>

              <BilingualField
                label="Response Expectation Note"
                value={draft.contact.responseExpectation}
                onChangeEn={(v) => (draft.contact.responseExpectation.en = v)}
                onChangeBn={(v) => (draft.contact.responseExpectation.bn = v)}
              />

              {/* Social Channels Array */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono uppercase tracking-widest text-[#C5A880]">
                    Social & Communication Channels ({draft.contact.socials.length})
                  </span>
                  <button
                    type="button"
                    onClick={() => {
                      draft.contact.socials.push({
                        platform: 'Platform',
                        label: { en: 'New Link', bn: 'নতুন লিংক' },
                        url: 'https://...',
                        handle: '@handle',
                      });
                      setDraft({ ...draft });
                    }}
                    className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-[#181820] text-xs font-mono text-[#C5A880] border border-white/10 cursor-pointer"
                  >
                    <Plus className="w-3 h-3" />
                    <span>Add Channel</span>
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {draft.contact.socials.map((soc, idx) => (
                    <div key={idx} className="p-4 rounded-2xl bg-[#111115] border border-white/10 space-y-2">
                      <div className="flex justify-between items-center">
                        <input
                          type="text"
                          value={soc.platform}
                          onChange={(e) => {
                            soc.platform = e.target.value;
                            setDraft({ ...draft });
                          }}
                          className="font-mono text-xs text-[#C5A880] bg-transparent border-b border-white/10 px-1 py-0.5"
                        />
                        <button
                          type="button"
                          onClick={() => {
                            draft.contact.socials.splice(idx, 1);
                            setDraft({ ...draft });
                          }}
                          className="text-red-400 hover:text-red-300 p-1 cursor-pointer"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                      <input
                        type="text"
                        value={soc.handle || ''}
                        onChange={(e) => {
                          soc.handle = e.target.value;
                          setDraft({ ...draft });
                        }}
                        placeholder="Display Handle"
                        className="w-full px-2.5 py-1.5 rounded-lg bg-[#0A0A0C] border border-white/10 text-xs text-white"
                      />
                      <input
                        type="url"
                        value={soc.url}
                        onChange={(e) => {
                          soc.url = e.target.value;
                          setDraft({ ...draft });
                        }}
                        placeholder="https://..."
                        className="w-full px-2.5 py-1.5 rounded-lg bg-[#0A0A0C] border border-white/10 text-xs text-white font-mono"
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* SECTION 11: EDUCATION */}
          {activeSection === 'education' && (
            <div className="space-y-6 max-w-4xl">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <BilingualField
                  label="Section Title"
                  value={draft.education.title}
                  onChangeEn={(v) => (draft.education.title.en = v)}
                  onChangeBn={(v) => (draft.education.title.bn = v)}
                />
                <BilingualField
                  label="Section Subtitle"
                  value={draft.education.subtitle}
                  onChangeEn={(v) => (draft.education.subtitle.en = v)}
                  onChangeBn={(v) => (draft.education.subtitle.bn = v)}
                />
              </div>

              {draft.education.items.map((edu, idx) => (
                <div key={edu.id || idx} className="p-5 rounded-2xl bg-[#111115] border border-white/10 space-y-3">
                  <span className="text-xs font-mono text-[#C5A880]">Academic Landmark #{idx + 1}</span>
                  <BilingualField
                    label="Institution Name"
                    value={edu.institution}
                    onChangeEn={(v) => (edu.institution.en = v)}
                    onChangeBn={(v) => (edu.institution.bn = v)}
                  />
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <BilingualField
                      label="Degree / Focus"
                      value={edu.degree}
                      onChangeEn={(v) => (edu.degree.en = v)}
                      onChangeBn={(v) => (edu.degree.bn = v)}
                    />
                    <BilingualField
                      label="Period"
                      value={edu.period}
                      onChangeEn={(v) => (edu.period.en = v)}
                      onChangeBn={(v) => (edu.period.bn = v)}
                    />
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* SECTION 12: LANGUAGES */}
          {activeSection === 'languages' && (
            <div className="space-y-6 max-w-4xl">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <BilingualField
                  label="Section Title"
                  value={draft.languages.title}
                  onChangeEn={(v) => (draft.languages.title.en = v)}
                  onChangeBn={(v) => (draft.languages.title.bn = v)}
                />
                <BilingualField
                  label="Section Subtitle"
                  value={draft.languages.subtitle}
                  onChangeEn={(v) => (draft.languages.subtitle.en = v)}
                  onChangeBn={(v) => (draft.languages.subtitle.bn = v)}
                />
              </div>

              <div className="space-y-3">
                <span className="text-xs font-mono uppercase tracking-widest text-[#C5A880]">Active Languages</span>
                {draft.languages.use.map((lang, idx) => (
                  <div key={idx} className="p-4 rounded-xl bg-[#111115] border border-white/10 space-y-2">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      <BilingualField
                        label="Name"
                        value={lang.name}
                        onChangeEn={(v) => (lang.name.en = v)}
                        onChangeBn={(v) => (lang.name.bn = v)}
                      />
                      <BilingualField
                        label="Proficiency"
                        value={lang.proficiency}
                        onChangeEn={(v) => (lang.proficiency.en = v)}
                        onChangeBn={(v) => (lang.proficiency.bn = v)}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* SECTION 13: SECURITY & ACCESS */}
          {activeSection === 'security' && (
            <div className="space-y-6 max-w-4xl">
              <div className="p-6 rounded-3xl bg-[#111115] border border-white/10 shadow-[0_20px_60px_rgba(0,0,0,0.9)] space-y-6">
                <div className="space-y-2">
                  <h3 className="font-display font-bold text-lg tracking-wide text-[#EAEAEA] flex items-center gap-2">
                    <Shield className="w-5 h-5 text-[#C5A880]" />
                    Local CMS Credentials
                  </h3>
                  <p className="text-[11px] font-mono text-[#8F909A] leading-relaxed">
                    Update the username and password required to access this admin panel. Since this is a zero-backend CMS, credentials are saved locally. Clearing browser data will restore the default login.
                  </p>
                </div>

                <form onSubmit={handleUpdateCredentials} className="space-y-4">
                  <div className="space-y-1.5">
                    <label className="block text-xs font-mono text-[#8F909A]">
                      New Username
                    </label>
                    <input
                      type="text"
                      required
                      value={newUsername}
                      onChange={(e) => setNewUsername(e.target.value)}
                      placeholder="e.g. admin"
                      className="w-full px-4 py-2.5 rounded-xl bg-[#0A0A0C] border border-white/10 focus:border-[#C5A880] focus:outline-none text-sm text-[#EAEAEA] placeholder:text-[#5A5B64] font-mono transition-colors"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="block text-xs font-mono text-[#8F909A]">
                      New Password
                    </label>
                    <input
                      type="password"
                      required
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                      placeholder="••••••••"
                      className="w-full px-4 py-2.5 rounded-xl bg-[#0A0A0C] border border-white/10 focus:border-[#C5A880] focus:outline-none text-sm text-[#EAEAEA] placeholder:text-[#5A5B64] font-mono transition-colors"
                    />
                  </div>

                  <div className="pt-2">
                    <button
                      type="submit"
                      disabled={!newUsername.trim() || !newPassword.trim()}
                      className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-[#C5A880] hover:bg-[#D4B48F] disabled:opacity-50 text-[#0A0A0C] text-xs font-semibold uppercase tracking-wider transition-all duration-300 shadow-[0_8px_30px_rgb(0,0,0,0.8)] active:scale-95 cursor-pointer"
                    >
                      <Save className="w-3.5 h-3.5" />
                      <span>Update Credentials</span>
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}

interface BilingualFieldProps {
  label: string;
  value: BilingualText;
  onChangeEn: (v: string) => void;
  onChangeBn: (v: string) => void;
  isTextarea?: boolean;
}

function BilingualField({ label, value, onChangeEn, onChangeBn, isTextarea }: BilingualFieldProps) {
  const [valEn, setValEn] = useState(value.en || '');
  const [valBn, setValBn] = useState(value.bn || '');

  return (
    <div className="space-y-2 p-3.5 rounded-2xl bg-[#111115] border border-white/10">
      {label && <label className="block text-xs font-mono text-[#C5A880]">{label}</label>}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <div className="space-y-1">
          <span className="text-[10px] font-mono text-[#8F909A] flex items-center justify-between">
            <span>English (EN)</span>
          </span>
          {isTextarea ? (
            <textarea
              rows={3}
              value={valEn}
              onChange={(e) => {
                setValEn(e.target.value);
                onChangeEn(e.target.value);
              }}
              className="w-full px-3 py-2 rounded-xl bg-[#0A0A0C] border border-white/10 focus:border-[#C5A880] focus:outline-none text-xs text-[#EAEAEA] placeholder:text-[#5A5B64] resize-none"
            />
          ) : (
            <input
              type="text"
              value={valEn}
              onChange={(e) => {
                setValEn(e.target.value);
                onChangeEn(e.target.value);
              }}
              className="w-full px-3 py-1.5 rounded-xl bg-[#0A0A0C] border border-white/10 focus:border-[#C5A880] focus:outline-none text-xs text-[#EAEAEA] placeholder:text-[#5A5B64]"
            />
          )}
        </div>

        <div className="space-y-1">
          <span className="text-[10px] font-mono text-[#8F909A] flex items-center justify-between">
            <span>বাংলা (BN)</span>
          </span>
          {isTextarea ? (
            <textarea
              rows={3}
              value={valBn}
              onChange={(e) => {
                setValBn(e.target.value);
                onChangeBn(e.target.value);
              }}
              className="w-full px-3 py-2 rounded-xl bg-[#0A0A0C] border border-white/10 focus:border-[#C5A880] focus:outline-none text-xs text-[#EAEAEA] placeholder:text-[#5A5B64] font-bengali resize-none"
            />
          ) : (
            <input
              type="text"
              value={valBn}
              onChange={(e) => {
                setValBn(e.target.value);
                onChangeBn(e.target.value);
              }}
              className="w-full px-3 py-1.5 rounded-xl bg-[#0A0A0C] border border-white/10 focus:border-[#C5A880] focus:outline-none text-xs text-[#EAEAEA] placeholder:text-[#5A5B64] font-bengali"
            />
          )}
        </div>
      </div>
    </div>
  );
}
