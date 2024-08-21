import { HTMLAttributes, useRef } from "react";
import { If } from "../../../../../@ds/utils";
import { useCardsContext } from "@context";
import { TCard } from "@types";

// styles
import "./FlashCard.scss";

export function FlashCard(props: HTMLAttributes<HTMLSelectElement>) {
  const { className, ...restOfProps } = props;

  const cardsCtx = useCardsContext();

  const { handlePreviousCard, handleNextCard, handleFlipCard } = cardsCtx;
  const cardsState = cardsCtx.state;

  const selectedRangeOfCards: TCard[] = cardsState.currentCardsSet.sets || [];
  const currentCardIndex = cardsState.currentCardIndex;

  const currentCardFront = selectedRangeOfCards[currentCardIndex]?.eng;
  const currentCardBack = selectedRangeOfCards[currentCardIndex]?.spa;
  const isCardFlipped = cardsState.isCardFlipped;

  const flashCardContentFront = useRef<any>(undefined);
  const flashCardContentBack = useRef<any>(undefined);

  const isFlippedClass = isCardFlipped ? "is-flipped" : "is-not-flipped";
  const isThisCardCorrectlyGuessed = cardsState.correctGuessIds.includes(
    selectedRangeOfCards[currentCardIndex]?.id
  );
  const isThisCardWronglyGuessed = cardsState.wrongGuessIds.includes(
    selectedRangeOfCards[currentCardIndex]?.id
  );

  const cardGuessClass = isThisCardWronglyGuessed
    ? "bg-danger color-beta"
    : isThisCardCorrectlyGuessed
    ? "bg-success color-beta"
    : "";

  const cardGuessLabel = isThisCardWronglyGuessed
    ? "Wrong"
    : isThisCardCorrectlyGuessed
    ? "Correct"
    : "";

  return (
    <section
      className={`${className} flashcard d-flex align-items-center justify-content-center m-auto ${isFlippedClass}`}
      onClick={handleFlipCard}
      {...restOfProps}
    >
      <div className={`flashcard-inner`}>
        {/* front */}
        <div className='front bg-gamma d-flex align-items-center justify-content-center'>
          {/* actions */}
          <button
            className='flashcard-actions action-left color-alpha d-flex align-items-center justify-content-center'
            onClick={handlePreviousCard}
          >
            <ion-icon name='chevron-back-outline' />
          </button>
          <div
            className='flashcard-content d-flex align-items-center justify-content-start flex-column p-6'
            ref={flashCardContentFront}
          >
            <div className='d-flex align-items-center justify-content-center column-gap-2 mb-2'>
              <p className='color-alpha opacity-60 fs-3'>
                # {currentCardIndex + 1}
              </p>
              <If condition={!!cardGuessLabel}>
                <span
                  className={
                    "rounded fw-6 fs-6 p-1 d-inline-clock " + cardGuessClass
                  }
                >
                  {cardGuessLabel}
                </span>
              </If>
            </div>
            <h2>{currentCardFront}</h2>
          </div>
          <button
            className='flashcard-actions action-right color-alpha d-flex align-items-center justify-content-center'
            onClick={handleNextCard}
          >
            <ion-icon name='chevron-forward-outline' />
          </button>
        </div>

        {/* back */}
        <div className='back bg-mu d-flex align-items-center justify-content-center'>
          {/* actions */}
          <button
            className='flashcard-actions action-left color-alpha d-flex align-items-center justify-content-center'
            onClick={handlePreviousCard}
          >
            <ion-icon name='chevron-back-outline' />
          </button>
          <div className='flashcard-content p-6' ref={flashCardContentBack}>
            <div className='d-flex align-items-center justify-content-center column-gap-2 mb-2'>
              <p className='color-alpha opacity-60 fs-3 '>
                # {currentCardIndex + 1}
              </p>
              <If condition={!!cardGuessLabel}>
                <span
                  className={
                    "rounded fw-6 fs-6 p-1 d-inline-clock" + cardGuessClass
                  }
                >
                  {cardGuessLabel}
                </span>
              </If>
            </div>
            <h2>{currentCardBack}</h2>
          </div>
          <button
            className='flashcard-actions action-right color-alpha d-flex align-items-center justify-content-center'
            onClick={handleNextCard}
          >
            <ion-icon name='chevron-forward-outline' />
          </button>
        </div>
      </div>
    </section>
  );
}
