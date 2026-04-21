/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        bg: '#05080C',
        surface: '#090E16',
        card: '#0E1620',
        primary: '#00E5AA',
        'primary-dim': 'rgba(0,229,170,0.08)',
        accent: '#FF5C00',
        'accent-dim': 'rgba(255,92,0,0.08)',
        warn: '#FFD600',
        border: 'rgba(0,229,170,0.12)',
        muted: '#4A6070',
        light: '#B8D0DC',
      },
      fontFamily: {
        display: ['Syne', 'sans-serif'],
        body: ['DM Sans', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      animation: {
        'scan': 'scan 3s linear infinite',
        'pulse-ring': 'pulse-ring 2s ease-out infinite',
        'glow': 'glow 2s ease-in-out infinite alternate',
        'float': 'float 6s ease-in-out infinite',
        'marquee': 'marquee 20s linear infinite',
        'spin-slow': 'spin 8s linear infinite',
        'fade-up': 'fadeUp 0.6s ease forwards',
        'draw': 'draw 1.5s ease forwards',
      },
      keyframes: {
        scan: {
          '0%': { transform: 'translateY(-100%)' },
          '100%': { transform: 'translateY(100vh)' },
        },
        'pulse-ring': {
          '0%': { transform: 'scale(1)', opacity: '0.8' },
          '100%': { transform: 'scale(2)', opacity: '0' },
        },
        glow: {
          '0%': { textShadow: '0 0 10px rgba(0,229,170,0.3)' },
          '100%': { textShadow: '0 0 30px rgba(0,229,170,0.8), 0 0 60px rgba(0,229,170,0.3)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-12px)' },
        },
        marquee: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        fadeUp: {
          '0%': { opacity: '0', transform: 'translateY(24px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        draw: {
          '0%': { strokeDashoffset: '1000' },
          '100%': { strokeDashoffset: '0' },
        },
      },
    },
  },
  plugins: [],
}
