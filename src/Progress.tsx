import { useState, useEffect, HTMLAttributes } from "react";

import "./Progress.scss";
import { useCardsContext } from "./context/CardsContextProvider";

export function Progress(props: HTMLAttributes<HTMLSelectElement>) {
  const ctx = useCardsContext();
  const { handleToggleSettingsModal } = ctx;

  const { className, ...restOfProps } = props;
  let totalCards = 0,
    wrongAmount = 0,
    correctAmount = 0;

  const [correctBarPercentage, setCorrectBarPercentage] = useState(50);
  const [wrongBarPercentage, setWrongBarPercentage] = useState(50);
  const [allCorrect, setAllCorrect] = useState(false);
  const [allWrong, setAllWrong] = useState(false);

  useEffect(() => {
    const totalCardsGuessed = wrongAmount + correctAmount;

    if (
      totalCards > 0 &&
      totalCardsGuessed > 0 &&
      (correctAmount > 0 || wrongAmount > 0)
    ) {
      setCorrectBarPercentage((correctAmount / totalCardsGuessed) * 100);
      setWrongBarPercentage((wrongAmount / totalCardsGuessed) * 100);
      setAllCorrect(wrongAmount === 0 && correctAmount > 0);
      setAllWrong(correctAmount === 0 && wrongAmount > 0);
    } else {
      setWrongBarPercentage(50);
      setCorrectBarPercentage(50);
    }
  }, [totalCards, wrongAmount, correctAmount]);

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
          <b>{wrongAmount}</b>
        </div>
        {/* settings */}
        <button
          className='progress-72lh__settings p-0 m-0 d-flex align-items-center justify-content-center bg-gamma'
          onClick={handleToggleSettingsModal}
        >
          <span className='icon icon-settings-outline' />
        </button>
        {/* correct */}
        <div
          className={`d-flex align-items-center justify-content-end bar right correct bg-success p-3 color-beta ${
            allCorrect ? "full-bar" : ""
          }`}
          style={{ width: `${correctBarPercentage}%` }}
        >
          <b>{correctAmount}</b>
        </div>
      </div>
    </section>
  );
}
