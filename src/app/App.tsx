import { Hero } from './components/Hero';
import { Projects } from './components/Projects';
import { Stats } from './components/Stats';
import { Services } from './components/Services';
import { DecorativeElements } from './components/DecorativeElements';

export default function App() {
  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-gradient-to-b from-[#1A3230] via-[#0e1e1d] to-black">
      <DecorativeElements />

      <div className="relative z-10">
        <Hero />

        {/* Divider */}
        <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-24">
          <div className="h-px bg-gradient-to-r from-transparent via-teal-800/50 to-transparent" />
        </div>

        <Stats />

        {/* Divider */}
        <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-24">
          <div className="h-px bg-gradient-to-r from-transparent via-teal-800/50 to-transparent" />
        </div>

        <Services />

        {/* Divider */}
        <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-24">
          <div className="h-px bg-gradient-to-r from-transparent via-teal-800/50 to-transparent" />
        </div>

        <Projects />
      </div>
    </div>
  );
}
