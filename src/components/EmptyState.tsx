import { Layers3, Plus, SearchX } from "lucide-react";
import { motion } from "motion/react";
import { NeonButton } from "./NeonButton";

interface EmptyStateProps {
  type: "decks" | "cards" | "search";
  onAction?: () => void;
}

export function EmptyState({ type, onAction }: EmptyStateProps) {
  const content = {
    decks: {
      icon: Layers3,
      eyebrow: "NO MEMORY BANKS",
      title: "Create your first deck",
      body: "Build a deck, load it with cards, and start a study session.",
      action: "NEW DECK",
    },
    cards: {
      icon: Plus,
      eyebrow: "EMPTY DECK",
      title: "This deck needs data",
      body: "Add a front and back to your first flashcard to begin studying.",
      action: "NEW CARD",
    },
    search: {
      icon: SearchX,
      eyebrow: "ZERO MATCHES",
      title: "No cards found",
      body: "Try a different keyword or clear the search to restore the full deck.",
      action: "",
    },
  }[type];

  const Icon = content.icon;

  return (
    <motion.section
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="grid min-h-[330px] place-items-center border border-dashed border-slate-800 bg-black/10 p-8 text-center"
    >
      <div className="max-w-md">
        <div className="mx-auto grid size-14 place-items-center border border-cyan-300/25 text-cyan-300 shadow-[0_0_30px_rgba(34,211,238,.06)]">
          <Icon size={23} />
        </div>
        <p className="mt-5 text-[10px] font-black tracking-[0.3em] text-cyan-300/70">
          {content.eyebrow}
        </p>
        <h3 className="mt-2 text-2xl font-bold text-white">{content.title}</h3>
        <p className="mt-3 leading-7 text-slate-500">{content.body}</p>
        {onAction && content.action && (
          <NeonButton variant="primary" className="mt-6" onClick={onAction}>
            {content.action}
          </NeonButton>
        )}
      </div>
    </motion.section>
  );
}
