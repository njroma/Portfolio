import { motion, useMotionValue, useSpring, animate } from 'motion/react';
import { useEffect, useRef, useState } from 'react';
import { useInView } from 'motion/react';

interface StatItem {
  value: number;
  suffix: string;
  label: string;
  description: string;
}

const stats: StatItem[] = [
  { value: 120, suffix: '+', label: 'Projects Completed', description: 'Across branding, print & digital' },
  { value: 85, suffix: '+', label: 'Happy Clients', description: 'From startups to global brands' },
  { value: 7, suffix: '', label: 'Years Experience', description: 'Crafting visual stories that last' },
  { value: 14, suffix: '', label: 'Design Awards', description: 'Recognition from industry peers' },
];

function AnimatedCounter({ value, suffix }: { value: number; suffix: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });
  const [displayed, setDisplayed] = useState(0);

  useEffect(() => {
    if (!inView) return;
    const controls = animate(0, value, {
      duration: 2,
      ease: [0.25, 0.46, 0.45, 0.94],
      onUpdate: (v) => setDisplayed(Math.floor(v)),
    });
    return () => controls.stop();
  }, [inView, value]);

  return (
    <span ref={ref} className="tabular-nums">
      {displayed}{suffix}
    </span>
  );
}

export function Stats() {
  return (
    <section className="relative py-24 px-6 md:px-12 lg:px-24 overflow-hidden">
      {/* Section accent line */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-px h-16 bg-gradient-to-b from-transparent to-teal-400/40" />

      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="inline-block text-xs uppercase tracking-[0.25em] text-teal-400 mb-4 border border-teal-500/30 px-4 py-1.5 rounded-full">
            By The Numbers
          </span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl bg-gradient-to-r from-white via-teal-100 to-cyan-300 bg-clip-text text-transparent">
            Results That Speak
          </h2>
        </motion.div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              whileHover={{ y: -4 }}
              className="group relative rounded-2xl p-6 md:p-8 text-center border border-teal-800/30 hover:border-teal-600/50 bg-gradient-to-b from-teal-900/10 to-transparent transition-all duration-300 overflow-hidden cursor-default"
            >
              {/* Background glow on hover */}
              <div className="absolute inset-0 bg-gradient-to-br from-teal-500/5 to-cyan-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl" />

              {/* Top accent */}
              <motion.div
                className="absolute top-0 left-1/2 -translate-x-1/2 h-px"
                animate={{ width: ['0%', '60%', '0%'] }}
                transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut', delay: i * 0.5 }}
                style={{ background: 'linear-gradient(to right, transparent, rgba(20,184,166,0.6), transparent)' }}
              />

              <div className="relative z-10">
                <div className="text-4xl md:text-6xl mb-2 bg-gradient-to-br from-teal-300 to-cyan-400 bg-clip-text text-transparent">
                  <AnimatedCounter value={stat.value} suffix={stat.suffix} />
                </div>
                <div className="text-white mb-1.5 text-sm md:text-base">
                  {stat.label}
                </div>
                <p className="text-gray-500 text-xs leading-relaxed">
                  {stat.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
