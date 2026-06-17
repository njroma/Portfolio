import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
} from "motion/react";
import { useRef } from "react";
import {
  ArrowDown,
  Github,
  Linkedin,
  Mail,
  Dribbble,
} from "lucide-react";
import profilePhoto from "../../imports/profile_portfolio-1.png";

const PROFILE_IMAGE = profilePhoto;

function ProfileFrame() {
  const frameRef = useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const rotateX = useSpring(
    useTransform(mouseY, [-0.5, 0.5], [10, -10]),
    { stiffness: 150, damping: 20 },
  );
  const rotateY = useSpring(
    useTransform(mouseX, [-0.5, 0.5], [-10, 10]),
    { stiffness: 150, damping: 20 },
  );

  const handleMouseMove = (
    e: React.MouseEvent<HTMLDivElement>,
  ) => {
    if (!frameRef.current) return;
    const rect = frameRef.current.getBoundingClientRect();
    mouseX.set((e.clientX - rect.left) / rect.width - 0.5);
    mouseY.set((e.clientY - rect.top) / rect.height - 0.5);
  };

  return (
    <motion.div
      ref={frameRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={() => {
        mouseX.set(0);
        mouseY.set(0);
      }}
      style={{ perspective: 800 }}
      className="relative flex items-center justify-center w-72 h-72 md:w-80 md:h-80 mx-auto"
    >
      <motion.div
        style={{
          rotateX,
          rotateY,
          transformStyle: "preserve-3d",
        }}
        className="relative w-full h-full"
      >
        {/* Pulsing glow behind image */}
        <motion.div
          animate={{
            scale: [1, 1.18, 1],
            opacity: [0.35, 0.6, 0.35],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute inset-0 rounded-full bg-teal-500/25 blur-2xl"
          style={{ transform: "translateZ(-20px)" }}
        />
        <motion.div
          animate={{
            scale: [1.1, 1, 1.1],
            opacity: [0.15, 0.3, 0.15],
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1,
          }}
          className="absolute inset-[-12px] rounded-full bg-cyan-500/10 blur-2xl"
          style={{ transform: "translateZ(-24px)" }}
        />

        {/* Outer dashed rotating ring */}
        <motion.div
          animate={{ rotate: 360 }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear",
          }}
          className="absolute rounded-full pointer-events-none"
          style={{
            inset: "-32px",
            border: "1.5px dashed rgba(20,184,166,0.35)",
            transform: "translateZ(8px)",
          }}
        />

        {/* Mid dashed counter-rotating ring */}
        <motion.div
          animate={{ rotate: -360 }}
          transition={{
            duration: 14,
            repeat: Infinity,
            ease: "linear",
          }}
          className="absolute rounded-full pointer-events-none"
          style={{
            inset: "-18px",
            border: "1px dashed rgba(6,182,212,0.25)",
            transform: "translateZ(10px)",
          }}
        />

        {/* Conic gradient solid border ring */}
        <motion.div
          animate={{ rotate: 360 }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "linear",
          }}
          className="absolute rounded-full pointer-events-none"
          style={{
            inset: "-4px",
            background:
              "conic-gradient(from 0deg, rgba(20,184,166,0.9), rgba(6,182,212,0.6), rgba(59,130,246,0.3), transparent 60%, rgba(20,184,166,0.9))",
            transform: "translateZ(14px)",
            padding: "2px",
            borderRadius: "9999px",
          }}
        >
          <div className="w-full h-full rounded-full bg-[#0a1e1c]" />
        </motion.div>

        {/* Profile image */}
        <motion.div
          className="absolute inset-0 rounded-full overflow-hidden"
          style={{ transform: "translateZ(16px)" }}
          whileHover={{ scale: 1.04 }}
          transition={{
            type: "spring",
            stiffness: 300,
            damping: 22,
          }}
        >
          <img
            src={PROFILE_IMAGE}
            alt="Profile photo"
            className="w-full h-full object-cover object-center"
          />
          {/* Teal gradient wash at bottom */}
          <div className="absolute inset-0 bg-gradient-to-t from-teal-900/50 via-teal-900/10 to-transparent" />
        </motion.div>

        {/* Orbiting glowing dot 1 */}
        <motion.div
          animate={{ rotate: 360 }}
          transition={{
            duration: 9,
            repeat: Infinity,
            ease: "linear",
          }}
          className="absolute pointer-events-none"
          style={{
            inset: "-32px",
            transform: "translateZ(20px)",
          }}
        >
          <div className="absolute top-1/2 left-0 -translate-y-1/2 -translate-x-1/2 w-3.5 h-3.5 rounded-full bg-teal-400 shadow-[0_0_12px_3px_rgba(20,184,166,0.7)]" />
        </motion.div>

        {/* Orbiting glowing dot 2 */}
        <motion.div
          animate={{ rotate: -360 }}
          transition={{
            duration: 13,
            repeat: Infinity,
            ease: "linear",
          }}
          className="absolute pointer-events-none"
          style={{
            inset: "-18px",
            transform: "translateZ(18px)",
          }}
        >
          <div className="absolute top-0 right-1/4 w-2.5 h-2.5 rounded-full bg-cyan-400 shadow-[0_0_10px_2px_rgba(6,182,212,0.6)]" />
        </motion.div>

        {/* Corner bracket accents */}
        <div
          className="absolute pointer-events-none"
          style={{
            inset: "-44px",
            transform: "translateZ(22px)",
          }}
        >
          <div className="absolute top-3 left-3 w-7 h-7 border-t-2 border-l-2 border-teal-400/70 rounded-tl" />
          <div className="absolute top-3 right-3 w-7 h-7 border-t-2 border-r-2 border-teal-400/70 rounded-tr" />
          <div className="absolute bottom-3 left-3 w-7 h-7 border-b-2 border-l-2 border-teal-400/70 rounded-bl" />
          <div className="absolute bottom-3 right-3 w-7 h-7 border-b-2 border-r-2 border-teal-400/70 rounded-br" />
        </div>

        {/* Floating diamonds */}
        <motion.div
          animate={{ y: [-6, 6, -6] }}
          transition={{
            duration: 3.2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute -top-1 right-5 w-3 h-3 border border-cyan-400/70 bg-cyan-400/10 pointer-events-none"
          style={{
            transform: "translateZ(26px) rotate(45deg)",
          }}
        />
        <motion.div
          animate={{ y: [5, -5, 5] }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1,
          }}
          className="absolute -bottom-1 left-6 w-2 h-2 border border-teal-400/60 bg-teal-400/10 pointer-events-none"
          style={{
            transform: "translateZ(26px) rotate(45deg)",
          }}
        />
        <motion.div
          animate={{ y: [-4, 4, -4] }}
          transition={{
            duration: 5,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 0.5,
          }}
          className="absolute top-6 -right-1 w-2 h-2 border border-teal-300/50 pointer-events-none"
          style={{
            transform: "translateZ(26px) rotate(45deg)",
          }}
        />
      </motion.div>

      {/* Available for work badge */}
      <motion.div
        initial={{ opacity: 0, scale: 0.7, x: 10 }}
        animate={{ opacity: 1, scale: 1, x: 0 }}
        transition={{
          duration: 0.5,
          delay: 1.2,
          type: "spring",
          stiffness: 260,
          damping: 20,
        }}
        className="absolute -bottom-4 -right-2 md:right-2 z-30"
      >
        <div className="flex items-center gap-2 px-3.5 py-2 rounded-full bg-[#0a1a18]/95 border border-teal-700/60 backdrop-blur-md shadow-xl shadow-black/50">
          <motion.div
            animate={{
              scale: [1, 1.5, 1],
              opacity: [1, 0.4, 1],
            }}
            transition={{ duration: 1.8, repeat: Infinity }}
            className="w-2 h-2 rounded-full bg-emerald-400"
          />
          <span className="text-[11px] text-emerald-300 tracking-wide whitespace-nowrap">
            Available for work
          </span>
        </div>
      </motion.div>
    </motion.div>
  );
}

export function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center px-6 md:px-12 lg:px-24">
      <div className="max-w-6xl w-full">
        <div className="flex flex-col lg:flex-row items-center gap-16 lg:gap-24">
          {/* LEFT — Artistic profile frame */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{
              duration: 0.9,
              ease: [0.25, 0.46, 0.45, 0.94],
            }}
            className="flex-shrink-0"
          >
            <ProfileFrame />

            {/* Centered label below frame */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.4, duration: 0.6 }}
              className="hidden lg:flex items-center gap-3 mt-12 justify-center"
            >
              <div className="w-8 h-px bg-teal-500/40" />
              <span className="text-[10px] uppercase tracking-[0.28em] text-teal-500/60">
                Graphic Designer
              </span>
              <div className="w-8 h-px bg-teal-500/40" />
            </motion.div>
          </motion.div>

          {/* RIGHT — Text content */}
          <div className="flex-1 text-center lg:text-left">
            <motion.span
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.25 }}
              className="inline-block text-xs uppercase tracking-[0.25em] text-teal-400 mb-5 border border-teal-500/30 px-4 py-1.5 rounded-full"
            >
              Creative Portfolio
            </motion.span>

            <motion.h1
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.4 }}
              className="text-5xl md:text-7xl lg:text-8xl mb-3 bg-gradient-to-r from-teal-300 via-cyan-200 to-white bg-clip-text text-transparent"
              style={{ lineHeight: 1.05 }}
            >
              Niel FX
            </motion.h1>

            {/* Animated underline */}
            <motion.div
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{
                duration: 0.9,
                delay: 0.75,
                ease: [0.25, 0.46, 0.45, 0.94],
              }}
              className="h-px mb-6 origin-left lg:origin-left origin-center"
              style={{
                background:
                  "linear-gradient(to right, rgba(20,184,166,0.8), rgba(6,182,212,0.4), transparent)",
              }}
            />

            <motion.p
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.58 }}
              className="text-lg md:text-xl text-teal-100/80 mb-3"
            >
              Graphic Designer & Creative Director
            </motion.p>

            <motion.p
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.72 }}
              className="text-sm md:text-base text-gray-400 max-w-xl mx-auto lg:mx-0 mb-10 leading-relaxed"
            >
              Crafting visual identities, digital experiences,
              and motion stories that connect brands with their
              audiences. Based wherever creativity takes me.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.88 }}
              className="flex flex-wrap items-center justify-center lg:justify-start gap-4 mb-10"
            >
              <motion.a
                href="#projects"
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.97 }}
                className="px-7 py-3.5 bg-gradient-to-r from-teal-500 to-cyan-500 text-white rounded-full shadow-lg shadow-teal-500/30 hover:shadow-teal-500/50 transition-shadow duration-300 text-sm"
              >
                View My Work
              </motion.a>
              <motion.a
                href="#contact"
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.97 }}
                className="px-7 py-3.5 border border-teal-400/40 text-teal-300 rounded-full hover:border-teal-400/70 hover:bg-teal-400/5 transition-all duration-300 text-sm"
              >
                Get In Touch
              </motion.a>
            </motion.div>

            {/* Social links */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 1.08 }}
              className="flex items-center justify-center lg:justify-start gap-5"
            >
              {[
                {
                  icon: Dribbble,
                  label: "Dribbble",
                  href: "#",
                },
                {
                  icon: Linkedin,
                  label: "LinkedIn",
                  href: "#",
                },
                { icon: Github, label: "GitHub", href: "#" },
                { icon: Mail, label: "Email", href: "#" },
              ].map(({ icon: Icon, label, href }) => (
                <motion.a
                  key={label}
                  href={href}
                  aria-label={label}
                  whileHover={{ y: -3 }}
                  className="text-gray-500 hover:text-teal-400 transition-colors duration-300"
                >
                  <Icon className="w-5 h-5" />
                </motion.a>
              ))}
              <div className="w-px h-5 bg-teal-800/60 mx-1" />
              <span className="text-[10px] uppercase tracking-[0.2em] text-gray-600">
                Follow me
              </span>
            </motion.div>
          </div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 1.6 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        >
          <span className="text-[9px] uppercase tracking-[0.3em] text-teal-500/40">
            Scroll
          </span>
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <ArrowDown className="w-4 h-4 text-teal-500/40" />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}