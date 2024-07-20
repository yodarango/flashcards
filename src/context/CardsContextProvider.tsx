import update from "immutability-helper";
import {
  TDefaultCardsState,
  initialCardsData,
  CardsContext,
} from "./CardsContext";
import { useContext, useEffect, useState } from "react";
import { EGuessedCorrectly, TCard, TCardSet } from "@types";
import { allCardSets } from "@data/index";
import { useParams } from "react-router-dom";
import { shuffle } from "../utils/shuffle";

type TCardsContextProvider = {
  children: React.ReactNode;
};

export const CardsContextProvider = (props: TCardsContextProvider) => {
  const { children } = props;

  const { category, title } = useParams();

  const [state, setState] = useState<TDefaultCardsState>(initialCardsData);

  useEffect(() => {
    initializeState();
  }, []);

  // initialize the state on initial render render. The only state items that need to be initialized are the
  // currentCardsSet, and totalCards.
  async function initializeStateFromFile() {
    const currentCardsSet = await findCardSetFromParams();
    const totalCards = currentCardsSet.sets.length;

    const updateTarget: Record<string, any> = {
      totalCardsInTheSet: { $set: currentCardsSet.sets.length },
      endIndex: { $set: currentCardsSet.sets.length - 1 },
      currentCardsSet: { $set: currentCardsSet },
      totalCards: { $set: totalCards },
      startIndex: { $set: 0 },
      loading: { $set: false },
    };

    setState(update(state, updateTarget));
  }

  // initialize the state on initial render render from the local storage
  function initializeStateFromLocalStorage() {
    const localStorageData = localStorage.getItem("shrood__polynguo");
    const parsedData = JSON.parse(localStorageData!);

    setState(parsedData);
  }

  // initialize the state on initial render render.
  async function initializeState() {
    const localStorageData = localStorage.getItem("shrood__polynguo");

    if (localStorageData) {
      initializeStateFromLocalStorage();
    } else {
      await initializeStateFromFile();
    }
  }

  // find the card set based on the phrase from the URL
  function findCardSetFromParams(): Promise<TCardSet> {
    return new Promise((resolve) => {
      const setsTitle = title?.toLowerCase();
      const setsCategory = category?.toLowerCase();

      // check if they are loading words by category of by common phrase, since
      // they have different nesting levels
      if (category?.includes("--")) {
        const [mainCategory, subCategory] = category.split("--");

        const mainCategorySets =
          allCardSets.find(
            (cardSet: TCardSet) => cardSet.id === mainCategory
          ) || ({} as TCardSet);

        const subCardSet: any = mainCategorySets.sets?.find(
          (cardSet: any) => cardSet.title.toLowerCase() === subCategory
        );

        const subCategoryCards = subCardSet?.sets.find((cardSet: any) => {
          return cardSet.title.toLowerCase().replaceAll(" ", "-") === setsTitle;
        });

        resolve(subCategoryCards);
      } else {
        const mainCategorySets = allCardSets.find(
          (cardSet: TCardSet) => cardSet.id === setsCategory
        );

        const subCardSet: any = mainCategorySets!.sets?.find(
          (cardSet: any) =>
            cardSet.title.toLowerCase().replaceAll(" ", "-") === setsTitle
        );

        resolve(subCardSet as TCardSet);
      }
    });
  }

  // moves the index forward to the next card
  function handleNextCard(e: any) {
    e.stopPropagation();
    const currentCardIndex = state.currentCardIndex;
    const totalCards = state.totalCards;

    if (currentCardIndex < totalCards - 1) {
      const updateTarget: Record<string, any> = {
        currentCardIndex: { $set: currentCardIndex + 1 },
        isCardFlipped: { $set: false },
      };

      setState(update(state, updateTarget));
    }
  }

  // moves the index back to the previous card
  function handlePreviousCard(e: any) {
    e.stopPropagation();
    const currentCardIndex = state.currentCardIndex;

    if (currentCardIndex > 0) {
      const updateTarget: Record<string, any> = {
        currentCardIndex: { $set: currentCardIndex - 1 },
        isCardFlipped: { $set: false },
      };

      setState(update(state, updateTarget));
    }
  }

  // flips the card to the opposite side
  function handleFlipCard() {
    const isCardFlipped = state.isCardFlipped;

    const updateTarget: Record<string, any> = {
      isCardFlipped: { $set: !isCardFlipped },
    };

    setState(update(state, updateTarget));
  }

  // handle the guess of the card and update the state accordingly
  function handleGuess(guess: EGuessedCorrectly) {
    const cardId = state.currentCardsSet.sets[state.currentCardIndex].id;
    const isThisTheLastIndex = state.currentCardIndex === state.totalCards - 1; // not necessarily the last card to be guessed, just the last index
    const totalNumberOfGuesses =
      state.correctGuessIds.length + state.wrongGuessIds.length;
    const isThisTheLastCardToBeGuessed =
      totalNumberOfGuesses === state.totalCards - 1;

    // check if the card has already been guessed according the the guess type being passed,
    // otherwise it will result in a duplicate entry in the state.
    if (
      (guess === EGuessedCorrectly.CORRECT &&
        state.correctGuessIds.includes(cardId)) ||
      (guess === EGuessedCorrectly.INCORRECT &&
        state.wrongGuessIds.includes(cardId))
    ) {
      return;
    }

    const oppositeGuessIdsObjectKey =
      guess === EGuessedCorrectly.CORRECT ? "wrongGuessIds" : "correctGuessIds";
    const guessIdsObjectKey =
      guess === EGuessedCorrectly.CORRECT ? "correctGuessIds" : "wrongGuessIds";

    const updateTarget: Record<string, any> = {
      currentCardIndex: {
        $set:
          isThisTheLastIndex && isThisTheLastCardToBeGuessed
            ? state.currentCardIndex
            : state.currentCardIndex + 1,
      },

      [guessIdsObjectKey]: {
        $push: [cardId],
      },
      isCardFlipped: { $set: false },
      isFinished: {
        $set: isThisTheLastCardToBeGuessed,
      },
    };

    // If the card has already been guessed, and it is being guessed opposite to
    // the previous guess, then it needs to be removed from the previous guess
    // array before adding it to the new guess array.
    if (state[oppositeGuessIdsObjectKey].includes(cardId)) {
      updateTarget[oppositeGuessIdsObjectKey] = {
        $splice: [[state[oppositeGuessIdsObjectKey].indexOf(cardId), 1]],
      };
    }

    setState(update(state, updateTarget));
  }

  // mark the current card as guessed correctly
  function handleCorrectGuess() {
    handleGuess(EGuessedCorrectly.CORRECT);
  }

  // mark the current card as guessed incorrectly
  function handleWrongGuess() {
    handleGuess(EGuessedCorrectly.INCORRECT);
  }

  // reset the state to the initial state
  async function handleResetState() {
    localStorage.removeItem("shrood__polynguo");

    const currentCardsSet = await findCardSetFromParams();
    const totalCards = currentCardsSet.sets.length;
    setState({
      ...initialCardsData,
      currentCardsSet: currentCardsSet,
      totalCards,
    });
  }

  // adjust the card set according to the selected settings
  async function handleUpdateSettings(settings: Record<string, any>) {
    const { startIndex, endIndex, isShufflingOn } = settings;
    const cardsFromParams: TCardSet = await findCardSetFromParams();

    console.log("cardsFromParams", cardsFromParams);
    const currentCardsSet = {
      ...cardsFromParams,
      sets: cardsFromParams.sets.slice(startIndex, endIndex + 1),
    };

    if (settings.isShufflingOn) {
      currentCardsSet.sets = shuffle(currentCardsSet.sets);
    }

    setState(
      update(state, {
        $merge: {
          totalCardsInTheSet: cardsFromParams.sets.length,
          totalCards: currentCardsSet.sets.length,
          correctGuessIds: [],
          currentCardIndex: 0,
          wrongGuessIds: [],
          currentCardsSet,
          loading: false,
          isShufflingOn,
        },
      })
    );
  }

  // redo only the incorrect answers
  async function handleRedoWrongGuessesOnly() {
    const { wrongGuessIds } = state;

    const cardsFromParams: TCardSet = await findCardSetFromParams();

    const wrongCardsInSet: TCard[] = cardsFromParams.sets.filter((card) =>
      wrongGuessIds.includes(card.id)
    );

    const currentCardsSet: TCardSet = {
      ...cardsFromParams,
      sets: wrongCardsInSet,
    };

    setState(
      update(state, {
        $merge: {
          totalCardsInTheSet: cardsFromParams.sets.length,
          totalCards: wrongCardsInSet.length,
          isCardFlipped: false,
          currentCardIndex: 0,
          correctGuessIds: [],
          isFinished: false,
          wrongGuessIds: [],
          currentCardsSet,
          loading: false,
        },
      })
    );
  }

  // save state to local storage every time it changes but only if there is a set present
  useEffect(() => {
    if (Object.keys(state.currentCardsSet).length === 0) return;

    localStorage.setItem("shrood__polynguo", JSON.stringify(state));
  }, [state]);

  return (
    <CardsContext.Provider
      value={{
        state,
        handleRedoWrongGuessesOnly,
        handleUpdateSettings,
        handleCorrectGuess,
        handlePreviousCard,
        handleResetState,
        handleWrongGuess,
        handleFlipCard,
        handleNextCard,
      }}
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
