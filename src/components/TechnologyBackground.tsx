import React, { useMemo } from 'react';
import { useTheme } from '../context/ThemeContext';

interface FloatingSymbol {
  id: number;
  label: string;
  x: number; // percentage 0 - 100
  y: number; // percentage 0 - 100
  size: string; // text size class
  duration: number; // float animation duration in seconds
  delay: number; // animation delay in seconds
  rotate: number;
}

export const TechnologyBackground: React.FC = () => {
  const { theme } = useTheme();

  // Curated list of small tech and code symbols
  const symbols = useMemo(() => {
    const rawTokens = [
      { text: '⚛ React', size: 'text-xs font-mono font-medium' },
      { text: '{ }', size: 'text-sm font-mono font-bold' },
      { text: 'TypeScript', size: 'text-xs font-mono' },
      { text: '</>', size: 'text-xs font-mono font-semibold' },
      { text: 'Node.js', size: 'text-xs font-mono' },
      { text: 'const', size: 'text-xs font-mono' },
      { text: 'Python', size: 'text-xs font-mono' },
      { text: '=>', size: 'text-sm font-mono font-bold' },
      { text: 'MongoDB', size: 'text-xs font-mono' },
      { text: 'function()', size: 'text-xs font-mono' },
      { text: 'Docker', size: 'text-xs font-mono' },
      { text: 'SQL', size: 'text-xs font-mono font-semibold' },
      { text: 'Git', size: 'text-xs font-mono' },
      { text: 'API', size: 'text-xs font-mono font-bold' },
      { text: 'AI', size: 'text-xs font-mono font-bold' },
      { text: 'HTML5', size: 'text-xs font-mono' },
      { text: 'CSS3', size: 'text-xs font-mono' },
      { text: 'async/await', size: 'text-xs font-mono' },
      { text: 'Java', size: 'text-xs font-mono' },
      { text: 'REST', size: 'text-xs font-mono' },
      { text: 'JSON', size: 'text-xs font-mono' },
      { text: 'JWT', size: 'text-xs font-mono' },
    ];

    // Distribute gracefully across a responsive grid
    const list: FloatingSymbol[] = [];
    const count = 24;

    for (let i = 0; i < count; i++) {
      const token = rawTokens[i % rawTokens.length];
      const col = (i % 6) * 16 + (Math.sin(i * 1.5) * 4 + 4);
      const row = Math.floor(i / 6) * 23 + (Math.cos(i * 2.1) * 5 + 6);

      list.push({
        id: i,
        label: token.text,
        x: Math.max(3, Math.min(94, col)),
        y: Math.max(3, Math.min(94, row)),
        size: token.size,
        duration: 12 + (i % 5) * 3, // 12s - 24s gentle period
        delay: -(i * 2.5),
        rotate: ((i * 17) % 30) - 15,
      });
    }

    return list;
  }, []);

  return (
    <div
      aria-hidden="true"
      className="fixed inset-0 pointer-events-none overflow-hidden z-0 select-none transition-colors duration-500"
    >
      {/* Subtle radial ambient gradients */}
      <div
        className={`absolute -top-32 -left-32 w-96 h-96 rounded-full blur-3xl transition-opacity duration-700 ${
          theme === 'dark'
            ? 'bg-emerald-950/20'
            : 'bg-emerald-100/40'
        }`}
      />
      <div
        className={`absolute top-1/2 -right-32 w-96 h-96 rounded-full blur-3xl transition-opacity duration-700 ${
          theme === 'dark'
            ? 'bg-indigo-950/20'
            : 'bg-indigo-100/40'
        }`}
      />
      <div
        className={`absolute -bottom-32 left-1/3 w-96 h-96 rounded-full blur-3xl transition-opacity duration-700 ${
          theme === 'dark'
            ? 'bg-cyan-950/15'
            : 'bg-cyan-100/35'
        }`}
      />

      {/* Floating subtle symbols */}
      {symbols.map(sym => (
        <span
          key={sym.id}
          style={{
            left: `${sym.x}%`,
            top: `${sym.y}%`,
            transform: `rotate(${sym.rotate}deg)`,
            animation: `gentleFloat ${sym.duration}s ease-in-out infinite alternate`,
            animationDelay: `${sym.delay}s`,
          }}
          className={`absolute tracking-wider whitespace-nowrap transition-colors duration-500 ${sym.size} ${
            theme === 'dark'
              ? 'text-slate-400/20 hover:text-emerald-400/30'
              : 'text-slate-600/15 hover:text-slate-800/25'
          }`}
        >
          {sym.label}
        </span>
      ))}

      {/* Keyframe styles for gentle floating */}
      <style>{`
        @keyframes gentleFloat {
          0% {
            transform: translateY(0px) rotate(0deg);
          }
          50% {
            transform: translateY(-16px) rotate(3deg);
          }
          100% {
            transform: translateY(8px) rotate(-3deg);
          }
        }
      `}</style>
    </div>
  );
};
