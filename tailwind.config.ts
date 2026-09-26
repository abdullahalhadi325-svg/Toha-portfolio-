import type { Config } from 'tailwindcss';

const config: Config = {
  darkMode: 'class',
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
    './app/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
    './context/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        background: '#0A0A0C',
        surface: {
          DEFAULT: '#111115',
          subtle: '#16161B',
          elevated: '#1D1D24',
          border: 'rgba(255, 255, 255, 0.07)',
        },
        foreground: {
          DEFAULT: '#EAEAEA',
          muted: '#8F909A',
          subtle: '#5A5B64',
        },
        // Sophisticated muted gold accent — cinematic, restrained, non-garish
        accent: {
          DEFAULT: '#C5A880',
          hover: '#D4B48F',
          muted: '#8E7758',
          glow: 'rgba(197, 168, 128, 0.12)',
          border: 'rgba(197, 168, 128, 0.28)',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
        bengali: ['"Noto Sans Bengali"', 'system-ui', 'sans-serif'],
        display: ['"Space Grotesk"', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
      },
      letterSpacing: {
        cinematic: '0.08em',
        widest: '0.15em',
      },
      transitionTimingFunction: {
        cinematic: 'cubic-bezier(0.16, 1, 0.3, 1)',
      },
    },
  },
  plugins: [],
};

export default config;
