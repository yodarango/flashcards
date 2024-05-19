import { HTMLAttributes, useMemo, useRef, useState } from "react";
import { useCardsContext } from "./context/CardsContextProvider";
import { EGuessedCorrectly, TCard } from "./types/card";
import { shuffle } from "./utils/shuffle";

// styles
import "./FlashCard.scss";

export function FlashCard(props: HTMLAttributes<HTMLSelectElement>) {
  const { className, ...restOfProps } = props;

  const ctx = useCardsContext();
  const { handlePreviousCard, handleNextCard, state } = ctx;

  const [isFlipped, setIsFlipped] = useState<boolean>(false);

  const currentCardIndex = state.currentCardIndex;
  const isShufflingOn = state.isShufflingOn;
  const startIndex = state.startIndex;
  const endIndex = state.endIndex;
  const allCards = state.allCards;

  const currentCardRange = allCards.slice(startIndex, endIndex); // the range of cards to be quizzed

  // memoized version of the current array to be tested
  const flashCardsUnquizzedInCurrentArray = useMemo(
    () => getFlashCards(isShufflingOn, currentCardRange),
    [startIndex, endIndex]
  );

  const currentCard = flashCardsUnquizzedInCurrentArray[currentCardIndex]; // the current card being displayed
  const currentCardFront = currentCard?.front;
  const currentCardBack = currentCard?.back;

  const flashCardContentFront = useRef<any>(undefined);
  const flashCardContentBack = useRef<any>(undefined);

  // If the cards is flipped and the user decided to skip to the next/ previous card,
  // the answer fof the next term is visible for a short time frame. I need to
  // hide the content until the card is back to the front face.

  function toggleCardDisplay() {
    if (!flashCardContentFront.current || !flashCardContentBack.current) return;

    if (isFlipped) {
      flashCardContentBack.current.style.display = "none";
      flashCardContentFront.current.style.display = "none";
    }

    setTimeout(() => {
      if (!flashCardContentFront.current || !flashCardContentBack.current)
        return;

      flashCardContentBack.current.style.display = "";
      flashCardContentFront.current.style.display = "";
    }, 500);
  }

  const handleNextCardAndFlip = (e: any) => {
    toggleCardDisplay();
    setIsFlipped(false);
    handleNextCard(e);
  };

  const handlePreviousCardAndFlip = (e: any) => {
    toggleCardDisplay();
    setIsFlipped(false);
    handlePreviousCard(e);
  };

  const onShowHint = () => {
    // setHint(true);
  };

  const onRevealHint = () => {
    // setRevealHint(true);
  };

  const handleFlip = () => {
    setIsFlipped(!isFlipped);
  };

  const isFlippedClass = isFlipped ? "is-flipped" : "";

  return (
    <section
      className={`${className} flashcard d-flex align-items-center justify-content-center m-auto ${isFlippedClass}`}
      onClick={handleFlip}
      {...restOfProps}
    >
      <div className={`flashcard-inner`}>
        {/* front */}
        <div className='front bg-gamma d-flex align-items-center justify-content-center'>
          {/* actions */}
          <button
            className='flashcard-actions action-left d-flex align-items-center justify-content-center'
            onClick={handlePreviousCardAndFlip}
          >
            <span className='icon icon-chevron-back-outline color-alpha' />
          </button>
          <div className='flashcard-content' ref={flashCardContentFront}>
            <h2>{currentCardFront}</h2>
          </div>
          <button
            className='flashcard-actions action-right d-flex align-items-center justify-content-center'
            onClick={handleNextCardAndFlip}
          >
            <span className='icon icon-chevron-forward-outline color-alpha' />
          </button>
        </div>

        {/* back */}
        <div className='back bg-mu d-flex align-items-center justify-content-center'>
          {/* actions */}
          <button
            className='flashcard-actions action-left d-flex align-items-center justify-content-center'
            onClick={handlePreviousCardAndFlip}
          >
            <span className='icon icon-chevron-back-outline color-alpha' />
          </button>
          <div className='flashcard-content' ref={flashCardContentBack}>
            <h2>{currentCardBack}</h2>
          </div>
          <button
            className='flashcard-actions action-right d-flex align-items-center justify-content-center'
            onClick={handleNextCardAndFlip}
          >
            <span className='icon icon-chevron-forward-outline color-alpha' />
          </button>
        </div>
      </div>
    </section>
  );
}

// gets only the unquizzed cards in the current array range. It accounts for shuffling
// in hte array.
function getFlashCards(isShufflingOn: boolean, cardsRange: TCard[]) {
  let cards = cardsRange;

  if (isShufflingOn) cards = shuffle(cardsRange);

  return cards.filter((card) => card.guess === EGuessedCorrectly.UNQUIZZED);
}
