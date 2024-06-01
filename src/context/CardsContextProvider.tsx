import update from "immutability-helper";
import {
  TDefaultCardsState,
  applySettingsToSet,
  defaultContext,
  CardsContext,
} from "./CardsContext";
import { useContext, useState } from "react";
import { EGuessedCorrectly, TCard } from "../types/card";

type TCardsContextProvider = {
  children: React.ReactNode;
};

export const CardsContextProvider = (props: TCardsContextProvider) => {
  const { children } = props;

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
      state.allCards
    );

    // if the user wants to quiz themselves with a random number of cards
    // we need to discard all the other settings they might have set
    if (Number(settings.randomNumberOfCards) > 0) {
      const appliedSettings = applySettingsToSet(
        true,
        0,
        state.allCards.length - 1,
        state.allCards
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

  // toggles the guess property of the card to incorrect or correct based on the
  // parameter passed to the function
  function handleGuess(guess: TCard["guess"]) {
    const updateTarget: Record<string, any> = {};

    if (state.selectedRangeOfCards.length <= 0) return;

    // user has reviewed the last card, show the results
    if (state.currentCardIndex >= state.selectedRangeOfCards.length - 1) {
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

  return (
    <CardsContext.Provider
      value={{
        state,
        handleToggleRandomQuizzing,
        handleSaveSettings,
        handlePreviousCard,
        handleCorrectGuess,
        handleWrongGuess,
        handleFlipCard,
        handleNextCard,
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
