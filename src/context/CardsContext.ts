import { createContext } from "react";
import { TCard } from "@types";

export type TDefaultCardsState = {
  currentCardIndex: number;
  isSettingsOpen: boolean;
  isSufflingOn: boolean;
  totalCorrect: number;
  totalCards: number;
  totalWrong: number;
  startIndex: number;
  allCards: TCard[];
  endIndex: number;
};

export const defaultCardsState: TDefaultCardsState = {
  isSettingsOpen: false,
  currentCardIndex: 0,
  isSufflingOn: false,
  totalCorrect: 0,
  totalCards: 0,
  totalWrong: 0,
  startIndex: 0,
  allCards: [],
  endIndex: 0,
};

export const defaultContext = {
  state: defaultCardsState,
  handleSaveSettings: (values: Partial<TDefaultCardsState>) => {},
  handleToggleSettingsModal: () => {},
};

export const CardsContext = createContext(defaultContext);
