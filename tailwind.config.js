/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // ===========================================
        // DARK MODE PALETTE (Original - Preserved)
        // ===========================================
        'obsidian': {
          DEFAULT: '#0A0A0F',
          50: '#1A1A24',
          100: '#15151D',
          200: '#0D0D14',
        },
        'matrix': {
          DEFAULT: '#1A1A24',
          light: '#24242E',
          dark: '#121218',
        },
        'steel': {
          DEFAULT: '#2D2D3A',
          light: '#3A3A4A',
          dark: '#1F1F28',
        },
        
        // ===========================================
        // LIGHT MODE PALETTE - "Paper & Steel" 2026
        // ===========================================
        'paper': {
          DEFAULT: '#F8FAFC',
          warm: '#FAFAF9',
          cool: '#F1F5F9',
          matte: '#F5F5F4',
        },
        'surface': {
          DEFAULT: '#FFFFFF',
          raised: '#FEFEFE',
          sunken: '#F1F5F9',
        },
        'ink': {
          DEFAULT: '#0F172A',
          body: '#1E293B',
          muted: '#475569',
          subtle: '#64748B',
        },
        'stroke': {
          DEFAULT: '#CBD5E1',
          strong: '#94A3B8',
          subtle: '#E2E8F0',
        },
        
        // ===========================================
        // ACCENT COLORS - Saturated for Light Mode
        // ===========================================
        'cobalt': {
          DEFAULT: '#0066FF',
          50: '#EFF6FF',
          100: '#DBEAFE',
          200: '#BFDBFE',
          300: '#93C5FD',
          400: '#60A5FA',
          500: '#3B82F6',
          600: '#2563EB',
          700: '#1D4ED8',
          800: '#1E40AF',
          900: '#1E3A8A',
          vivid: '#0052CC',
          electric: '#0066FF',
        },
        'emergency': {
          DEFAULT: '#DC2626',
          light: '#FEE2E2',
          medium: '#FECACA',
          vivid: '#B91C1C',
          deep: '#991B1B',
          glow: '#EF4444',
        },
        'tactical': {
          DEFAULT: '#059669',
          vivid: '#047857',
          light: '#D1FAE5',
        },
        'alert': {
          amber: '#D97706',
          'amber-vivid': '#B45309',
          'amber-light': '#FEF3C7',
          crimson: '#FF3366',
          emerald: '#00FF88',
        },
        'cyan': {
          electric: '#00D4FF',
          muted: '#00A3CC',
          dark: '#007A99',
        },
        'signal': {
          white: '#F0F0F5',
          silver: '#8888A0',
          muted: '#5A5A70',
        },
      },
      
      fontFamily: {
        'mono': ['JetBrains Mono', 'Fira Code', 'SF Mono', 'monospace'],
        'sans': ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
        'display': ['Space Grotesk', 'Inter', 'sans-serif'],
      },
      
      boxShadow: {
        'glow-cobalt': '0 0 20px rgba(0, 102, 255, 0.3)',
        'glow-cyan': '0 0 20px rgba(0, 212, 255, 0.3)',
        'glow-crimson': '0 0 20px rgba(255, 51, 102, 0.3)',
        'inner-dark': 'inset 0 2px 4px 0 rgba(0, 0, 0, 0.5)',
        'elevation-1': '0 1px 2px 0 rgba(15, 23, 42, 0.05)',
        'elevation-2': '0 1px 3px 0 rgba(15, 23, 42, 0.1), 0 1px 2px -1px rgba(15, 23, 42, 0.1)',
        'elevation-3': '0 4px 6px -1px rgba(15, 23, 42, 0.1), 0 2px 4px -2px rgba(15, 23, 42, 0.1)',
        'elevation-4': '0 10px 15px -3px rgba(15, 23, 42, 0.1), 0 4px 6px -4px rgba(15, 23, 42, 0.1)',
        'glass': '0 4px 30px rgba(0, 0, 0, 0.1)',
        'glass-strong': '0 8px 32px rgba(15, 23, 42, 0.15)',
        'card': '0 1px 3px rgba(15, 23, 42, 0.08), 0 1px 2px rgba(15, 23, 42, 0.06)',
        'card-hover': '0 4px 12px rgba(15, 23, 42, 0.15), 0 2px 4px rgba(15, 23, 42, 0.08)',
        'emergency-glow': '0 0 20px rgba(185, 28, 28, 0.4), 0 0 40px rgba(185, 28, 28, 0.2)',
        'emergency-glow-intense': '0 0 30px rgba(185, 28, 28, 0.5), 0 0 60px rgba(185, 28, 28, 0.3)',
        'cobalt-glow': '0 0 20px rgba(37, 99, 235, 0.3), 0 0 40px rgba(37, 99, 235, 0.15)',
      },
      
      animation: {
        'scan': 'scan 8s linear infinite',
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'glow': 'glow 2s ease-in-out infinite alternate',
        'glow-emergency': 'glowEmergency 1.5s ease-in-out infinite alternate',
        'grid-pulse': 'gridPulse 4s ease-in-out infinite',
        'fade-in': 'fadeIn 1s ease-out forwards',
        'slide-up': 'slideUp 0.8s ease-out forwards',
        'shimmer': 'shimmer 2s linear infinite',
      },
      
      keyframes: {
        scan: {
          '0%': { transform: 'translateY(-100vh)', opacity: '0' },
          '10%': { opacity: '1' },
          '90%': { opacity: '1' },
          '100%': { transform: 'translateY(100vh)', opacity: '0' },
        },
        glow: {
          '0%': { boxShadow: '0 0 5px rgba(0, 102, 255, 0.5), 0 0 10px rgba(0, 102, 255, 0.3)' },
          '100%': { boxShadow: '0 0 10px rgba(0, 102, 255, 0.8), 0 0 20px rgba(0, 102, 255, 0.5), 0 0 30px rgba(0, 102, 255, 0.3)' },
        },
        glowEmergency: {
          '0%': { boxShadow: '0 0 10px rgba(185, 28, 28, 0.4), 0 0 20px rgba(185, 28, 28, 0.2)' },
          '100%': { boxShadow: '0 0 20px rgba(185, 28, 28, 0.6), 0 0 40px rgba(185, 28, 28, 0.4), 0 0 60px rgba(185, 28, 28, 0.2)' },
        },
        gridPulse: {
          '0%, 100%': { opacity: '0.3' },
          '50%': { opacity: '0.6' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
      },
      
      backgroundImage: {
        'grid-pattern': 'linear-gradient(rgba(0, 102, 255, 0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(0, 102, 255, 0.1) 1px, transparent 1px)',
        'radial-glow': 'radial-gradient(ellipse at center, rgba(0, 102, 255, 0.15) 0%, transparent 70%)',
        'hero-gradient': 'linear-gradient(180deg, #0A0A0F 0%, #0D0D14 50%, #0A0A0F 100%)',
        'grid-light': 'linear-gradient(rgba(148, 163, 184, 0.2) 1px, transparent 1px), linear-gradient(90deg, rgba(148, 163, 184, 0.2) 1px, transparent 1px)',
        'paper-texture': 'linear-gradient(180deg, #F8FAFC 0%, #F1F5F9 100%)',
        'emergency-gradient': 'linear-gradient(135deg, #B91C1C 0%, #991B1B 50%, #7F1D1D 100%)',
        'shimmer': 'linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.4) 50%, transparent 100%)',
      },
      
      backgroundSize: {
        'grid': '40px 40px',
        'shimmer': '200% 100%',
      },
      
      borderRadius: {
        'sm': '2px',
        'DEFAULT': '4px',
        'md': '6px',
        'lg': '8px',
        'xl': '12px',
        '2xl': '16px',
        '3xl': '24px',
      },
      
      spacing: {
        '18': '4.5rem',
        '22': '5.5rem',
        '30': '7.5rem',
      },
    },
  },
  plugins: [],
}
