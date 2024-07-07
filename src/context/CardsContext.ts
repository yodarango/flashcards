import { createContext } from "react";
import { TCardSet } from "@types";

export type TDefaultCardsState = {
  currentCardsSet: TCardSet; // all the cards available
  correctGuessIds: number[]; // the ids of the cards that have been correctly guessed
  currentCardIndex: number; // the current card index
  wrongGuessIds: number[]; // the ids of the cards that have been incorrectly guessed
  isCardFlipped: boolean; // the current card being displayed is flipped or not?
  // isFinished: boolean; // the user has finished the quiz
  totalCards: number; // the total number of cards available
  loading: boolean; // the initial loading state
  startIndex: number; // the start index of the cards to be displayed. Must be in sync with the settings context
  endIndex: number; // the end index of the cards to be displayed. Must be in sync with the settings context
};

export const initialCardsData: TDefaultCardsState = {
  currentCardsSet: {} as TCardSet,
  isCardFlipped: false,
  currentCardIndex: 0,
  correctGuessIds: [],
  wrongGuessIds: [],
  // isFinished: false,
  totalCards: 0,
  loading: true,
  startIndex: 0,
  endIndex: 0,
};

export const defaultCardsContext = {
  state: initialCardsData,
  handleUpdateStateFromSettings: (_: Record<string, any>) => {},
  handlePreviousCard: (_: any) => {},
  handleNextCard: (_: any) => {},
  handleCorrectGuess: () => {},
  handleWrongGuess: () => {},
  handleFlipCard: () => {},
  resetState: () => {},
};

export const CardsContext = createContext(defaultCardsContext);
