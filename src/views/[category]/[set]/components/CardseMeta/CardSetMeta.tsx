import { useCardsContext } from "@context";
import { HTMLAttributes } from "react";

// styles
import "./CardSetMeta.scss";
import { Link, generatePath, useParams } from "react-router-dom";
import { ROUTE_WORDS_CATEGORY } from "@constants";

export const CardSetMeta = (props: HTMLAttributes<HTMLDivElement>) => {
  const { className, ...restOfProps } = props;

  const { category } = useParams();

  const categoryPath = generatePath(ROUTE_WORDS_CATEGORY, {
    category,
  });

  const cardsCtx = useCardsContext();

  const cardsState = cardsCtx.state;

  const currentIndex = cardsState.currentCardIndex + 1;
  const isShufflingOn = cardsState.isShufflingOn;
  const setName = cardsState.currentCardsSet.title;
  let totalCards = cardsState.totalCards;

  const shuffleLabel = isShufflingOn ? "Shuffle on" : "Shuffle off";
  const buttonShuffle = isShufflingOn
    ? "color-epsilon"
    : "color-alpha opacity-60";

  return (
    <div className={`cards-metta-20pt ${restOfProps}`} {...restOfProps}>
      <div className='d-flex align-items-center justify-content-between'>
        <Link to={`${categoryPath}`}>
          <button className='m-0 p-0 bg-nu color-alpha'>
            <ion-icon name='chevron-back-outline' />
          </button>
        </Link>
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
