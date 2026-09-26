/**
 * Bilingual Data Architecture for Portfolio
 * Ensures complete parity between English (en) and Bengali (bn).
 */

export interface BilingualText {
  en: string;
  bn: string;
}

export type SupportedLanguage = 'en' | 'bn';

export interface ActionLink {
  label: BilingualText;
  url: string;
  isExternal?: boolean;
}

export interface MetricItem {
  label: BilingualText;
  value: BilingualText;
}

export interface HeroSection {
  name: BilingualText;
  headline: BilingualText;
  tagline: BilingualText;
  summary: BilingualText;
  location: BilingualText;
  availability: BilingualText;
  primaryCta: ActionLink;
  secondaryCta: ActionLink;
  image_url?: string;
}

export interface CoreValue {
  title: BilingualText;
  description: BilingualText;
  icon?: string;
}

export interface QuickFact {
  label: BilingualText;
  value: BilingualText;
}

export interface AboutSection {
  title: BilingualText;
  subtitle: BilingualText;
  bioParagraphs: BilingualText[];
  philosophy: BilingualText;
  coreValues: CoreValue[];
  quickFacts: QuickFact[];
}

export interface SkillItem {
  name: BilingualText;
  level: BilingualText;
  description?: BilingualText;
  tags?: BilingualText[];
}

export interface ExpertiseCategory {
  title: BilingualText;
  description: BilingualText;
  icon: string;
  skills: SkillItem[];
}

export interface ExpertiseSection {
  title: BilingualText;
  subtitle: BilingualText;
  categories: {
    ai: ExpertiseCategory;
    digitalTech: ExpertiseCategory;
    media: ExpertiseCategory;
    cyber: ExpertiseCategory;
  };
}

export interface ProjectItem {
  id: string;
  title: BilingualText;
  subtitle: BilingualText;
  description: BilingualText;
  featured: boolean;
  category: BilingualText;
  role: BilingualText;
  status?: BilingualText;
  metrics?: MetricItem[];
  technologies: BilingualText[];
  liveUrl?: string;
  githubUrl?: string;
  demoUrl?: string;
  youtubeEmbedId?: string;
  facebookUrl?: string;
}

export interface ProjectsSection {
  title: BilingualText;
  subtitle: BilingualText;
  items: ProjectItem[];
}

export interface ResearchItem {
  id: string;
  title: BilingualText;
  field: BilingualText;
  status: BilingualText;
  summary: BilingualText;
  keyFindings?: BilingualText[];
  paperUrl?: string;
  doi?: string;
}

export interface ResearchSection {
  title: BilingualText;
  subtitle: BilingualText;
  items: ResearchItem[];
}

export interface WritingItem {
  id: string;
  title: BilingualText;
  topic: BilingualText;
  platform: BilingualText;
  summary: BilingualText;
  readingTime: BilingualText;
  url?: string;
}

export interface WritingSection {
  title: BilingualText;
  subtitle: BilingualText;
  articles: WritingItem[];
}

export interface EducationItem {
  id: string;
  degree: BilingualText;
  institution: BilingualText;
  location: BilingualText;
  period: BilingualText;
  details?: BilingualText;
}

export interface EducationSection {
  title: BilingualText;
  subtitle: BilingualText;
  items: EducationItem[];
}

export interface ExperienceItem {
  id: string;
  role: BilingualText;
  organization: BilingualText;
  location: BilingualText;
  period: BilingualText;
  responsibilities: BilingualText[];
}

export interface ExperienceSection {
  title: BilingualText;
  subtitle: BilingualText;
  items: ExperienceItem[];
}

export interface AchievementItem {
  id: string;
  title: BilingualText;
  issuer: BilingualText;
  year?: string;
  description: BilingualText;
}

export interface AchievementsSection {
  title: BilingualText;
  subtitle: BilingualText;
  items: AchievementItem[];
}

export interface VisionPillar {
  title: BilingualText;
  description: BilingualText;
}

export interface VisionSection {
  title: BilingualText;
  statement: BilingualText;
  quote?: BilingualText;
  pillars: VisionPillar[];
}

export interface ActiveLanguageSkill {
  name: BilingualText;
  proficiency: BilingualText;
  context: BilingualText;
}

export interface LearningLanguageSkill {
  name: BilingualText;
  stage: BilingualText;
  goal: BilingualText;
}

export interface LanguagesSection {
  title: BilingualText;
  subtitle: BilingualText;
  use: ActiveLanguageSkill[];
  learning: LearningLanguageSkill[];
}

export interface SocialLink {
  platform: string;
  label: BilingualText;
  url: string;
  handle?: string;
  icon?: string;
}

export interface ContactSection {
  title: BilingualText;
  subtitle: BilingualText;
  email: string;
  location: BilingualText;
  responseExpectation: BilingualText;
  youtubeUrl: string;
  socials: SocialLink[];
}

export interface PortfolioData {
  meta: {
    clientName: BilingualText;
    primaryRole: BilingualText;
    location: BilingualText;
    version: string;
  };
  navigation: {
    hero: BilingualText;
    about: BilingualText;
    expertise: BilingualText;
    projects: BilingualText;
    research: BilingualText;
    writing: BilingualText;
    education: BilingualText;
    experience: BilingualText;
    achievements: BilingualText;
    vision: BilingualText;
    languages: BilingualText;
    contact: BilingualText;
  };
  hero: HeroSection;
  about: AboutSection;
  expertise: ExpertiseSection;
  projects: ProjectsSection;
  research: ResearchSection;
  writing: WritingSection;
  education: EducationSection;
  experience: ExperienceSection;
  achievements: AchievementsSection;
  vision: VisionSection;
  languages: LanguagesSection;
  contact: ContactSection;
}
