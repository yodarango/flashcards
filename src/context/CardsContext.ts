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
};

export const defaultCardsContext = {
  state: initialCardsData,
  handlePreviousCard: (_: any) => {},
  handleNextCard: (_: any) => {},
  handleCorrectGuess: () => {},
  handleWrongGuess: () => {},
  handleFlipCard: () => {},
};

export const CardsContext = createContext(defaultCardsContext);
