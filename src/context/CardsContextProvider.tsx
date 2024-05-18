import update from "immutability-helper";
import {
  TDefaultCardsState,
  defaultCardsState,
  CardsContext,
} from "./CardsContext";
import { useContext, useState } from "react";

type TCardsContextProvider = {
  children: React.ReactNode;
};

export const CardsContextProvider = (props: TCardsContextProvider) => {
  const { children } = props;

  const [state, setState] = useState<TDefaultCardsState>(defaultCardsState);

  function handleToggleSettingsModal() {
    const updateTarget = {
      isSettingsOpen: { $set: !state.isSettingsOpen },
    };

    setState(update(state, updateTarget));
  }

  function handleSaveSettings(values: Partial<TDefaultCardsState>) {
    const updateTarget = {
      isSettingsOpen: { $set: false },
      $merge: values,
    };

    setState(update(state, updateTarget));
  }

  return (
    <CardsContext.Provider
      value={{ state, handleSaveSettings, handleToggleSettingsModal }}
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
