import type { AppState } from "../types";

const STORAGE_KEY = "neon-flashcards-state";
const VERSION = 1 as const;

const starterState: AppState = {
  version: VERSION,
  activeDeckId: "starter-web",
  decks: [
    {
      id: "starter-web",
      name: "Web Fundamentals",
      createdAt: Date.now(),
    },
  ],
  cardsByDeckId: {
    "starter-web": [
      {
        id: "starter-card-1",
        front: "What does semantic HTML describe?",
        back: "The meaning and structure of content, not merely its visual appearance.",
        updatedAt: Date.now(),
      },
      {
        id: "starter-card-2",
        front: "What does LocalStorage provide?",
        back: "Persistent browser key/value storage that remains after the page is refreshed or reopened.",
        updatedAt: Date.now(),
      },
      {
        id: "starter-card-3",
        front: "Why use stable IDs instead of array indexes?",
        back: "Stable IDs keep item identity reliable when lists are reordered, filtered, inserted into, or deleted from.",
        updatedAt: Date.now(),
      },
    ],
  },
};

function isValidState(value: unknown): value is AppState {
  if (!value || typeof value !== "object") return false;
  const state = value as Partial<AppState>;

  return (
    state.version === VERSION &&
    Array.isArray(state.decks) &&
    !!state.cardsByDeckId &&
    typeof state.cardsByDeckId === "object" &&
    (typeof state.activeDeckId === "string" || state.activeDeckId === null)
  );
}

export function loadState(): AppState {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);

    if (saved === null) {
      return structuredClone(starterState);
    }

    const parsed: unknown = JSON.parse(saved);
    return isValidState(parsed)
      ? parsed
      : { version: VERSION, decks: [], cardsByDeckId: {}, activeDeckId: null };
  } catch {
    return { version: VERSION, decks: [], cardsByDeckId: {}, activeDeckId: null };
  }
}

export function saveState(state: AppState): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch (error) {
    console.error("Unable to save flashcard state.", error);
  }
}
