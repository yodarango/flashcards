import { commonPhrases } from "@seed";

export function getCardSet() {
  return commonPhrases;
}

export function getLocalStorageData() {
  const allCards = getCardSet();

  const initialData = {
    endIndex: allCards.length - 1,
    selectedRangeOfCards: [],
    isShufflingOn: false,
    currentCardIndex: 0,
    allCards: allCards,
    totalCorrect: 0,
    cardSetName: "",
    startIndex: 0,
    totalCards: 0,
    totalWrong: 0,
  };

  const data = localStorage.getItem("shrood__flashcards");
  const parsedData = data ? JSON.parse(data) : null;
  if (!parsedData) return initialData;

  return { ...initialData, ...parsedData };
}
