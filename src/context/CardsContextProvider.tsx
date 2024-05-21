import update from "immutability-helper";
import {
  TDefaultCardsState,
  defaultContext,
  CardsContext,
  applySettingsToSet,
} from "./CardsContext";
import { useContext, useState } from "react";

type TCardsContextProvider = {
  children: React.ReactNode;
};

export const CardsContextProvider = (props: TCardsContextProvider) => {
  const { children } = props;

  const [state, setState] = useState<TDefaultCardsState>(defaultContext.state);

  // global settings for the flash cards
  function handleSaveSettings(settings: Partial<TDefaultCardsState>) {
    console.log(settings);
    const setWithAppliedSettings = applySettingsToSet(
      settings.isShufflingOn!,
      settings.startIndex!,
      settings.endIndex!,
      state.allCards
    );

    const updateTarget = {
      $merge: {
        ...settings,
        selectedRangeOfCards: setWithAppliedSettings,
        currentCardIndex: 0,
      },
    };

    setState(update(state, updateTarget));
  }

  // render the next card. The next card cannot be greater than the end index
  function handleNextCard(e: any) {
    e.stopPropagation();

    if (state.currentCardIndex === state.endIndex - state.startIndex) return;

    setState(
      update(state, { currentCardIndex: { $set: state.currentCardIndex + 1 } })
    );
  }

  // render the previous card. The card cannot travel further back than the start index
  function handlePreviousCard(e: any) {
    e.stopPropagation();

    if (state.currentCardIndex === state.startIndex) return;

    setState(
      update(state, { currentCardIndex: { $set: state.currentCardIndex - 1 } })
    );
  }

  return (
    <CardsContext.Provider
      value={{ state, handleSaveSettings, handleNextCard, handlePreviousCard }}
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
