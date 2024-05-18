import { HTMLAttributes, useState } from "react";

// styles
import "./FlashCard.scss";

export function FlashCard(props: HTMLAttributes<HTMLSelectElement>) {
  const { className, ...restOfProps } = props;

  const [isFlipped, setIsFlipped] = useState<boolean>(false);

  const handleNextCard = () => {
    // if (cardIndex < shuffledItems.length - 1) {
    //   setCardIndex(cardIndex + 1);
    // }
  };

  const handlePreviousCard = () => {
    // if (cardIndex > 0) {
    //   setCardIndex(cardIndex - 1);
    // }
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
          <button className='flashcard-actions action-left d-flex align-items-center justify-content-center'>
            <span className='icon icon-chevron-back-outline color-alpha' />
          </button>
          <button className='flashcard-actions action-right d-flex align-items-center justify-content-center'>
            <span className='icon icon-chevron-forward-outline color-alpha' />
          </button>
        </div>

        {/* back */}
        <div className='back bg-mu d-flex align-items-center justify-content-center'>
          {/* actions */}
          <button className='flashcard-actions action-left d-flex align-items-center justify-content-center'>
            <span className='icon icon-chevron-back-outline color-alpha' />
          </button>
          <button className='flashcard-actions action-right d-flex align-items-center justify-content-center'>
            <span className='icon icon-chevron-forward-outline color-alpha' />
          </button>
        </div>
      </div>
    </section>
  );
}
