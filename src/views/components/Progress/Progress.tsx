import { useState, useEffect, HTMLAttributes } from "react";
import { Settings } from "../Settings/Settings";
import { useCardsContext } from "@context";

import "./Progress.scss";

export function Progress(props: HTMLAttributes<HTMLSelectElement>) {
  const ctx = useCardsContext();

  const { className, ...restOfProps } = props;

  const totalCards = ctx.state?.currentCardsSet?.sets || [];
  const totalCorrect = ctx.state.totalCorrect;
  const totalWrong = ctx.state.totalWrong;

  const [correctBarPercentage, setCorrectBarPercentage] = useState(50);
  const [wrongBarPercentage, setWrongBarPercentage] = useState(50);
  const [allCorrect, setAllCorrect] = useState(false);
  const [allWrong, setAllWrong] = useState(false);

  // update the percentage of correct and wrong guesses every time the state changes
  function updatePercentage() {
    const totalCardsGuessed = totalWrong + totalCorrect;

    // only calculate the percentage if there are cards and guesses
    if (totalCards.length > 0 && totalCardsGuessed > 0) {
      setCorrectBarPercentage((totalCorrect / totalCardsGuessed) * 100);
      setWrongBarPercentage((totalWrong / totalCardsGuessed) * 100);
      setAllCorrect(totalWrong === 0 && totalCorrect > 0);
      setAllWrong(totalCorrect === 0 && totalWrong > 0);
    } else {
      setWrongBarPercentage(50);
      setCorrectBarPercentage(50);
    }
  }

  useEffect(updatePercentage, [totalCards, totalWrong, totalCorrect]);

  return (
    <section className={`${className} progress-72lh`} {...restOfProps}>
      <div className='w-100 d-flex align-items-center justify-content-center'>
        {/* wrong */}
        <div
          className={`d-flex align-items-center justify-content-start bar left wrong bg-danger p-3 color-beta ${
            allWrong ? "full-bar" : ""
          }`}
          style={{ width: `${wrongBarPercentage}%` }}
        >
          <b>{totalWrong}</b>
        </div>

        {/* settings */}
        {/* <Settings /> */}

        {/* correct */}
        <div
          className={`d-flex align-items-center justify-content-end bar right correct bg-success p-3 color-beta ${
            allCorrect ? "full-bar" : ""
          }`}
          style={{ width: `${correctBarPercentage}%` }}
        >
          <b>{totalCorrect}</b>
        </div>
      </div>
    </section>
  );
}
