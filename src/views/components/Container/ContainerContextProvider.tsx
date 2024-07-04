import update from "immutability-helper";
import {
  TDefaultCardsState,
  CardsContext,
  initialData,
} from "./ContainerContext";
import { useContext, useEffect, useState } from "react";
import { EGuessedCorrectly, TCard } from "@types";
import { useParams } from "react-router-dom";
import { termsByPhrase } from "@data";
import { shuffle } from "@utils";

type TCardsContextProvider = {
  children: React.ReactNode;
};

export const CardsContextProvider = (props: TCardsContextProvider) => {
  const { children } = props;

  const params = useParams();

  const [state, setState] = useState<TDefaultCardsState>(initialData);

  // render the next card. The next card cannot be greater than the end index
  function handleNextCard(e?: any) {
    e?.stopPropagation();

    if (state.currentCardIndex === state.endIndex - state.startIndex) return;

    setState((prev) =>
      update(prev, {
        currentCardIndex: { $set: state.currentCardIndex + 1 },
        isCardFlipped: { $set: false },
      })
    );
  }

  // render the previous card. The card cannot travel further back than the start index
  function handlePreviousCard(e: any) {
    e?.stopPropagation();

    if (state.currentCardIndex === 0) return;

    setState((prev) =>
      update(prev, {
        currentCardIndex: { $set: state.currentCardIndex - 1 },
        isCardFlipped: { $set: false },
      })
    );
  }

  // adds a a hint to the specific card
  function handleAddHint(hint: string, id: string) {
    const findIndex = state.currentCardsSet.sets.findIndex(
      (card) => card.id === id
    );

    const updateTarget = {
      currentCardsSet: {
        [findIndex]: {
          hint: { $set: hint },
        },
      },
    };

    setState((prevState) => update(prevState, updateTarget));
  }

  // toggles the guess property of the card to incorrect or correct based on the
  // parameter passed to the function
  function handleGuess(guess: TCard["guess"]) {
    const updateTarget: Record<string, any> = {};

    if (state.currentCardsSet.sets.length <= 0) return;

    // user has reviewed the last card, show the results
    if (state.currentCardIndex >= state.currentCardsSet.sets.length - 1) {
      // updateTarget.currentPage = { $set: EPage.FINISHED };
      // updateTarget.isFinished = { $set: true };

      // setState((prevState) => update(prevState, updateTarget));
      alert("User has reviewed the last card, show the results");
    }

    const cardIndex = state.currentCardIndex;

    const totalGuessKeyLabel =
      guess === EGuessedCorrectly.CORRECT ? "totalCorrect" : "totalWrong";

    handleFlipCard();

    updateTarget.selectedRangeOfCards = {
      [cardIndex]: {
        guess: { $set: guess },
      },
    };

    updateTarget[totalGuessKeyLabel] = {
      $set: state[totalGuessKeyLabel] + 1,
    };

    setState((prevState) => update(prevState, updateTarget));

    handleNextCard();
  }

  function handleWrongGuess() {
    handleGuess(EGuessedCorrectly.INCORRECT);
  }

  function handleCorrectGuess() {
    handleGuess(EGuessedCorrectly.CORRECT);
  }

  // flips the card to the back face
  function handleFlipCard() {
    const updateTarget = {
      isCardFlipped: {
        $set: !state.isCardFlipped,
      },
    };

    setState(update(state, updateTarget));
  }

  function handleRedoWrongGuessesOnly() {
    const wrongGuesses = state.currentCardsSet.sets.filter(
      (card: TCard) => card.guess === EGuessedCorrectly.INCORRECT
    );

    const currentCardsSet = { ...state.currentCardsSet, sets: wrongGuesses };

    if (wrongGuesses.length === 0) return;

    const updateTarget = {
      $merge: {
        currentCardsSet,
        endIndex: wrongGuesses.length - 1,
        isFinished: false,
        currentCardIndex: 0,
        totalCorrect: 0,
        totalWrong: 0,
        startIndex: 0,
      },
    };

    setState(update(state, updateTarget));
  }

  // update local storage every time state changes
  useEffect(() => {
    // localStorage.setItem("shrood__flashcards", JSON.stringify(state));
    initializeState.getCurrentSetOfCards();
    initializeState.updateState();
  }, [params, state]);

  type TInitializeState = {
    getSelectedRangeOfCardsNonQuizzed: () => void;
    getSelectedRangeOfCards: () => void;
    updateTarget: Record<string, any>;
    getCurrentSetOfCards: () => void;
    getShuffledCards: () => void;
    updateState: () => void;
  };

  const initializeState: TInitializeState = {
    updateTarget: state,

    // this looks at the url and gets the current set of cards
    // by matching the title of the card set in the url with
    // the title of the card set in the data
    getCurrentSetOfCards() {
      let { title } = params;

      title = title?.replace(/-/g, " ").toLocaleLowerCase();
      const cardSet: any =
        termsByPhrase.find(
          (cardSet) => cardSet.title.toLocaleLowerCase() === title
        ) || {};

      cardSet.totalTerms = String(cardSet?.sets?.length || 0);
      this.updateTarget.currentCardsSet = cardSet;
    },
    // the user might have set an initial and end index to quiz a specific range of cards
    getSelectedRangeOfCards() {
      const { startIndex, endIndex } = state;

      const selectedRangeOfCards = this.updateTarget.currentCardsSet.slice(
        startIndex,
        endIndex + 1
      );

      this.updateTarget.selectedRangeOfCards = selectedRangeOfCards || [];
    },

    // get the cards that have not been quizzed yet
    getSelectedRangeOfCardsNonQuizzed() {
      this.updateTarget.selectedRangeOfCards =
        this.updateTarget.selectedRangeOfCards.filter(
          (card: TCard) => card.guess === EGuessedCorrectly.UNQUIZZED
        );
    },

    // check if the user has shuffle on and apply the settings to the set of cards
    getShuffledCards() {
      if (this.updateTarget.isShufflingOn) {
        this.updateTarget.selectedRangeOfCards = shuffle(
          this.updateTarget.selectedRangeOfCards
        );
      }
    },

    updateState() {
      setState(update(state, { $merge: this.updateTarget }));
    },
  };

  return (
    <CardsContext.Provider
      value={{
        state,
        handleRedoWrongGuessesOnly,
        handlePreviousCard,
        handleCorrectGuess,
        handleWrongGuess,
        handleFlipCard,
        handleNextCard,
        handleAddHint,
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
