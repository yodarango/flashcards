import { useCardsContext } from "./context/CardsContextProvider";

// styles
import "./CardSetMeta.scss";
import { HTMLAttributes } from "react";

export const CardSetMeta = (props: HTMLAttributes<HTMLDivElement>) => {
  const { className, ...restOfProps } = props;

  const ctx = useCardsContext();
  const { state } = ctx;

  const currentSetOfCards = state.allCards.slice(
    state.startIndex,
    state.endIndex
  );

  const currentIndex = state.currentCardIndex;
  const totalCards = currentSetOfCards.length;
  const isShufflingOn = state.isSufflingOn;
  const setName = state.cardSetName;

  const shuffleLabel = isShufflingOn ? "Shuffle on" : "Shuffle off";
  const buttonShuffle = isShufflingOn
    ? "color-epsilon"
    : "color-alpha opacity-60";

  return (
    <div className={`cards-metta-20pt ${restOfProps}`} {...restOfProps}>
      <h3>{setName}</h3>
      <div className='d-flex align-items-center justify-content-between gap-4 bg-gamma px-4 py-2'>
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
