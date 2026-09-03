import { useCallback, useEffect, useMemo, useState } from "react";
import { motion, useReducedMotion } from "motion/react";
import type { AppState, Flashcard, ModalState } from "./types";
import { loadState, saveState } from "./utils/storage";
import { createId } from "./utils/ids";
import { fisherYates } from "./utils/shuffle";
import { useKeyboardShortcuts } from "./hooks/useKeyboardShortcuts";
import { Header } from "./components/Header";
import { DeckSidebar } from "./components/DeckSidebar";
import { DeckToolbar } from "./components/DeckToolbar";
import { StudyCard } from "./components/StudyCard";
import { StudyControls } from "./components/StudyControls";
import { CardManagementList } from "./components/CardManagementList";
import { EmptyState } from "./components/EmptyState";
import { Modal } from "./components/Modal";
import { DeckForm } from "./components/DeckForm";
import { CardForm } from "./components/CardForm";
import { ConfirmDelete } from "./components/ConfirmDelete";
import { LightTrails } from "./components/LightTrails";

export default function App() {
  const [state, setState] = useState<AppState>(() => loadState());
  const [modal, setModal] = useState<ModalState>({ type: "closed" });
  const [search, setSearch] = useState("");
  const [studyOrder, setStudyOrder] = useState<string[]>([]);
  const [studyIndex, setStudyIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [mobileDecksOpen, setMobileDecksOpen] = useState(false);
  const [announcement, setAnnouncement] = useState("");
  const reduceMotion = useReducedMotion();

  useEffect(() => saveState(state), [state]);

  const activeDeck =
    state.decks.find((deck) => deck.id === state.activeDeckId) ?? null;
  const activeCards = activeDeck
    ? state.cardsByDeckId[activeDeck.id] ?? []
    : [];

  const filteredCards = useMemo(() => {
    const query = search.trim().toLowerCase();
    if (!query) return activeCards;

    return activeCards.filter(
      (card) =>
        card.front.toLowerCase().includes(query) ||
        card.back.toLowerCase().includes(query),
    );
  }, [activeCards, search]);

  useEffect(() => {
    setSearch("");
    setStudyOrder(activeCards.map((card) => card.id));
    setStudyIndex(0);
    setIsFlipped(false);
  }, [state.activeDeckId]);

  useEffect(() => {
    const validIds = new Set(filteredCards.map((card) => card.id));
    setStudyOrder((current) => {
      const kept = current.filter((id) => validIds.has(id));
      const missing = filteredCards
        .map((card) => card.id)
        .filter((id) => !kept.includes(id));
      return [...kept, ...missing];
    });
    setStudyIndex(0);
    setIsFlipped(false);
  }, [filteredCards]);

  const studyCards = useMemo(() => {
    const byId = new Map(filteredCards.map((card) => [card.id, card]));
    return studyOrder
      .map((id) => byId.get(id))
      .filter((card): card is Flashcard => Boolean(card));
  }, [filteredCards, studyOrder]);

  const currentCard = studyCards[studyIndex] ?? null;

  const flip = useCallback(() => {
    if (currentCard) setIsFlipped((value) => !value);
  }, [currentCard]);

  const previous = useCallback(() => {
    if (studyCards.length === 0) return;
    setStudyIndex((index) => (index - 1 + studyCards.length) % studyCards.length);
    setIsFlipped(false);
  }, [studyCards.length]);

  const next = useCallback(() => {
    if (studyCards.length === 0) return;
    setStudyIndex((index) => (index + 1) % studyCards.length);
    setIsFlipped(false);
  }, [studyCards.length]);

  useKeyboardShortcuts({
    enabled: modal.type === "closed" && !mobileDecksOpen,
    onFlip: flip,
    onPrevious: previous,
    onNext: next,
  });

  const totalCardCount = Object.values(state.cardsByDeckId).reduce(
    (sum, cards) => sum + cards.length,
    0,
  );

  const closeModal = useCallback(() => setModal({ type: "closed" }), []);

  const createDeck = (name: string) => {
    const id = createId();
    const deck = { id, name, createdAt: Date.now() };

    setState((current) => ({
      ...current,
      decks: [...current.decks, deck],
      cardsByDeckId: { ...current.cardsByDeckId, [id]: [] },
      activeDeckId: id,
    }));
    setAnnouncement(`${name} created.`);
    closeModal();
  };

  const renameDeck = (deckId: string, name: string) => {
    setState((current) => ({
      ...current,
      decks: current.decks.map((deck) =>
        deck.id === deckId ? { ...deck, name } : deck,
      ),
    }));
    setAnnouncement(`Deck renamed to ${name}.`);
    closeModal();
  };

  const deleteDeck = (deckId: string) => {
    setState((current) => {
      const remaining = current.decks.filter((deck) => deck.id !== deckId);
      const nextCards = { ...current.cardsByDeckId };
      delete nextCards[deckId];

      return {
        ...current,
        decks: remaining,
        cardsByDeckId: nextCards,
        activeDeckId:
          current.activeDeckId === deckId
            ? remaining[0]?.id ?? null
            : current.activeDeckId,
      };
    });
    setAnnouncement("Deck deleted.");
    closeModal();
  };

  const createCard = (deckId: string, front: string, back: string) => {
    const card: Flashcard = {
      id: createId(),
      front,
      back,
      updatedAt: Date.now(),
    };

    setState((current) => ({
      ...current,
      cardsByDeckId: {
        ...current.cardsByDeckId,
        [deckId]: [...(current.cardsByDeckId[deckId] ?? []), card],
      },
    }));
    setAnnouncement("Card created.");
    closeModal();
  };

  const editCard = (
    deckId: string,
    cardId: string,
    front: string,
    back: string,
  ) => {
    setState((current) => ({
      ...current,
      cardsByDeckId: {
        ...current.cardsByDeckId,
        [deckId]: (current.cardsByDeckId[deckId] ?? []).map((card) =>
          card.id === cardId
            ? { ...card, front, back, updatedAt: Date.now() }
            : card,
        ),
      },
    }));
    setIsFlipped(false);
    setAnnouncement("Card updated.");
    closeModal();
  };

  const deleteCard = (deckId: string, cardId: string) => {
    setState((current) => ({
      ...current,
      cardsByDeckId: {
        ...current.cardsByDeckId,
        [deckId]: (current.cardsByDeckId[deckId] ?? []).filter(
          (card) => card.id !== cardId,
        ),
      },
    }));
    setStudyIndex(0);
    setIsFlipped(false);
    setAnnouncement("Card deleted.");
    closeModal();
  };

  const shuffle = () => {
    setStudyOrder(fisherYates(filteredCards.map((card) => card.id)));
    setStudyIndex(0);
    setIsFlipped(false);
    setAnnouncement("Study order shuffled.");
  };

  return (
    <div className="relative min-h-screen overflow-x-hidden bg-[#040710] text-slate-100">
      <div className="pointer-events-none fixed inset-0 cyber-grid opacity-40" />
      <LightTrails />
      <motion.div
        aria-hidden="true"
        className="pointer-events-none fixed -left-32 top-16 size-[28rem] rounded-full bg-cyan-400/[0.055] blur-[110px]"
        animate={reduceMotion ? undefined : { x: [0, 90, 0], y: [0, 40, 0] }}
        transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        aria-hidden="true"
        className="pointer-events-none fixed -right-40 bottom-0 size-[32rem] rounded-full bg-violet-500/[0.06] blur-[120px]"
        animate={reduceMotion ? undefined : { x: [0, -70, 0], y: [0, -45, 0] }}
        transition={{ duration: 22, repeat: Infinity, ease: "easeInOut" }}
      />

      <Header
        deckCount={state.decks.length}
        cardCount={totalCardCount}
        onNewDeck={() => setModal({ type: "new-deck" })}
        onOpenDecks={() => setMobileDecksOpen(true)}
      />

      <div className="relative z-10 flex min-h-[calc(100vh-5rem)]">
        <DeckSidebar
          decks={state.decks}
          cardsByDeckId={state.cardsByDeckId}
          activeDeckId={state.activeDeckId}
          mobileOpen={mobileDecksOpen}
          onCloseMobile={() => setMobileDecksOpen(false)}
          onNewDeck={() => {
            setMobileDecksOpen(false);
            setModal({ type: "new-deck" });
          }}
          onSelect={(deckId) => {
            setState((current) => ({ ...current, activeDeckId: deckId }));
            setMobileDecksOpen(false);
          }}
        />

        <main className="min-w-0 flex-1 px-4 py-6 md:px-7 md:py-8 xl:px-10">
          {activeDeck ? (
            <div className="mx-auto max-w-6xl space-y-7">
              <DeckToolbar
                deck={activeDeck}
                search={search}
                matchCount={filteredCards.length}
                hasCards={activeCards.length > 0}
                onSearch={setSearch}
                onShuffle={shuffle}
                onNewCard={() =>
                  setModal({ type: "new-card", deckId: activeDeck.id })
                }
                onEditDeck={() =>
                  setModal({ type: "edit-deck", deck: activeDeck })
                }
                onDeleteDeck={() =>
                  setModal({ type: "delete-deck", deck: activeDeck })
                }
              />

              {activeCards.length === 0 ? (
                <EmptyState
                  type="cards"
                  onAction={() =>
                    setModal({ type: "new-card", deckId: activeDeck.id })
                  }
                />
              ) : filteredCards.length === 0 ? (
                <EmptyState type="search" />
              ) : currentCard ? (
                <>
                  <StudyCard
                    key={currentCard.id}
                    card={currentCard}
                    deckName={activeDeck.name}
                    isFlipped={isFlipped}
                    position={studyIndex + 1}
                    total={studyCards.length}
                    onFlip={flip}
                  />
                  <StudyControls
                    disabled={studyCards.length === 0}
                    onPrevious={previous}
                    onFlip={flip}
                    onNext={next}
                  />
                  <div className="mx-auto h-px max-w-4xl overflow-hidden bg-slate-800">
                    <motion.div
                      className="h-full bg-cyan-300 shadow-[0_0_10px_rgba(34,211,238,.8)]"
                      animate={{
                        width: `${((studyIndex + 1) / studyCards.length) * 100}%`,
                      }}
                    />
                  </div>
                </>
              ) : null}

              <CardManagementList
                cards={filteredCards}
                onEdit={(card) =>
                  setModal({
                    type: "edit-card",
                    deckId: activeDeck.id,
                    card,
                  })
                }
                onDelete={(card) =>
                  setModal({
                    type: "delete-card",
                    deckId: activeDeck.id,
                    card,
                  })
                }
              />

              <footer className="pb-4 pt-2 text-center text-[10px] font-bold tracking-[0.2em] text-slate-700">
                SPACE FLIP · ← PREVIOUS · → NEXT
              </footer>
            </div>
          ) : (
            <div className="mx-auto max-w-4xl">
              <EmptyState
                type="decks"
                onAction={() => setModal({ type: "new-deck" })}
              />
            </div>
          )}
        </main>
      </div>

      <div className="sr-only" aria-live="polite">
        {announcement}
      </div>

      <Modal
        open={modal.type !== "closed"}
        title={
          modal.type === "new-deck"
            ? "Create Deck"
            : modal.type === "edit-deck"
              ? "Rename Deck"
              : modal.type === "delete-deck"
                ? "Delete Deck"
                : modal.type === "new-card"
                  ? "Create Card"
                  : modal.type === "edit-card"
                    ? "Edit Card"
                    : modal.type === "delete-card"
                      ? "Delete Card"
                      : ""
        }
        onClose={closeModal}
      >
        {modal.type === "new-deck" && (
          <DeckForm
            submitLabel="CREATE"
            onSubmit={createDeck}
            onCancel={closeModal}
          />
        )}

        {modal.type === "edit-deck" && (
          <DeckForm
            initialName={modal.deck.name}
            submitLabel="SAVE"
            onSubmit={(name) => renameDeck(modal.deck.id, name)}
            onCancel={closeModal}
          />
        )}

        {modal.type === "delete-deck" && (
          <ConfirmDelete
            subject={modal.deck.name}
            detail="Every card inside this deck will also be permanently removed from local storage."
            onConfirm={() => deleteDeck(modal.deck.id)}
            onCancel={closeModal}
          />
        )}

        {modal.type === "new-card" && (
          <CardForm
            submitLabel="CREATE"
            onSubmit={(front, back) => createCard(modal.deckId, front, back)}
            onCancel={closeModal}
          />
        )}

        {modal.type === "edit-card" && (
          <CardForm
            initialCard={modal.card}
            submitLabel="SAVE"
            onSubmit={(front, back) =>
              editCard(modal.deckId, modal.card.id, front, back)
            }
            onCancel={closeModal}
          />
        )}

        {modal.type === "delete-card" && (
          <ConfirmDelete
            subject={modal.card.front}
            detail="This card will be permanently removed from the active deck."
            onConfirm={() => deleteCard(modal.deckId, modal.card.id)}
            onCancel={closeModal}
          />
        )}
      </Modal>
    </div>
  );
}
