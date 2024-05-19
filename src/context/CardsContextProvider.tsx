import update from "immutability-helper";
import {
  TDefaultCardsState,
  defaultCardsState,
  CardsContext,
} from "./CardsContext";
import { useContext, useEffect, useState } from "react";
import { getCardSet } from "@utils";

type TCardsContextProvider = {
  children: React.ReactNode;
};

export const CardsContextProvider = (props: TCardsContextProvider) => {
  const { children } = props;

  const [state, setState] = useState<TDefaultCardsState>(defaultCardsState);

  function handleSaveSettings(values: Partial<TDefaultCardsState>) {
    const updateTarget = {
      $merge: values,
    };

    setState(update(state, updateTarget));
  }

  // render the next card. The next card cannot be greater than the end index
  function handleNextCard(e: any) {
    e.stopPropagation();

    if (state.currentCardIndex === state.endIndex) return;

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

  useEffect(() => {
    const allCards = getCardSet();
    console.log(allCards);

    const updateTarget = {
      endIndex: { $set: allCards.length - 1 },
      allCards: { $set: allCards },
      startIndex: { $set: 0 },
    };

    setState(update(state, updateTarget));
  }, []);

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
