import { Menu, Plus } from "lucide-react";
import { motion } from "motion/react";
import { NeonButton } from "./NeonButton";

interface HeaderProps {
  deckCount: number;
  cardCount: number;
  onNewDeck: () => void;
  onOpenDecks: () => void;
}

export function Header({
  deckCount,
  cardCount,
  onNewDeck,
  onOpenDecks,
}: HeaderProps) {
  return (
    <header className="relative z-30 flex min-h-20 items-center justify-between border-b border-cyan-300/15 bg-[#050812]/80 px-4 backdrop-blur-xl md:px-6 lg:px-8">
      <div className="flex items-center gap-3">
        <button
          type="button"
          className="grid size-11 place-items-center border border-cyan-300/30 text-cyan-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300 lg:hidden"
          aria-label="Open deck navigation"
          onClick={onOpenDecks}
        >
          <Menu size={19} />
        </button>

        <div>
          <div className="flex items-center gap-2">
            <motion.span
              className="size-2 bg-lime-300 shadow-[0_0_12px_rgba(190,242,100,.9)]"
              animate={{ opacity: [0.45, 1, 0.45] }}
              transition={{ duration: 2.2, repeat: Infinity }}
            />
            <span className="text-[10px] font-bold tracking-[0.34em] text-lime-200/80">
              MEMORY SYSTEM ONLINE
            </span>
          </div>
          <h1 className="mt-1 text-xl font-black tracking-[0.18em] text-white sm:text-2xl">
            <span className="text-cyan-300">NEON</span>DEX
          </h1>
        </div>
      </div>

      <div className="flex items-center gap-3">
        <div className="hidden text-right text-xs tracking-[0.14em] text-slate-400 sm:block">
          <div>{deckCount.toString().padStart(2, "0")} DECKS</div>
          <div>{cardCount.toString().padStart(2, "0")} CARDS</div>
        </div>
        <NeonButton variant="primary" onClick={onNewDeck}>
          <span className="flex items-center gap-2">
            <Plus size={16} /> NEW DECK
          </span>
        </NeonButton>
      </div>
    </header>
  );
}
