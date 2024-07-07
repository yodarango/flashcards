import { createContext } from "react";
import { TCardSet } from "@types";

export type TDefaultCardsState = {
  totalCardsInTheSet: number; // the total number of cards in the set not only the ones in the selected range
  currentCardsSet: TCardSet; // all the cards available
  correctGuessIds: string[]; // the ids of the cards that have been correctly guessed
  currentCardIndex: number; // the current card index
  wrongGuessIds: string[]; // the ids of the cards that have been incorrectly guessed
  isCardFlipped: boolean; // the current card being displayed is flipped or not?
  isFinished: boolean; // the user has finished the quiz
  isShufflingOn: boolean; // is the shuffling on?
  totalCards: number; // the total number of cards available
  startIndex: number; // the start index of the cards to be displayed. Must be in sync with the settings context
  loading: boolean; // the initial loading state
  endIndex: number; // the end index of the cards to be displayed. Must be in sync with the settings context
};

export const initialCardsData: TDefaultCardsState = {
  currentCardsSet: {} as TCardSet,
  isCardFlipped: false,
  isShufflingOn: false,
  currentCardIndex: 0,
  correctGuessIds: [],
  wrongGuessIds: [],
  isFinished: false,
  totalCardsInTheSet: 0,
  totalCards: 0,
  loading: true,
  startIndex: 0,
  endIndex: 0,
};

export const defaultCardsContext = {
  state: initialCardsData,
  handleUpdateSettings: (_: Record<string, any>) => {},
  handleRedoWrongGuessesOnly: () => {},
  handlePreviousCard: (_: any) => {},
  handleNextCard: (_: any) => {},
  handleCorrectGuess: () => {},
  handleWrongGuess: () => {},
  handleResetState: () => {},
  handleFlipCard: () => {},
};

export const CardsContext = createContext(defaultCardsContext);
