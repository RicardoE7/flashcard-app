import { AnimatePresence, motion } from "motion/react";
import { Pencil, Trash2 } from "lucide-react";
import type { Flashcard } from "../types";

interface CardManagementListProps {
  cards: Flashcard[];
  onEdit: (card: Flashcard) => void;
  onDelete: (card: Flashcard) => void;
}

export function CardManagementList({
  cards,
  onEdit,
  onDelete,
}: CardManagementListProps) {
  if (cards.length === 0) return null;

  return (
    <section className="border-t border-white/5 pt-7" aria-labelledby="manage-cards">
      <div className="mb-4 flex items-center justify-between">
        <div>
          <p className="text-[10px] font-bold tracking-[0.3em] text-violet-300/80">
            DATABASE
          </p>
          <h3 id="manage-cards" className="mt-1 font-bold text-slate-200">
            Manage Cards
          </h3>
        </div>
        <span className="font-mono text-xs text-slate-600">{cards.length} RECORDS</span>
      </div>

      <div className="grid gap-2">
        <AnimatePresence initial={false}>
          {cards.map((card, index) => (
            <motion.article
              key={card.id}
              layout
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, x: -10 }}
              className="grid gap-3 border border-slate-800/90 bg-black/15 p-4 md:grid-cols-[42px_1fr_1fr_auto] md:items-center"
            >
              <span className="font-mono text-[10px] text-cyan-300/60">
                {String(index + 1).padStart(2, "0")}
              </span>
              <p className="line-clamp-2 text-sm text-slate-200">{card.front}</p>
              <p className="line-clamp-2 text-sm text-slate-500">{card.back}</p>
              <div className="flex gap-1">
                <button
                  type="button"
                  onClick={() => onEdit(card)}
                  aria-label={`Edit card: ${card.front}`}
                  className="grid size-10 place-items-center border border-slate-800 text-slate-500 transition hover:border-cyan-300/40 hover:text-cyan-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300"
                >
                  <Pencil size={15} />
                </button>
                <button
                  type="button"
                  onClick={() => onDelete(card)}
                  aria-label={`Delete card: ${card.front}`}
                  className="grid size-10 place-items-center border border-slate-800 text-slate-600 transition hover:border-fuchsia-300/40 hover:text-fuchsia-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-fuchsia-300"
                >
                  <Trash2 size={15} />
                </button>
              </div>
            </motion.article>
          ))}
        </AnimatePresence>
      </div>
    </section>
  );
}
