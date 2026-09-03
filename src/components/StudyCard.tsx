import { motion, useReducedMotion } from "motion/react";
import type { Flashcard } from "../types";

interface StudyCardProps {
  card: Flashcard;
  deckName: string;
  isFlipped: boolean;
  position: number;
  total: number;
  onFlip: () => void;
}

export function StudyCard({
  card,
  deckName,
  isFlipped,
  position,
  total,
  onFlip,
}: StudyCardProps) {
  const reduceMotion = useReducedMotion();

  return (
    <div className="mx-auto w-full max-w-4xl [perspective:1400px]">
      <motion.button
        type="button"
        onClick={onFlip}
        aria-label={isFlipped ? "Show card front" : "Show card back"}
        className="group relative block min-h-[330px] w-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300 md:min-h-[390px]"
        animate={{ rotateY: reduceMotion ? 0 : isFlipped ? 180 : 0 }}
        transition={
          reduceMotion
            ? { duration: 0 }
            : { type: "spring", stiffness: 150, damping: 20, mass: 0.9 }
        }
        style={{ transformStyle: "preserve-3d" }}
      >
        <CardFace
          label="FRONT"
          text={card.front}
          deckName={deckName}
          position={position}
          total={total}
          hidden={isFlipped && !!reduceMotion}
        />
        <CardFace
          label="BACK"
          text={card.back}
          deckName={deckName}
          position={position}
          total={total}
          back
          hidden={!isFlipped && !!reduceMotion}
        />
      </motion.button>
    </div>
  );
}

interface CardFaceProps {
  label: string;
  text: string;
  deckName: string;
  position: number;
  total: number;
  back?: boolean;
  hidden?: boolean;
}

function CardFace({
  label,
  text,
  deckName,
  position,
  total,
  back = false,
  hidden = false,
}: CardFaceProps) {
  return (
    <div
      className={`absolute inset-0 overflow-hidden border bg-[#090e1a]/95 p-6 text-left shadow-[0_28px_100px_rgba(0,0,0,.35)] [backface-visibility:hidden] md:p-9 ${
        back
          ? "border-lime-300/35 [transform:rotateY(180deg)]"
          : "border-cyan-300/35"
      } ${hidden ? "invisible" : ""}`}
    >
      <span
        className={`absolute left-0 top-0 h-[2px] w-24 ${
          back
            ? "bg-lime-300 shadow-[0_0_16px_rgba(190,242,100,.9)]"
            : "bg-cyan-300 shadow-[0_0_16px_rgba(34,211,238,.9)]"
        }`}
      />
      <span className="absolute right-0 top-0 size-8 border-r border-t border-violet-400/60" />
      <span className="absolute bottom-0 left-0 size-8 border-b border-l border-violet-400/40" />

      <div className="flex items-start justify-between gap-4">
        <div>
          <p
            className={`text-[10px] font-black tracking-[0.34em] ${
              back ? "text-lime-300" : "text-cyan-300"
            }`}
          >
            {label}
          </p>
          <p className="mt-2 max-w-[34ch] truncate text-xs tracking-[0.16em] text-slate-500">
            {deckName.toUpperCase()}
          </p>
        </div>
        <p className="font-mono text-xs tracking-[0.18em] text-slate-500">
          {String(position).padStart(2, "0")} / {String(total).padStart(2, "0")}
        </p>
      </div>

      <div className="flex min-h-[220px] items-center justify-center px-2 py-8 md:min-h-[270px]">
        <p className="max-w-3xl text-center text-2xl font-semibold leading-relaxed text-slate-100 md:text-4xl md:leading-relaxed">
          {text}
        </p>
      </div>

      <div className="absolute bottom-5 right-6 text-[9px] font-bold tracking-[0.25em] text-slate-600">
        CLICK / SPACE TO FLIP
      </div>
    </div>
  );
}
