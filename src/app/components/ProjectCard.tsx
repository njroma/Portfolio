import { motion, useMotionValue, useSpring, useTransform } from 'motion/react';
import { ArrowUpRight, Eye } from 'lucide-react';
import { useRef, useState } from 'react';

interface Project {
  id: number;
  title: string;
  description: string;
  category: string;
  imageUrl: string;
  tags?: string[];
}

interface ProjectCardProps {
  project: Project;
  index: number;
}

export function ProjectCard({ project, index }: ProjectCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [8, -8]), { stiffness: 200, damping: 20 });
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-8, 8]), { stiffness: 200, damping: 20 });
  const glowX = useTransform(mouseX, [-0.5, 0.5], ['0%', '100%']);
  const glowY = useTransform(mouseY, [-0.5, 0.5], ['0%', '100%']);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    mouseX.set((e.clientX - rect.left) / rect.width - 0.5);
    mouseY.set((e.clientY - rect.top) / rect.height - 0.5);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
    setIsHovered(false);
  };

  const num = String(index + 1).padStart(2, '0');

  return (
    <motion.div
      initial={{ opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: index * 0.12, ease: [0.25, 0.46, 0.45, 0.94] }}
      style={{ perspective: 1000 }}
    >
      <motion.div
        ref={cardRef}
        style={{ rotateX, rotateY, transformStyle: 'preserve-3d' }}
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={handleMouseLeave}
        className="group relative overflow-hidden rounded-2xl cursor-pointer"
      >
        {/* Dynamic glow follow */}
        <motion.div
          className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none z-20"
          style={{
            background: `radial-gradient(350px circle at ${glowX} ${glowY}, rgba(20,184,166,0.15), transparent 70%)`,
          }}
        />

        {/* Animated border */}
        <div className="absolute inset-0 rounded-2xl p-px z-10 pointer-events-none">
          <div className="absolute inset-0 rounded-2xl border border-teal-800/40 group-hover:border-teal-500/60 transition-colors duration-500" />
          <motion.div
            animate={isHovered ? { opacity: 1 } : { opacity: 0 }}
            className="absolute inset-0 rounded-2xl"
            style={{
              background: 'linear-gradient(135deg, rgba(20,184,166,0.6), transparent 40%, transparent 60%, rgba(6,182,212,0.4))',
              WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
              WebkitMaskComposite: 'xor',
              maskComposite: 'exclude',
              padding: '1px',
            }}
          />
        </div>

        {/* Card body */}
        <div className="relative bg-gradient-to-br from-[#0f2422] to-[#080f0e] overflow-hidden rounded-2xl">
          {/* Project number */}
          <div className="absolute top-4 left-4 z-30">
            <span className="text-5xl select-none text-teal-500/10 group-hover:text-teal-500/20 transition-all duration-500" style={{ fontVariantNumeric: 'tabular-nums' }}>
              {num}
            </span>
          </div>

          {/* Image area */}
          <div className="relative aspect-[4/3] overflow-hidden">
            <motion.img
              src={project.imageUrl}
              alt={project.title}
              className="w-full h-full object-cover"
              animate={isHovered ? { scale: 1.08 } : { scale: 1 }}
              transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
            />

            {/* Dark overlay */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"
              animate={isHovered ? { opacity: 1 } : { opacity: 0.4 }}
              transition={{ duration: 0.4 }}
            />

            {/* Hover reveal overlay */}
            <motion.div
              className="absolute inset-0 flex flex-col justify-end p-6"
              initial={false}
              animate={isHovered ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
              transition={{ duration: 0.35, ease: 'easeOut' }}
            >
              <p className="text-white/90 text-sm leading-relaxed mb-3">
                {project.description}
              </p>
              {project.tags && (
                <div className="flex flex-wrap gap-2">
                  {project.tags.map((tag) => (
                    <span key={tag} className="px-2 py-0.5 text-[10px] bg-teal-500/30 text-teal-200 rounded border border-teal-500/40 backdrop-blur-sm">
                      {tag}
                    </span>
                  ))}
                </div>
              )}
            </motion.div>

            {/* Eye icon on hover */}
            <motion.div
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
              animate={isHovered ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.6 }}
              transition={{ duration: 0.3 }}
            >
              <div className="w-14 h-14 rounded-full bg-teal-500/20 backdrop-blur-md border border-teal-400/40 flex items-center justify-center">
                <Eye className="w-6 h-6 text-teal-300" />
              </div>
            </motion.div>
          </div>

          {/* Card footer */}
          <div className="p-5 flex items-center justify-between">
            <div>
              <span className="block text-[10px] uppercase tracking-[0.2em] text-teal-400/70 mb-1">
                {project.category}
              </span>
              <h3 className="text-white group-hover:text-teal-200 transition-colors duration-300">
                {project.title}
              </h3>
            </div>

            <motion.div
              animate={isHovered ? { x: 0, y: 0, opacity: 1 } : { x: -4, y: 4, opacity: 0.4 }}
              transition={{ duration: 0.3 }}
              className="w-10 h-10 rounded-full border border-teal-600/40 group-hover:border-teal-400/70 group-hover:bg-teal-500/10 flex items-center justify-center text-teal-400 flex-shrink-0 transition-colors duration-300"
            >
              <ArrowUpRight className="w-4 h-4" />
            </motion.div>
          </div>

          {/* Bottom shine line */}
          <motion.div
            className="absolute bottom-0 left-0 h-px"
            animate={isHovered ? { width: '100%', opacity: 1 } : { width: '0%', opacity: 0 }}
            transition={{ duration: 0.5 }}
            style={{ background: 'linear-gradient(to right, transparent, rgba(20,184,166,0.8), transparent)' }}
          />
        </div>
      </motion.div>
    </motion.div>
  );
}
