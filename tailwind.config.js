/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Primary palette
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
        
        // Accent palette
        'cobalt': {
          DEFAULT: '#0066FF',
          50: '#E6F0FF',
          100: '#CCE0FF',
          200: '#99C2FF',
          300: '#66A3FF',
          400: '#3385FF',
          500: '#0066FF',
          600: '#0052CC',
          700: '#003D99',
          800: '#002966',
          900: '#001433',
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
        
        // Emergency palette
        'alert': {
          crimson: '#FF3366',
          amber: '#FFAA00',
          emerald: '#00FF88',
        },
      },
      
      fontFamily: {
        'mono': ['JetBrains Mono', 'Fira Code', 'monospace'],
        'sans': ['Inter', 'system-ui', 'sans-serif'],
        'display': ['Space Grotesk', 'Inter', 'sans-serif'],
      },
      
      animation: {
        'scan': 'scan 8s linear infinite',
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'glow': 'glow 2s ease-in-out infinite alternate',
        'grid-pulse': 'gridPulse 4s ease-in-out infinite',
        'fade-in': 'fadeIn 1s ease-out forwards',
        'slide-up': 'slideUp 0.8s ease-out forwards',
        'typing': 'typing 3s steps(40) infinite',
      },
      
      keyframes: {
        scan: {
          '0%': { 
            transform: 'translateY(-100vh)',
            opacity: '0',
          },
          '10%': { 
            opacity: '1',
          },
          '90%': { 
            opacity: '1',
          },
          '100%': { 
            transform: 'translateY(100vh)',
            opacity: '0',
          },
        },
        glow: {
          '0%': { 
            boxShadow: '0 0 5px rgba(0, 102, 255, 0.5), 0 0 10px rgba(0, 102, 255, 0.3)',
          },
          '100%': { 
            boxShadow: '0 0 10px rgba(0, 102, 255, 0.8), 0 0 20px rgba(0, 102, 255, 0.5), 0 0 30px rgba(0, 102, 255, 0.3)',
          },
        },
        gridPulse: {
          '0%, 100%': { 
            opacity: '0.3',
          },
          '50%': { 
            opacity: '0.6',
          },
        },
        fadeIn: {
          '0%': { 
            opacity: '0',
          },
          '100%': { 
            opacity: '1',
          },
        },
        slideUp: {
          '0%': { 
            opacity: '0',
            transform: 'translateY(20px)',
          },
          '100%': { 
            opacity: '1',
            transform: 'translateY(0)',
          },
        },
        typing: {
          '0%': { 
            width: '0',
          },
          '50%': { 
            width: '100%',
          },
          '100%': { 
            width: '0',
          },
        },
      },
      
      backgroundImage: {
        'grid-pattern': `
          linear-gradient(rgba(0, 102, 255, 0.1) 1px, transparent 1px),
          linear-gradient(90deg, rgba(0, 102, 255, 0.1) 1px, transparent 1px)
        `,
        'radial-glow': 'radial-gradient(ellipse at center, rgba(0, 102, 255, 0.15) 0%, transparent 70%)',
        'hero-gradient': 'linear-gradient(180deg, #0A0A0F 0%, #0D0D14 50%, #0A0A0F 100%)',
      },
      
      backgroundSize: {
        'grid': '40px 40px',
      },
      
      boxShadow: {
        'glow-cobalt': '0 0 20px rgba(0, 102, 255, 0.3)',
        'glow-cyan': '0 0 20px rgba(0, 212, 255, 0.3)',
        'glow-crimson': '0 0 20px rgba(255, 51, 102, 0.3)',
        'inner-dark': 'inset 0 2px 4px 0 rgba(0, 0, 0, 0.5)',
      },
      
      borderRadius: {
        'sm': '2px',
        'DEFAULT': '4px',
        'md': '6px',
        'lg': '8px',
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
