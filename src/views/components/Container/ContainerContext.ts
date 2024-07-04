import { createContext } from "react";
import { TCardSet } from "@types";

export type TDefaultCardsState = {
  currentCardsSet: TCardSet; // all the cards available
  currentCardIndex: number; // The index of the current card being displayed
  isCardFlipped: boolean; // the current card being displayed is flipped or not?
  totalCorrect: number; // the total number of correct card guesses
  isFinished: boolean; // the user has finished the quiz
  totalCards: number; // the total number of cards available
  totalWrong: number; // the total number of wrong card guesses
  startIndex: number; // the start index of the slice of cards to be quizzed
  endIndex: number; // the end index of the slice of cards to be quizzed
};

export const initialData: TDefaultCardsState = {
  currentCardsSet: {} as TCardSet,
  isCardFlipped: false,
  currentCardIndex: 0,
  isFinished: false,
  totalCorrect: 0,
  totalCards: 0,
  totalWrong: 0,
  startIndex: 0,
  endIndex: -1,
};

export const defaultContext = {
  state: initialData,
  handleAddHint: (_: string, __: string) => {},
  handleRedoWrongGuessesOnly: () => {},
  handlePreviousCard: (_: any) => {},
  handleCorrectGuess: (_: any) => {},
  handleWrongGuess: (_: any) => {},
  handleNextCard: (_: any) => {},
  handleFlipCard: () => {},
};

export const CardsContext = createContext(defaultContext);
