import { HTMLAttributes, useEffect, useRef, useState } from "react";
import { useCardsContext, useSettingsContext } from "@context";
import { TCard } from "@types";

// styles
import "./FlashCard.scss";

export function FlashCard(props: HTMLAttributes<HTMLSelectElement>) {
  const { className, ...restOfProps } = props;

  const settingsCtx = useSettingsContext();
  const cardsCtx = useCardsContext();

  const { handlePreviousCard, handleNextCard, handleFlipCard } = cardsCtx;
  const settingsState = settingsCtx.state;
  const cardsState = cardsCtx.state;

  const [selectedRangeOfCards, setSelectedRangeOfCards] = useState<TCard[]>([]);
  // get teh current card based on the settings index
  useEffect(() => {
    if (!(cardsState.currentCardsSet?.sets?.length > 0)) return;

    if (settingsState.endIndex !== settingsState.startIndex) {
      setSelectedRangeOfCards(
        cardsState.currentCardsSet.sets.slice(
          settingsState.startIndex,
          settingsState.endIndex
        )
      );
    } else {
      setSelectedRangeOfCards(cardsState.currentCardsSet.sets);
    }
  }, [
    settingsState.startIndex,
    settingsState.endIndex,
    cardsState.currentCardsSet,
  ]);

  const currentCardIndex = cardsState.currentCardIndex;

  const currentCardFront = selectedRangeOfCards[currentCardIndex]?.eng;
  const currentCardBack = selectedRangeOfCards[currentCardIndex]?.spa;
  const isCardFlipped = cardsState.isCardFlipped;

  const flashCardContentFront = useRef<any>(undefined);
  const flashCardContentBack = useRef<any>(undefined);

  // const onShowHint = () => {
  //   // setHint(true);
  // };

  // const onRevealHint = () => {
  //   // setRevealHint(true);
  // };

  const isFlippedClass = isCardFlipped ? "is-flipped" : "is-not-flipped";

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
            className='flashcard-actions action-left d-flex align-items-center justify-content-center'
            onClick={handlePreviousCard}
          >
            <span className='icon icon-chevron-back-outline color-alpha' />
          </button>
          <div
            className='flashcard-content d-flex align-items-center justify-content-start flex-column p-6'
            ref={flashCardContentFront}
          >
            <p className='color-alpha opacity-60 fs-3'>
              # {currentCardIndex + 1}
            </p>
            <h2>{currentCardFront}</h2>
          </div>
          <button
            className='flashcard-actions action-right d-flex align-items-center justify-content-center'
            onClick={handleNextCard}
          >
            <span className='icon icon-chevron-forward-outline color-alpha' />
          </button>
        </div>

        {/* back */}
        <div className='back bg-mu d-flex align-items-center justify-content-center'>
          {/* actions */}
          <button
            className='flashcard-actions action-left d-flex align-items-center justify-content-center'
            onClick={handlePreviousCard}
          >
            <span className='icon icon-chevron-back-outline color-alpha' />
          </button>
          <div className='flashcard-content p-6' ref={flashCardContentBack}>
            <p className='color-alpha fs-3 opacity-60'>
              # {currentCardIndex + 1}
            </p>
            <h2>{currentCardBack}</h2>
          </div>
          <button
            className='flashcard-actions action-right d-flex align-items-center justify-content-center'
            onClick={handleNextCard}
          >
            <span className='icon icon-chevron-forward-outline color-alpha' />
          </button>
        </div>
      </div>
    </section>
  );
}
