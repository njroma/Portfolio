import { motion } from 'motion/react';

function ConstellationDots() {
  const dots = [
    { x: '15%', y: '20%' }, { x: '25%', y: '35%' }, { x: '18%', y: '50%' },
    { x: '72%', y: '15%' }, { x: '82%', y: '28%' }, { x: '68%', y: '40%' },
    { x: '88%', y: '55%' }, { x: '55%', y: '65%' }, { x: '35%', y: '75%' },
    { x: '45%', y: '88%' }, { x: '10%', y: '78%' }, { x: '90%', y: '80%' },
  ];
  const lines = [
    { x1: '15%', y1: '20%', x2: '25%', y2: '35%' },
    { x1: '25%', y1: '35%', x2: '18%', y2: '50%' },
    { x1: '72%', y1: '15%', x2: '82%', y2: '28%' },
    { x1: '82%', y1: '28%', x2: '68%', y2: '40%' },
    { x1: '68%', y1: '40%', x2: '88%', y2: '55%' },
    { x1: '55%', y1: '65%', x2: '45%', y2: '88%' },
  ];

  return (
    <svg className="absolute inset-0 w-full h-full pointer-events-none" style={{ zIndex: 0 }}>
      {lines.map((line, i) => (
        <motion.line
          key={i}
          x1={line.x1} y1={line.y1} x2={line.x2} y2={line.y2}
          stroke="rgba(20,184,166,0.15)"
          strokeWidth="1"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 1 }}
          transition={{ duration: 2, delay: i * 0.3, ease: 'easeInOut' }}
        />
      ))}
      {dots.map((dot, i) => (
        <motion.circle
          key={i}
          cx={dot.x} cy={dot.y} r="2"
          fill="rgba(20,184,166,0.5)"
          animate={{ opacity: [0.3, 0.8, 0.3], r: [1.5, 2.5, 1.5] }}
          transition={{ duration: 3 + i * 0.4, repeat: Infinity, ease: 'easeInOut', delay: i * 0.2 }}
        />
      ))}
    </svg>
  );
}

function HexGrid() {
  const hexPath = 'M 0 -22 L 19 -11 L 19 11 L 0 22 L -19 11 L -19 -11 Z';
  const hexes = [
    { x: 80, y: 120, opacity: 0.12 },
    { x: 160, y: 80, opacity: 0.07 },
    { x: 120, y: 180, opacity: 0.09 },
    { x: 1200, y: 200, opacity: 0.1 },
    { x: 1280, y: 150, opacity: 0.06 },
    { x: 1150, y: 280, opacity: 0.08 },
    { x: 600, y: 900, opacity: 0.07 },
    { x: 700, y: 950, opacity: 0.05 },
  ];

  return (
    <svg className="absolute inset-0 w-full h-full pointer-events-none" style={{ zIndex: 0 }}>
      {hexes.map((hex, i) => (
        <motion.path
          key={i}
          d={hexPath}
          transform={`translate(${hex.x}, ${hex.y})`}
          fill="none"
          stroke={`rgba(20,184,166,${hex.opacity})`}
          strokeWidth="1.5"
          animate={{ rotate: [0, 360] }}
          transition={{ duration: 40 + i * 5, repeat: Infinity, ease: 'linear' }}
          style={{ transformOrigin: `${hex.x}px ${hex.y}px` }}
        />
      ))}
    </svg>
  );
}

