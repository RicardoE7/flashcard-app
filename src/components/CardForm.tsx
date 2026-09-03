import { useState, type FormEvent } from "react";
import type { Flashcard } from "../types";
import { NeonButton } from "./NeonButton";

interface CardFormProps {
  initialCard?: Flashcard;
  submitLabel: string;
  onSubmit: (front: string, back: string) => void;
  onCancel: () => void;
}

export function CardForm({
  initialCard,
  submitLabel,
  onSubmit,
  onCancel,
}: CardFormProps) {
  const [front, setFront] = useState(initialCard?.front ?? "");
  const [back, setBack] = useState(initialCard?.back ?? "");
  const [error, setError] = useState("");

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();

    if (!front.trim() || !back.trim()) {
      setError("Both the front and back are required.");
      return;
    }

    onSubmit(front.trim(), back.trim());
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div>
        <label
          htmlFor="card-front"
          className="mb-2 block text-xs font-bold tracking-[0.16em] text-cyan-200"
        >
          FRONT
        </label>
        <textarea
          id="card-front"
          autoFocus
          rows={4}
          value={front}
          onChange={(event) => {
            setFront(event.target.value);
            setError("");
          }}
          className="w-full resize-y border border-slate-700 bg-black/25 p-4 text-white outline-none focus:border-cyan-300 focus:ring-1 focus:ring-cyan-300"
        />
      </div>

      <div>
        <label
          htmlFor="card-back"
          className="mb-2 block text-xs font-bold tracking-[0.16em] text-lime-200"
        >
          BACK
        </label>
        <textarea
          id="card-back"
          rows={4}
          value={back}
          onChange={(event) => {
            setBack(event.target.value);
            setError("");
          }}
          className="w-full resize-y border border-slate-700 bg-black/25 p-4 text-white outline-none focus:border-lime-300 focus:ring-1 focus:ring-lime-300"
        />
      </div>

      {error && <p className="text-sm text-fuchsia-300">{error}</p>}

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
