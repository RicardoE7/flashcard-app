import { motion, useReducedMotion } from "motion/react";

const trails = [
  { top: "12%", left: "-18%", width: "42vw", duration: 7.5, delay: 0, color: "cyan" },
  { top: "31%", left: "-28%", width: "34vw", duration: 9.2, delay: 2.1, color: "violet" },
  { top: "58%", left: "-22%", width: "46vw", duration: 8.4, delay: 4.3, color: "lime" },
  { top: "79%", left: "-30%", width: "38vw", duration: 10.2, delay: 1.2, color: "cyan" },
];

const verticalTrails = [
  { left: "18%", top: "-24%", height: "34vh", duration: 8.8, delay: 3.4, color: "violet" },
  { left: "72%", top: "-30%", height: "42vh", duration: 10.6, delay: 0.8, color: "cyan" },
  { left: "91%", top: "-22%", height: "30vh", duration: 9.8, delay: 5.2, color: "lime" },
];

const glowClass = {
  cyan: "from-transparent via-cyan-300 to-transparent shadow-[0_0_14px_rgba(34,211,238,.9)]",
  violet: "from-transparent via-violet-400 to-transparent shadow-[0_0_14px_rgba(167,139,250,.85)]",
  lime: "from-transparent via-lime-300 to-transparent shadow-[0_0_14px_rgba(190,242,100,.8)]",
};

export function LightTrails() {
  const reduceMotion = useReducedMotion();

  if (reduceMotion) return null;

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-[2] overflow-hidden"
    >
      {/* Long horizontal data/light trails */}
      {trails.map((trail, index) => (
        <motion.div
          key={`h-${index}`}
          className="absolute h-px"
          style={{ top: trail.top, left: trail.left, width: trail.width }}
          animate={{ x: ["0vw", "145vw"], opacity: [0, 0.75, 0.75, 0] }}
          transition={{
            duration: trail.duration,
            delay: trail.delay,
            repeat: Infinity,
            repeatDelay: 1.5,
            ease: "linear",
          }}
        >
          <div
            className={`h-px w-full bg-gradient-to-r ${glowClass[trail.color as keyof typeof glowClass]}`}
          />
          <span
            className={`absolute right-0 top-1/2 size-1.5 -translate-y-1/2 rotate-45 ${
              trail.color === "cyan"
                ? "bg-cyan-200 shadow-[0_0_12px_rgba(34,211,238,1)]"
                : trail.color === "violet"
                  ? "bg-violet-300 shadow-[0_0_12px_rgba(167,139,250,1)]"
                  : "bg-lime-200 shadow-[0_0_12px_rgba(190,242,100,1)]"
            }`}
          />
        </motion.div>
      ))}

      {/* Vertical circuit pulses */}
      {verticalTrails.map((trail, index) => (
        <motion.div
          key={`v-${index}`}
          className="absolute w-px"
          style={{ left: trail.left, top: trail.top, height: trail.height }}
          animate={{ y: ["0vh", "145vh"], opacity: [0, 0.55, 0.55, 0] }}
          transition={{
            duration: trail.duration,
            delay: trail.delay,
            repeat: Infinity,
            repeatDelay: 2,
            ease: "linear",
          }}
        >
          <div
            className={`h-full w-px bg-gradient-to-b ${glowClass[trail.color as keyof typeof glowClass]}`}
          />
        </motion.div>
      ))}

      {/* Angular TRON-adjacent circuit paths */}
      <svg
        className="absolute inset-0 h-full w-full opacity-30"
        viewBox="0 0 1600 900"
        preserveAspectRatio="none"
      >
        <motion.path
          d="M -100 180 H 260 L 330 250 H 620"
          fill="none"
          stroke="rgba(34,211,238,.45)"
          strokeWidth="1"
          strokeDasharray="10 18"
          animate={{ strokeDashoffset: [0, -112] }}
          transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
        />
        <motion.path
          d="M 1120 70 H 1380 L 1460 150 H 1700"
          fill="none"
          stroke="rgba(167,139,250,.38)"
          strokeWidth="1"
          strokeDasharray="8 22"
          animate={{ strokeDashoffset: [0, -120] }}
          transition={{ duration: 6.5, repeat: Infinity, ease: "linear" }}
        />
        <motion.path
          d="M -80 710 H 240 L 315 635 H 500"
          fill="none"
          stroke="rgba(190,242,100,.28)"
          strokeWidth="1"
          strokeDasharray="7 24"
          animate={{ strokeDashoffset: [0, -124] }}
          transition={{ duration: 7.5, repeat: Infinity, ease: "linear" }}
        />
      </svg>

      {/* Occasional fast scanner streak */}
      <motion.div
        className="absolute left-0 top-0 h-full w-[18vw] -skew-x-12 bg-gradient-to-r from-transparent via-cyan-300/[0.025] to-transparent blur-xl"
        animate={{ x: ["-25vw", "130vw"] }}
        transition={{
          duration: 4.8,
          repeat: Infinity,
          repeatDelay: 6,
          ease: "easeInOut",
        }}
      />
    </div>
  );
}
