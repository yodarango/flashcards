import { EGuessedCorrectly, TCard, TCardSet } from "@types";
import { shuffle } from "../utils/shuffle";
import { createContext } from "react";

export enum EPage {
  FINISHED = "finished",
  HOME = "home",
  QUIZ = "quiz",
}

export type TDefaultCardsState = {
  randomNumberOfCards: number; // number of randomly selected cards including from 0 to the total number of cards
  isRandomQuizzingOn: boolean; // the user is testing themselves on a random set of cards
  currentCardsSet: TCardSet; // all the cards available
  currentCardIndex: number; // The index of the current card being displayed
  isShufflingOn: boolean; // shuffles the slice of cards encapsulated by the startIndex and endIndex
  isCardFlipped: boolean; // the current card being displayed is flipped or not?
  totalCorrect: number; // the total number of correct card guesses
  cardSetName: string; // this is not being used right now. In the future I might allow users to save different card sets
  isFinished: boolean; // the user has finished the quiz
  currentPage: EPage; // Keep the application lightweight, don't use a router, save the current page in the state
  totalCards: number; // the total number of cards available
  totalWrong: number; // the total number of wrong card guesses
  startIndex: number; // the start index of the slice of cards to be quizzed
  endIndex: number; // the end index of the slice of cards to be quizzed
};

export const initialData: TDefaultCardsState = {
  currentCardsSet: {} as TCardSet,
  isRandomQuizzingOn: false,
  currentPage: EPage.HOME,
  randomNumberOfCards: 0,
  isShufflingOn: false,
  isCardFlipped: false,
  currentCardIndex: 0,
  isFinished: false,
  totalCorrect: 0,
  cardSetName: "",
  totalCards: 0,
  totalWrong: 0,
  startIndex: 0,
  endIndex: 0,
};

export const defaultContext = {
  state: getStateFromLocalStorage(),
  handleSaveSettings: (_: Partial<TDefaultCardsState>) => {},
  handleAddHint: (_: string, __: string) => {},
  handleRedoWrongGuessesOnly: () => {},
  handleToggleRandomQuizzing: () => {},
  handlePreviousCard: (_: any) => {},
  handleCorrectGuess: (_: any) => {},
  resetStateAndStartOver: () => {},
  handleWrongGuess: (_: any) => {},
  handleNextCard: (_: any) => {},
  handleFlipCard: () => {},
  handleReset: () => {},
};

export const CardsContext = createContext(defaultContext);

// get the state from the local storage if it exists
export function getStateFromLocalStorage(): TDefaultCardsState {
  // get the card state from the seed file or the local storage
  // if the user has saved a card set

  const data = localStorage.getItem("shrood__flashcards");
  const parsedData = data ? JSON.parse(data) : null;

  if (!!parsedData) return parsedData;

  return initialData;
}

// gets only the unquizzed cards in the current array range. It accounts for shuffling
// in hte array.
export function applySettingsToSet(
  isShufflingOn: boolean,
  startIndex: number,
  endIndex: number,
  currentCardSetCards: TCard[]
) {
  // the start index and end index cannot be the same. The start index cannot be greater than the end index.
  if (startIndex === endIndex || startIndex > endIndex)
    return currentCardSetCards;

  const cardsRange = currentCardSetCards.slice(startIndex, endIndex + 1);

  let cards = cardsRange;

  if (isShufflingOn) cards = shuffle(cardsRange);

  return cards.filter((card) => card.guess === EGuessedCorrectly.UNQUIZZED);
}
