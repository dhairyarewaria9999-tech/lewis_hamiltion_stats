/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        lh: {
          void: '#050507',
          dark: '#0A0B0E',
          card: '#12141A',
          cardHover: '#181A22',
          border: '#232634',
          yellow: '#CCFF00', // Lewis signature fluo yellow
          purple: '#9945FF', // Lewis signature amethyst
          purpleLight: '#B778FF',
          red: '#FF1801',    // Ferrari Rosso Corsa
          cyan: '#00D2BE',   // Mercedes Petronas heritage
          muted: '#8A90A2',
          light: '#F3F4F6'
        }
      },
      fontFamily: {
        mono: ['"JetBrains Mono"', 'Menlo', 'monospace'],
        display: ['"Cabinet Grotesk"', '"Syne"', 'Impact', 'sans-serif'],
        sans: ['"Inter"', 'system-ui', 'sans-serif'],
      },
      animation: {
        'pulse-glow': 'pulseGlow 2.5s infinite ease-in-out',
        'marquee': 'marquee 25s linear infinite',
        'radar': 'radarSweep 4s linear infinite',
        'flicker': 'flicker 0.15s ease-in-out',
      },
      keyframes: {
        pulseGlow: {
          '0%, 100%': { opacity: '0.4', transform: 'scale(1)' },
          '50%': { opacity: '0.8', transform: 'scale(1.05)' },
        },
        marquee: {
          '0%': { transform: 'translateX(0%)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        radarSweep: {
          '0%': { transform: 'rotate(0deg)' },
          '100%': { transform: 'rotate(360deg)' },
        }
      },
      backgroundImage: {
        'carbon-pattern': "radial-gradient(#232634 1px, transparent 1px)",
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
      }
    },
  },
  plugins: [],
}
