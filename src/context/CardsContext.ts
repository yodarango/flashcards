import { createContext } from "react";
import { TCard } from "@types";

export type TDefaultCardsState = {
  currentCardIndex: number;
  isShufflingOn: boolean;
  totalCorrect: number;
  cardSetName: string;
  totalCards: number;
  totalWrong: number;
  startIndex: number;
  allCards: TCard[];
  endIndex: number;
};

export const defaultCardsState: TDefaultCardsState = {
  currentCardIndex: 0,
  isShufflingOn: false,
  totalCorrect: 0,
  cardSetName: "",
  totalCards: 0,
  totalWrong: 0,
  startIndex: 0,
  allCards: [],
  endIndex: 0,
};

export const defaultContext = {
  state: defaultCardsState,
  handleSaveSettings: (_: Partial<TDefaultCardsState>) => {},
  handlePreviousCard: (_: any) => {},
  handleNextCard: (_: any) => {},
};

export const CardsContext = createContext(defaultContext);
