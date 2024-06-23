import { useCardsContext } from "./context/CardsContextProvider";
import { useRef, useState } from "react";
import { Thumbnail } from "@ds";

// styles
import "./CardsSets.scss";

export const CardsSets = () => {
  const ctx = useCardsContext();

  const { handleSelectCardSet } = ctx;
  const { allCardSets } = ctx.state;

  const cardContent = useRef<HTMLDivElement | null>(null);

  const [imgHeight, setImgHeight] = useState(0);

  // height of the image should be the same as the width
  // to maintain the aspect ratio
  const handleImageLoad = () => {
    if (cardContent.current) {
      const img = cardContent.current.querySelector("img");
      if (img) {
        setImgHeight(img.clientWidth);
      }
    }
  };

  return (
    <div
      className='card-sets-67th d-flex align-items-center justify-content-center flex-wrap gap-4 pt-8'
      onLoad={handleImageLoad}
    >
      {allCardSets.map((cardSet) => (
        <div
          className='card-set-67th__set p-4 bg-gamma rounded'
          onClick={() => handleSelectCardSet(cardSet.id)}
          ref={cardContent}
          key={cardSet.id}
        >
          <div className='card-set-67th__thumbnail' />
          <h3>{cardSet.title}</h3>
        </div>
      ))}
    </div>
  );
};
