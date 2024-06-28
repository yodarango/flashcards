import { useCardsContext } from "@context";
import { HTMLAttributes } from "react";

// styles
import "./CardSetMeta.scss";

export const CardSetMeta = (props: HTMLAttributes<HTMLDivElement>) => {
  const { className, ...restOfProps } = props;

  const ctx = useCardsContext();
  const { handleReset, state } = ctx;

  const currentSetOfCards = state.allCards.slice(
    state.startIndex,
    state.endIndex
  );

  const currentIndex = state.currentCardIndex + 1;
  const totalCards = currentSetOfCards.length + 1;
  const isShufflingOn = state.isShufflingOn;
  const setName = state.cardSetName;

  const shuffleLabel = isShufflingOn ? "Shuffle on" : "Shuffle off";
  const buttonShuffle = isShufflingOn
    ? "color-epsilon"
    : "color-alpha opacity-60";

  return (
    <div className={`cards-metta-20pt ${restOfProps}`} {...restOfProps}>
      <div className='d-flex align-items-center justify-content-between'>
        <button onClick={handleReset} className='m-0 p-0 bg-nu'>
          <span className='icon icon-chevron-back-outline color-alpha' />
        </button>
        <h3 className='text-center mb-4'>{setName}</h3>
        <div />
      </div>
      <div className='cards-metta-20pt__score d-flex align-items-center justify-content-between gap-4 bg-gamma px-4 py-2'>
        <h5>
          {currentIndex} of {totalCards}
        </h5>
        <div className='d-flex align-items-center justify-content-center gap-1'>
          <span className={buttonShuffle}>&#10687;</span>
          <p>{shuffleLabel}</p>
        </div>
      </div>
    </div>
  );
};