function ScatteredRings() {
  const rings = [
    { size: 300, x: '5%', y: '60%', color: 'rgba(6,182,212,0.06)' },
    { size: 200, x: '85%', y: '30%', color: 'rgba(20,184,166,0.07)' },
    { size: 120, x: '50%', y: '80%', color: 'rgba(59,130,246,0.06)' },
    { size: 80, x: '30%', y: '15%', color: 'rgba(20,184,166,0.1)' },
    { size: 400, x: '70%', y: '70%', color: 'rgba(6,182,212,0.04)' },
  ];

  return (
    <>
      {rings.map((ring, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full pointer-events-none"
          style={{
            width: ring.size,
            height: ring.size,
            left: ring.x,
            top: ring.y,
            border: `1px solid ${ring.color}`,
            transform: 'translate(-50%, -50%)',
          }}
          animate={{ scale: [1, 1.1, 1], opacity: [0.6, 1, 0.6] }}
          transition={{ duration: 6 + i * 1.5, repeat: Infinity, ease: 'easeInOut', delay: i * 0.8 }}
        />
      ))}
    </>
  );
}

function FloatingParticles() {
  const particles = Array.from({ length: 18 }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    size: Math.random() * 3 + 1,
    duration: Math.random() * 10 + 8,
    delay: Math.random() * 5,
    opacity: Math.random() * 0.4 + 0.1,
  }));

  return (
    <>
      {particles.map((p) => (
        <motion.div
          key={p.id}
          className="absolute rounded-full bg-teal-400 pointer-events-none"
          style={{
            left: `${p.x}%`,
            bottom: -10,
            width: p.size,
            height: p.size,
            opacity: p.opacity,
          }}
          animate={{
            y: [0, -(400 + Math.random() * 400)],
            x: [0, (Math.random() - 0.5) * 60],
            opacity: [0, p.opacity, 0],
          }}
          transition={{
            duration: p.duration,
            repeat: Infinity,
            delay: p.delay,
            ease: 'easeOut',
          }}
        />
      ))}
    </>
  );
}

