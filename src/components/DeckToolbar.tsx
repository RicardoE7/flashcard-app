import { Pencil, Plus, Shuffle, Trash2 } from "lucide-react";
import type { Deck } from "../types";
import { NeonButton } from "./NeonButton";
import { SearchInput } from "./SearchInput";

interface DeckToolbarProps {
  deck: Deck;
  search: string;
  matchCount: number;
  hasCards: boolean;
  onSearch: (value: string) => void;
  onShuffle: () => void;
  onNewCard: () => void;
  onEditDeck: () => void;
  onDeleteDeck: () => void;
}

export function DeckToolbar({
  deck,
  search,
  matchCount,
  hasCards,
  onSearch,
  onShuffle,
  onNewCard,
  onEditDeck,
  onDeleteDeck,
}: DeckToolbarProps) {
  return (
    <section aria-label="Deck controls" className="space-y-4">
      <div className="flex flex-col gap-4 xl:flex-row xl:items-end xl:justify-between">
        <div>
          <p className="text-[10px] font-bold tracking-[0.3em] text-cyan-300/70">
            ACTIVE MEMORY BANK
          </p>
          <div className="mt-1 flex flex-wrap items-center gap-3">
            <h2 className="text-2xl font-black tracking-tight text-white md:text-3xl">
              {deck.name}
            </h2>
            <button
              type="button"
              onClick={onEditDeck}
              aria-label={`Rename ${deck.name}`}
              className="text-slate-500 transition hover:text-cyan-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300"
            >
              <Pencil size={17} />
            </button>
            <button
              type="button"
              onClick={onDeleteDeck}
              aria-label={`Delete ${deck.name}`}
              className="text-slate-600 transition hover:text-fuchsia-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-fuchsia-300"
            >
              <Trash2 size={17} />
            </button>
          </div>
        </div>

        <NeonButton variant="primary" onClick={onNewCard}>
          <span className="flex items-center gap-2">
            <Plus size={16} /> NEW CARD
          </span>
        </NeonButton>
      </div>

      <div className="flex flex-col gap-2 md:flex-row">
        <SearchInput value={search} onChange={onSearch} matchCount={matchCount} />
        <NeonButton onClick={onShuffle} disabled={!hasCards}>
          <span className="flex items-center justify-center gap-2">
            <Shuffle size={16} /> SHUFFLE
          </span>
        </NeonButton>
      </div>
    </section>
  );
}
