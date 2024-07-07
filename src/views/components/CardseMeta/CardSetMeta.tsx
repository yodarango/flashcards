import { useCardsContext, useSettingsContext } from "@context";
import { HTMLAttributes } from "react";

// styles
import "./CardSetMeta.scss";

export const CardSetMeta = (props: HTMLAttributes<HTMLDivElement>) => {
  const { className, ...restOfProps } = props;

  const settingsCtx = useSettingsContext();
  const cardsCtx = useCardsContext();

  const settingsState = settingsCtx.state;
  const cardsState = cardsCtx.state;

  const currentIndex = cardsState.currentCardIndex + 1;
  const isShufflingOn = settingsState.isShufflingOn;
  const setName = cardsState.currentCardsSet.title;
  let totalCards = cardsState.totalCards;

  // only change the end index if the start index is different from the end index
  if (settingsState.startIndex !== settingsState.endIndex) {
    const startIndex =
      settingsState.startIndex === 0 ? 0 : settingsState.startIndex - 1;

    totalCards = settingsState.endIndex - startIndex;
  }

  const shuffleLabel = isShufflingOn ? "Shuffle on" : "Shuffle off";
  const buttonShuffle = isShufflingOn
    ? "color-epsilon"
    : "color-alpha opacity-60";

  return (
    <div className={`cards-metta-20pt ${restOfProps}`} {...restOfProps}>
      <div className='d-flex align-items-center justify-content-between'>
        <button
          className='m-0 p-0 bg-nu'
          //onClick={handleReset}
        >
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
