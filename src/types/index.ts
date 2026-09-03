export interface Deck {
  id: string;
  name: string;
  createdAt: number;
}

export interface Flashcard {
  id: string;
  front: string;
  back: string;
  updatedAt: number;
}

export interface AppState {
  version: 1;
  decks: Deck[];
  cardsByDeckId: Record<string, Flashcard[]>;
  activeDeckId: string | null;
}

export type ModalState =
  | { type: "closed" }
  | { type: "new-deck" }
  | { type: "edit-deck"; deck: Deck }
  | { type: "delete-deck"; deck: Deck }
  | { type: "new-card"; deckId: string }
  | { type: "edit-card"; deckId: string; card: Flashcard }
  | { type: "delete-card"; deckId: string; card: Flashcard };
