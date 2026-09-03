import { AnimatePresence, motion } from "motion/react";
import { Layers3, Plus, X } from "lucide-react";
import type { Deck, Flashcard } from "../types";

interface DeckSidebarProps {
  decks: Deck[];
  cardsByDeckId: Record<string, Flashcard[]>;
  activeDeckId: string | null;
  mobileOpen: boolean;
  onCloseMobile: () => void;
  onSelect: (deckId: string) => void;
  onNewDeck: () => void;
}

function SidebarContent({
  decks,
  cardsByDeckId,
  activeDeckId,
  onSelect,
  onNewDeck,
  onCloseMobile,
}: Omit<DeckSidebarProps, "mobileOpen">) {
  return (
    <div className="flex h-full flex-col">
      <div className="flex items-center justify-between border-b border-white/5 px-5 py-5">
        <div>
          <p className="text-[10px] font-bold tracking-[0.3em] text-violet-300">
            LIBRARY
          </p>
          <h2 className="mt-1 text-sm font-bold tracking-[0.2em] text-slate-200">
            DECKS
          </h2>
        </div>
        <button
          type="button"
          className="grid size-10 place-items-center border border-slate-700 text-slate-300 hover:border-cyan-300/50 hover:text-cyan-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300 lg:hidden"
          onClick={onCloseMobile}
          aria-label="Close deck navigation"
        >
          <X size={18} />
        </button>
      </div>

      <nav aria-label="Flashcard decks" className="flex-1 overflow-y-auto p-3">
        {decks.length === 0 ? (
          <div className="p-4 text-sm leading-6 text-slate-500">
            No decks in memory.
          </div>
        ) : (
          <ul className="space-y-2">
            {decks.map((deck) => {
              const active = deck.id === activeDeckId;
              return (
                <li key={deck.id}>
                  <button
                    type="button"
                    onClick={() => onSelect(deck.id)}
                    className={`group relative flex min-h-16 w-full items-center gap-3 overflow-hidden border px-3 text-left transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300 ${
                      active
                        ? "border-cyan-300/40 bg-cyan-300/[0.06] text-white"
                        : "border-transparent text-slate-400 hover:border-slate-700 hover:bg-white/[0.02] hover:text-slate-200"
                    }`}
                    aria-current={active ? "page" : undefined}
                  >
                    {active && (
                      <motion.span
                        layoutId="active-deck"
                        className="absolute inset-y-2 left-0 w-[2px] bg-cyan-300 shadow-[0_0_12px_rgba(34,211,238,.95)]"
                      />
                    )}
                    <Layers3
                      size={17}
                      className={active ? "text-cyan-300" : "text-slate-600"}
                    />
                    <span className="min-w-0 flex-1">
                      <span className="block truncate text-sm font-semibold">
                        {deck.name}
                      </span>
                      <span className="mt-1 block text-[10px] tracking-[0.18em] text-slate-600">
                        {(cardsByDeckId[deck.id]?.length ?? 0)
                          .toString()
                          .padStart(2, "0")}{" "}
                        CARDS
                      </span>
                    </span>
                  </button>
                </li>
              );
            })}
          </ul>
        )}
      </nav>

      <div className="border-t border-white/5 p-3">
        <button
          type="button"
          onClick={onNewDeck}
          className="flex min-h-12 w-full items-center justify-center gap-2 border border-dashed border-violet-400/30 text-xs font-bold tracking-[0.18em] text-violet-200 transition hover:border-violet-300/70 hover:bg-violet-400/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-300"
        >
          <Plus size={15} /> CREATE DECK
        </button>
      </div>
    </div>
  );
}

export function DeckSidebar(props: DeckSidebarProps) {
  return (
    <>
      <aside className="hidden w-72 shrink-0 border-r border-cyan-300/10 bg-[#070b15]/75 lg:block">
        <SidebarContent {...props} />
      </aside>

      <AnimatePresence>
        {props.mobileOpen && (
          <>
            <motion.button
              type="button"
              aria-label="Close deck navigation"
              className="fixed inset-0 z-40 bg-black/70 backdrop-blur-sm lg:hidden"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={props.onCloseMobile}
            />
            <motion.aside
              className="fixed inset-y-0 left-0 z-50 w-[min(86vw,320px)] border-r border-cyan-300/20 bg-[#070b15] shadow-[20px_0_80px_rgba(0,0,0,.5)] lg:hidden"
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "spring", stiffness: 330, damping: 34 }}
            >
              <SidebarContent {...props} />
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
