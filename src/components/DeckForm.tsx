import { useState, type FormEvent } from "react";
import { NeonButton } from "./NeonButton";

interface DeckFormProps {
  initialName?: string;
  submitLabel: string;
  onSubmit: (name: string) => void;
  onCancel: () => void;
}

export function DeckForm({
  initialName = "",
  submitLabel,
  onSubmit,
  onCancel,
}: DeckFormProps) {
  const [name, setName] = useState(initialName);
  const [error, setError] = useState("");

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    const trimmed = name.trim();

    if (!trimmed) {
      setError("Deck name is required.");
      return;
    }

    onSubmit(trimmed);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div>
        <label
          htmlFor="deck-name"
          className="mb-2 block text-xs font-bold tracking-[0.16em] text-slate-300"
        >
          DECK NAME
        </label>
        <input
          id="deck-name"
          autoFocus
          value={name}
          onChange={(event) => {
            setName(event.target.value);
            setError("");
          }}
          className="min-h-12 w-full border border-slate-700 bg-black/25 px-4 text-white outline-none focus:border-cyan-300 focus:ring-1 focus:ring-cyan-300"
          aria-describedby={error ? "deck-name-error" : undefined}
        />
        {error && (
          <p id="deck-name-error" className="mt-2 text-sm text-fuchsia-300">
            {error}
          </p>
        )}
      </div>

      <div className="flex justify-end gap-2">
        <NeonButton type="button" onClick={onCancel}>
          CANCEL
        </NeonButton>
        <NeonButton type="submit" variant="primary">
          {submitLabel}
        </NeonButton>
      </div>
    </form>
  );
}