export function DecorativeElements() {
  return (
    <>
      {/* Grid pattern overlay */}
      <div
        className="absolute inset-0 opacity-[0.035] pointer-events-none"
        style={{
          backgroundImage: `
            linear-gradient(to right, #14b8a6 1px, transparent 1px),
            linear-gradient(to bottom, #14b8a6 1px, transparent 1px)
          `,
          backgroundSize: '60px 60px',
        }}
      />

      {/* Dot grid accent */}
      <div
        className="absolute inset-0 opacity-[0.06] pointer-events-none"
        style={{
          backgroundImage: 'radial-gradient(circle, #14b8a6 1px, transparent 1px)',
          backgroundSize: '30px 30px',
          backgroundPosition: '15px 15px',
        }}
      />

      {/* Main animated orbs */}
      <motion.div
        animate={{ scale: [1, 1.2, 1], opacity: [0.25, 0.45, 0.25] }}
        transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute -top-20 -left-20 w-[500px] h-[500px] bg-teal-500/15 rounded-full blur-3xl pointer-events-none"
      />
      <motion.div
        animate={{ scale: [1, 1.3, 1], opacity: [0.15, 0.3, 0.15] }}
        transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
        className="absolute top-1/4 -right-20 w-[600px] h-[600px] bg-cyan-500/10 rounded-full blur-3xl pointer-events-none"
      />
      <motion.div
        animate={{ scale: [1, 1.15, 1], opacity: [0.2, 0.35, 0.2] }}
        transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
        className="absolute bottom-0 left-1/3 w-[450px] h-[450px] bg-blue-600/10 rounded-full blur-3xl pointer-events-none"
      />
      <motion.div
        animate={{ scale: [1, 1.2, 1], opacity: [0.1, 0.25, 0.1] }}
        transition={{ duration: 14, repeat: Infinity, ease: 'easeInOut', delay: 3 }}
        className="absolute top-2/3 left-1/4 w-[350px] h-[350px] bg-teal-400/10 rounded-full blur-3xl pointer-events-none"
      />

      {/* Constellation SVG layer */}
      <ConstellationDots />

      {/* Hex grid shapes */}
      <HexGrid />

      {/* Scattered rings */}
      <ScatteredRings />

      {/* Floating particles */}
      <FloatingParticles />

      {/* Rotating geometric shapes */}
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 25, repeat: Infinity, ease: 'linear' }}
        className="absolute top-24 right-16 w-20 h-20 border border-teal-500/25 pointer-events-none"
        style={{ clipPath: 'polygon(50% 0%, 100% 100%, 0% 100%)' }}
      />
      <div className="absolute top-20 right-10 w-16 h-16 border border-teal-500/20 rotate-45 pointer-events-none" />
      <motion.div
        animate={{ rotate: -360 }}
        transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
        className="absolute top-1/3 left-12 w-14 h-14 border border-cyan-500/20 pointer-events-none"
      />
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
        className="absolute bottom-40 right-1/4 w-20 h-20 border border-teal-400/15 pointer-events-none"
        style={{ clipPath: 'polygon(25% 0%, 75% 0%, 100% 50%, 75% 100%, 25% 100%, 0% 50%)' }}
      />
      <div className="absolute bottom-60 right-20 w-10 h-10 border border-cyan-400/20 rounded-full pointer-events-none" />

      {/* Floating vertical lines */}
      <motion.div
        animate={{ y: [0, -30, 0], opacity: [0.15, 0.4, 0.15] }}
        transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute top-1/4 right-1/4 w-px h-36 bg-gradient-to-b from-transparent via-teal-400 to-transparent pointer-events-none"
      />
      <motion.div
        animate={{ y: [0, 30, 0], opacity: [0.15, 0.35, 0.15] }}
        transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
        className="absolute bottom-1/3 left-1/4 w-px h-44 bg-gradient-to-b from-transparent via-cyan-400 to-transparent pointer-events-none"
      />
      <motion.div
        animate={{ y: [0, -20, 0], opacity: [0.1, 0.3, 0.1] }}
        transition={{ duration: 9, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
        className="absolute top-2/3 right-1/3 w-px h-28 bg-gradient-to-b from-transparent via-blue-400 to-transparent pointer-events-none"
      />

      {/* Horizontal scan line */}
      <motion.div
        animate={{ x: ['-100%', '200%'] }}
        transition={{ duration: 8, repeat: Infinity, ease: 'linear', repeatDelay: 4 }}
        className="absolute top-1/3 left-0 w-40 h-px pointer-events-none"
        style={{ background: 'linear-gradient(to right, transparent, rgba(20,184,166,0.5), transparent)' }}
      />

      {/* Orbiting dots */}
      <div className="absolute top-1/2 left-1/3 pointer-events-none">
        <div className="flex gap-2">
          <div className="w-1.5 h-1.5 rounded-full bg-teal-400/40" />
          <div className="w-1.5 h-1.5 rounded-full bg-teal-400/25" />
          <div className="w-1.5 h-1.5 rounded-full bg-teal-400/15" />
        </div>
      </div>

      {/* Corner accent marks */}
      <div className="absolute top-8 left-8 w-8 h-8 border-t border-l border-teal-500/30 pointer-events-none" />
      <div className="absolute top-8 right-8 w-8 h-8 border-t border-r border-teal-500/30 pointer-events-none" />

      {/* Moving glow dots */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          animate={{ x: ['-5%', '105%'] }}
          transition={{ duration: 15, repeat: Infinity, ease: 'linear' }}
          className="absolute top-1/4 w-1.5 h-1.5 bg-teal-400 rounded-full shadow-lg shadow-teal-400/60"
        />
        <motion.div
          animate={{ x: ['105%', '-5%'] }}
          transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
          className="absolute top-2/3 w-1 h-1 bg-cyan-400 rounded-full shadow-lg shadow-cyan-400/60"
        />
        <motion.div
          animate={{ x: ['-5%', '105%'] }}
          transition={{ duration: 25, repeat: Infinity, ease: 'linear', delay: 5 }}
          className="absolute top-3/4 w-1 h-1 bg-blue-400 rounded-full shadow-lg shadow-blue-400/60"
        />
      </div>
    </>
  );
}
