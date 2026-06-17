import { motion, useMotionValue, useSpring, useTransform } from 'motion/react';
import { useRef, useState } from 'react';
import { Layers, Globe, Smartphone, Play, PenTool, Package } from 'lucide-react';

const services = [
  {
    icon: PenTool,
    title: 'Brand Identity',
    description: 'Logos, visual systems, and brand guidelines that leave a lasting impression and define who you are.',
    tags: ['Logo Design', 'Brand Strategy', 'Style Guides'],
    color: 'from-teal-500/20 to-teal-600/5',
    accent: 'rgba(20,184,166,0.6)',
  },
  {
    icon: Globe,
    title: 'Web Design',
    description: 'Pixel-perfect, interactive web experiences crafted for impact, usability, and visual delight.',
    tags: ['UI Design', 'Prototyping', 'Design Systems'],
    color: 'from-cyan-500/20 to-cyan-600/5',
    accent: 'rgba(6,182,212,0.6)',
  },
  {
    icon: Smartphone,
    title: 'UI / UX Design',
    description: 'Intuitive app interfaces that balance beauty with function, grounded in real user research.',
    tags: ['Wireframing', 'User Research', 'App Design'],
    color: 'from-blue-500/20 to-blue-600/5',
    accent: 'rgba(59,130,246,0.6)',
  },
  {
    icon: Play,
    title: 'Motion Design',
    description: 'Animated graphics and micro-interactions that bring your brand to life across digital platforms.',
    tags: ['Animation', 'Social Content', 'Motion Graphics'],
    color: 'from-violet-500/20 to-violet-600/5',
    accent: 'rgba(139,92,246,0.6)',
  },
  {
    icon: Package,
    title: 'Packaging Design',
    description: 'Shelf-stopping packaging that communicates quality and connects with consumers instantly.',
    tags: ['Label Design', 'Structural Design', 'Print Ready'],
    color: 'from-emerald-500/20 to-emerald-600/5',
    accent: 'rgba(16,185,129,0.6)',
  },
  {
    icon: Layers,
    title: 'Editorial Design',
    description: 'Magazines, books, and reports with typographic excellence and purposeful layout systems.',
    tags: ['Print Layout', 'Typography', 'Art Direction'],
    color: 'from-orange-500/20 to-orange-600/5',
    accent: 'rgba(249,115,22,0.6)',
  },
];

function ServiceCard({ service, index }: { service: typeof services[0]; index: number }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const glowX = useTransform(mouseX, [-0.5, 0.5], ['0%', '100%']);
  const glowY = useTransform(mouseY, [-0.5, 0.5], ['0%', '100%']);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    mouseX.set((e.clientX - rect.left) / rect.width - 0.5);
    mouseY.set((e.clientY - rect.top) / rect.height - 0.5);
  };

  const Icon = service.icon;

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
    >
      <motion.div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => { mouseX.set(0); mouseY.set(0); setIsHovered(false); }}
        whileHover={{ y: -6 }}
        transition={{ type: 'spring', stiffness: 300, damping: 25 }}
        className="group relative rounded-2xl p-7 border border-white/5 hover:border-white/15 bg-[#0a1e1c]/60 backdrop-blur-sm overflow-hidden cursor-default h-full"
      >
        {/* Mouse follow glow */}
        <motion.div
          className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
          style={{
            background: `radial-gradient(280px circle at ${glowX} ${glowY}, ${service.accent.replace('0.6', '0.08')}, transparent 70%)`,
          }}
        />

        {/* Gradient bg */}
        <div className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${service.color} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />

        <div className="relative z-10">
          {/* Icon */}
          <motion.div
            animate={isHovered ? { scale: 1.1, rotate: 5 } : { scale: 1, rotate: 0 }}
            transition={{ type: 'spring', stiffness: 300, damping: 20 }}
            className="w-12 h-12 rounded-xl flex items-center justify-center mb-5"
            style={{ background: `${service.accent.replace('0.6', '0.15')}`, border: `1px solid ${service.accent.replace('0.6', '0.3')}` }}
          >
            <Icon className="w-5 h-5" style={{ color: service.accent.replace('0.6', '0.9') }} />
          </motion.div>

          <h3 className="text-white mb-3 group-hover:text-teal-100 transition-colors duration-300">
            {service.title}
          </h3>

          <p className="text-gray-400 text-sm leading-relaxed mb-5">
            {service.description}
          </p>

          {/* Tags */}
          <div className="flex flex-wrap gap-2">
            {service.tags.map((tag) => (
              <span
                key={tag}
                className="text-[10px] px-2.5 py-1 rounded-full border border-white/10 text-gray-400 group-hover:border-white/20 group-hover:text-gray-300 transition-all duration-300"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>

        {/* Corner accent */}
        <div
          className="absolute bottom-0 right-0 w-16 h-16 rounded-tl-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
          style={{ background: `radial-gradient(circle at 100% 100%, ${service.accent.replace('0.6', '0.15')}, transparent 70%)` }}
        />
      </motion.div>
    </motion.div>
  );
}

export function Services() {
  return (
    <section className="relative py-24 px-6 md:px-12 lg:px-24">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
            <div>
              <span className="inline-block text-xs uppercase tracking-[0.25em] text-teal-400 mb-4 border border-teal-500/30 px-4 py-1.5 rounded-full">
                What I Do
              </span>
              <h2 className="text-4xl md:text-5xl lg:text-6xl bg-gradient-to-r from-white via-teal-100 to-cyan-300 bg-clip-text text-transparent">
                Services
              </h2>
            </div>
            <p className="text-gray-400 max-w-sm text-sm leading-relaxed md:text-right">
              End-to-end creative solutions — from initial concept to final delivery — tailored to make your brand unforgettable.
            </p>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {services.map((service, i) => (
            <ServiceCard key={service.title} service={service} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
