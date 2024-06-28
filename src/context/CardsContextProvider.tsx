import update from "immutability-helper";
import {
  TDefaultCardsState,
  applySettingsToSet,
  defaultContext,
  CardsContext,
  initialData,
  EPage,
} from "./CardsContext";
import { useContext, useEffect, useState } from "react";
import { EGuessedCorrectly, TCard } from "../types/card";
import { useParams } from "react-router-dom";
import { termsByPhrase } from "../../data/termsByPhrase";
import { TCardSet } from "../types/cardSet";

type TCardsContextProvider = {
  children: React.ReactNode;
};

export const CardsContextProvider = (props: TCardsContextProvider) => {
  const { children } = props;

  const params = useParams();

  const [state, setState] = useState<TDefaultCardsState>(defaultContext.state);

  // global settings for the flash cards
  function handleSaveSettings(settings: Partial<TDefaultCardsState>) {
    // the start index and end index cannot be the same. The start index cannot be greater than the end index.
    if (
      settings.startIndex === settings.endIndex ||
      settings.startIndex! > settings.endIndex!
    )
      return;

    let setWithAppliedSettings = [];

    // apply the settings to the set of cards the user is quizzing themselves with
    setWithAppliedSettings = applySettingsToSet(
      settings.isShufflingOn!,
      settings.startIndex!,
      settings.endIndex!,
      state.currentCardsSet
    );

    // if the user wants to quiz themselves with a random number of cards
    // we need to discard all the other settings they might have set
    if (Number(settings.randomNumberOfCards) > 0) {
      const appliedSettings = applySettingsToSet(
        true,
        0,
        state.currentCardsSet.length - 1,
        state.currentCardsSet
      );

      setWithAppliedSettings = appliedSettings.slice(
        0,
        Number(settings.randomNumberOfCards)
      );

      // update the settings to reflect the correct indexes
      settings.startIndex = 0;
      settings.endIndex = setWithAppliedSettings.length - 1;
      settings.isShufflingOn = false;
    }

    const updateTarget = {
      $merge: {
        ...settings,
        selectedRangeOfCards: setWithAppliedSettings, // update the selected range of cards
        currentCardIndex: 0, // reset the current card index
        totalCorrect: 0, // reset the total correct guesses
        totalWrong: 0, // reset the total wrong guesses
      },
    };

    setState(update(state, updateTarget));
  }

  function handleToggleRandomQuizzing() {
    setState((prev) =>
      update(prev, {
        isRandomQuizzingOn: { $set: !prev.isRandomQuizzingOn },
      })
    );
  }

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
    const findIndex = state.currentCardsSet.findIndex((card) => card.id === id);

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
    if (state.currentCardIndex >= state.selectedRangeOfCards.length - 1) {
      updateTarget.currentPage = { $set: EPage.FINISHED };
      updateTarget.isFinished = { $set: true };

      setState((prevState) => update(prevState, updateTarget));
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
    const wrongGuesses = state.selectedRangeOfCards.filter(
      (card) => card.guess === EGuessedCorrectly.INCORRECT
    );

    if (wrongGuesses.length === 0) return;

    const updateTarget = {
      $merge: {
        selectedRangeOfCards: wrongGuesses,
        endIndex: wrongGuesses.length - 1,
        currentPage: EPage.QUIZ,
        isFinished: false,
        currentCardIndex: 0,
        totalCorrect: 0,
        totalWrong: 0,
        startIndex: 0,
      },
    };

    setState(update(state, updateTarget));
  }

  function resetStateAndStartOver() {
    const updateTarget = {
      $merge: initialData,
    };

    setState(update(state, updateTarget));
  }

  function handleReset() {
    localStorage.setItem("shrood__flashcards", JSON.stringify(initialData));

    const updateTarget = {
      $merge: {
        ...initialData,
      },
    };

    setState(update(state, updateTarget));
  }

  // update local storage every time state changes
  useEffect(() => {
    // localStorage.setItem("shrood__flashcards", JSON.stringify(state));

    const title = params.set;

    const cardSet: any =
      termsByPhrase.find(
        (cardSet) => cardSet.title.toLocaleLowerCase() === title
      ) || {};

    cardSet.totalTerms = String(cardSet?.sets?.length || 0);

    const updateTarget = { currentCardsSet: { $set: cardSet } };

    setState(update(state, updateTarget));
  }, [state]);

  return (
    <CardsContext.Provider
      value={{
        state,
        handleRedoWrongGuessesOnly,
        handleToggleRandomQuizzing,
        resetStateAndStartOver,
        handleSaveSettings,
        handlePreviousCard,
        handleCorrectGuess,
        handleWrongGuess,
        handleFlipCard,
        handleNextCard,
        handleAddHint,
        handleReset,
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
