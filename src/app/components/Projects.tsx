import { motion } from 'motion/react';
import { ProjectCard } from './ProjectCard';

const projectsData = [
  {
    id: 1,
    title: 'Nova Brand Identity',
    description: 'A complete visual identity for a modern tech startup — wordmark, color system, and full brand guidelines.',
    category: 'Branding',
    imageUrl: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800',
    tags: ['Logo', 'Identity', 'Guidelines'],
  },
  {
    id: 2,
    title: 'Aura Web Experience',
    description: 'Creative web design centered on immersive storytelling, bold typography, and fluid micro-interactions.',
    category: 'Web Design',
    imageUrl: 'https://images.unsplash.com/photo-1516131206008-dd041a9764fd?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800',
    tags: ['UI Design', 'Prototyping', 'Animation'],
  },
  {
    id: 3,
    title: 'Lumière Packaging',
    description: 'Minimalist packaging design for a premium skincare line — clean, tactile, and shelf-stopping.',
    category: 'Package Design',
    imageUrl: 'https://images.unsplash.com/photo-1614036634955-ae5e90f9b9eb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800',
    tags: ['Label', 'Print', 'Art Direction'],
  },
  {
    id: 4,
    title: 'Pulse App UI',
    description: 'Health & fitness app interface — intuitive navigation, data-rich dashboards, and a calming visual language.',
    category: 'UI/UX Design',
    imageUrl: 'https://images.unsplash.com/photo-1558655146-6c222b05fce4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800',
    tags: ['Mobile', 'UX Research', 'Prototyping'],
  },
  {
    id: 5,
    title: 'Vogue Editorial Spread',
    description: 'A 12-page editorial layout blending strong typography with full-bleed photography for a contemporary magazine.',
    category: 'Editorial',
    imageUrl: 'https://images.unsplash.com/photo-1658863025658-4a259cc68fc9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800',
    tags: ['Layout', 'Typography', 'Print'],
  },
  {
    id: 6,
    title: 'Orbit Motion Campaign',
    description: 'Dynamic motion graphics and loop animations for a social media launch — bold, kinetic, and brand-consistent.',
    category: 'Motion Design',
    imageUrl: 'https://images.unsplash.com/photo-1647675975434-864e1c3fc98d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800',
    tags: ['Animation', 'Social', 'After Effects'],
  },
];

export function Projects() {
  return (
    <section id="projects" className="relative py-24 px-6 md:px-12 lg:px-24">
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
                Selected Work
              </span>
              <h2 className="text-4xl md:text-5xl lg:text-6xl bg-gradient-to-r from-white via-teal-100 to-cyan-300 bg-clip-text text-transparent">
                Featured Projects
              </h2>
            </div>
            <p className="text-gray-400 max-w-xs text-sm leading-relaxed md:text-right">
              A curated selection of recent client work spanning branding, web, and motion design.
            </p>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projectsData.map((project, index) => (
            <ProjectCard key={project.id} project={project} index={index} />
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="text-center mt-14"
        >
          <a
            href="#contact"
            className="inline-flex items-center gap-3 px-8 py-4 border border-teal-500/40 text-teal-300 rounded-full hover:bg-teal-500/10 hover:border-teal-400 transition-all duration-300 text-sm uppercase tracking-widest"
          >
            View All Projects
          </a>
        </motion.div>
      </div>
    </section>
  );
}
