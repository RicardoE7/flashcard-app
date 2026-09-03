import { Search, X } from "lucide-react";

interface SearchInputProps {
  value: string;
  onChange: (value: string) => void;
  matchCount: number;
}

export function SearchInput({ value, onChange, matchCount }: SearchInputProps) {
  return (
    <div className="relative min-w-0 flex-1">
      <Search
        size={16}
        className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-cyan-300/70"
      />
      <label htmlFor="card-search" className="sr-only">
        Search cards
      </label>
      <input
        id="card-search"
        type="search"
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder="SEARCH MEMORY..."
        className="h-11 w-full border border-slate-700/80 bg-black/20 pl-10 pr-20 text-sm text-white outline-none transition placeholder:text-slate-600 focus:border-cyan-300/70 focus:shadow-[0_0_18px_rgba(34,211,238,.08)]"
      />
      <div className="absolute right-3 top-1/2 flex -translate-y-1/2 items-center gap-2">
        <span className="text-[10px] font-bold tracking-wider text-slate-500">
          {matchCount}
        </span>
        {value && (
          <button
            type="button"
            onClick={() => onChange("")}
            className="text-slate-500 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300"
            aria-label="Clear search"
          >
            <X size={14} />
          </button>
        )}
      </div>
    </div>
  );
}
