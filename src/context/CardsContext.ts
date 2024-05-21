import { EGuessedCorrectly, TCard } from "@types";
import { shuffle } from "../utils/shuffle";
import { createContext } from "react";
import { commonPhrases } from "@seed";

export type TDefaultCardsState = {
  selectedRangeOfCards: TCard[]; // the range of cards to be quizzed based on the start and end index
  currentCardIndex: number; // The index of the current card being displayed
  isShufflingOn: boolean; // shuffles the slice of cards encapsulated by the startIndex and endIndex
  totalCorrect: number; // the total number of correct card guesses
  cardSetName: string; // this is not being used right now. In the future I might allow users to save different card sets
  totalCards: number; // the total number of cards available
  totalWrong: number; // the total number of wrong card guesses
  startIndex: number; // the start index of the slice of cards to be quizzed
  allCards: TCard[]; // all the cards available
  endIndex: number; // the end index of the slice of cards to be quizzed
};

//

export const defaultContext = {
  state: getStateFromLocalStorage(),
  handleSaveSettings: (_: Partial<TDefaultCardsState>) => {},
  handlePreviousCard: (_: any) => {},
  handleNextCard: (_: any) => {},
};

export const CardsContext = createContext(defaultContext);

// get the card set from the seed file or the local storage
// if the user has saved a card set
export function getCardSet() {
  return commonPhrases;
}

export function getStateFromLocalStorage() {
  const allCards = getCardSet();

  const initialData = {
    selectedRangeOfCards: allCards,
    endIndex: allCards.length - 1,
    isShufflingOn: false,
    allCards: allCards,
    currentCardIndex: 0,
    totalCorrect: 0,
    cardSetName: "",
    totalCards: 0,
    totalWrong: 0,
    startIndex: 0,
  };

  const data = localStorage.getItem("shrood__flashcards");
  const parsedData = data ? JSON.parse(data) : null;

  if (!parsedData) return initialData;

  return {
    ...initialData,
    ...parsedData,
    selectedRangeOfCards: applySettingsToSet(
      parsedData.isShufflingOn,
      parsedData.startIndex,
      parsedData.endIndex,
      parsedData.allCards
    ),
  };
}

// gets only the unquizzed cards in the current array range. It accounts for shuffling
// in hte array.
export function applySettingsToSet(
  isShufflingOn: boolean,
  startIndex: number,
  endIndex: number,
  allCards: TCard[]
) {
  // the start index and end index cannot be the same. The start index cannot be greater than the end index.
  if (startIndex === endIndex || startIndex > endIndex) return allCards;

  const cardsRange = allCards.slice(startIndex, endIndex + 1);

  let cards = cardsRange;

  if (isShufflingOn) cards = shuffle(cardsRange);

  return cards.filter((card) => card.guess === EGuessedCorrectly.UNQUIZZED);
}
