import update from "immutability-helper";
import {
  TDefaultCardsState,
  initialCardsData,
  CardsContext,
} from "./CardsContext";
import { useContext, useEffect, useState } from "react";
import { EGuessedCorrectly, TCardSet } from "@types";
import { useParams } from "react-router-dom";
import { termsByPhrase } from "@data";

type TCardsContextProvider = {
  children: React.ReactNode;
};

export const CardsContextProvider = (props: TCardsContextProvider) => {
  const { children } = props;

  const params = useParams();

  const [state, setState] = useState<TDefaultCardsState>(initialCardsData);

  useEffect(() => {
    initializeState();
  }, []);

  // initialize the state on initial render render. The only state items that need to be initialized are the
  // currentCardsSet, and totalCards.
  async function initializeState() {
    const currentCardsSet = await findCardSetFromParams();
    const totalCards = currentCardsSet.sets.length;

    const updateTarget: Record<string, any> = {
      currentCardsSet: { $set: currentCardsSet },
      totalCards: { $set: totalCards },
      loading: { $set: false },
    };

    setState(update(state, updateTarget));
  }

  // find the card set based on the phrase from the URL
  function findCardSetFromParams(): Promise<TCardSet> {
    return new Promise((resolve) => {
      const phrase = params.title?.toLowerCase();
      const findCardSet =
        termsByPhrase.find(
          (term) => term.title.replace(" ", "-").toLocaleLowerCase() === phrase
        ) || {};
      resolve(findCardSet as TCardSet);
    });
  }

  // moves the index forward to the next card
  function handleNextCard(e: any) {
    e.stopPropagation();
    const currentCardIndex = state.currentCardIndex;
    const totalCards = state.totalCards;

    if (currentCardIndex < totalCards - 1) {
      const updateTarget: Record<string, any> = {
        currentCardIndex: { $set: currentCardIndex + 1 },
        isCardFlipped: { $set: false },
      };

      setState(update(state, updateTarget));
    }
  }

  // moves the index back to the previous card
  function handlePreviousCard(e: any) {
    e.stopPropagation();
    const currentCardIndex = state.currentCardIndex;

    if (currentCardIndex > 0) {
      const updateTarget: Record<string, any> = {
        currentCardIndex: { $set: currentCardIndex - 1 },
        isCardFlipped: { $set: false },
      };

      setState(update(state, updateTarget));
    }
  }

  // flips the card to the opposite side
  function handleFlipCard() {
    const isCardFlipped = state.isCardFlipped;

    const updateTarget: Record<string, any> = {
      isCardFlipped: { $set: !isCardFlipped },
    };

    setState(update(state, updateTarget));
  }

  // handle the guess of the card and update the state accordingly
  function handleGuess(guess: EGuessedCorrectly) {
    if (state.currentCardIndex === state.totalCards - 1) {
      alert("You have finished the quiz!");
      return;
    }

    const guessIdsObjectKey =
      guess === EGuessedCorrectly.CORRECT ? "correctGuessIds" : "wrongGuessIds";

    const updateTarget: Record<string, any> = {
      currentCardIndex: { $set: state.currentCardIndex + 1 },

      [guessIdsObjectKey]: {
        $push: [state.currentCardsSet.sets[state.currentCardIndex].id],
      },
      isCardFlipped: { $set: false },
    };

    setState(update(state, updateTarget));
  }

  // mark the current card as guessed correctly
  function handleCorrectGuess() {
    handleGuess(EGuessedCorrectly.CORRECT);
  }

  // mark the current card as guessed incorrectly
  function handleWrongGuess() {
    handleGuess(EGuessedCorrectly.INCORRECT);
  }

  // reset the state to the initial state
  async function resetState() {
    const currentCardsSet = await findCardSetFromParams();
    const totalCards = currentCardsSet.sets.length;
    setState({
      ...initialCardsData,
      currentCardsSet: currentCardsSet,
      totalCards,
    });
  }

  // merges the current state with the new state
  async function handleUpdateStateFromSettings(settings: Record<string, any>) {
    let currentCardsSet: TCardSet = await findCardSetFromParams();

    currentCardsSet = {
      ...currentCardsSet,
      sets: currentCardsSet.sets.slice(settings.startIndex, settings.endIndex),
    };

    setState(
      update(initialCardsData, {
        $merge: {
          totalCards: currentCardsSet.sets.length,
          startIndex: settings.startIndex,
          endIndex: settings.endIndex,
          currentCardsSet,
        },
      })
    );
  }

  return (
    <CardsContext.Provider
      value={{
        state,
        handleUpdateStateFromSettings,
        handleCorrectGuess,
        handlePreviousCard,
        handleWrongGuess,
        handleFlipCard,
        handleNextCard,
        resetState,
      }}
    >
      {children}
    </CardsContext.Provider>
  );
};

export function useCardsContext() {
  const context = useContext(CardsContext);

  if (!context) {
    throw new Error(
      "useCardsContext must be used within a CardsContextProvider"
    );
  }

  return context;
}
