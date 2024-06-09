import { useCardsContext } from "./context/CardsContextProvider";
import { Button, If } from "@ds";

import "./Finish.scss";

export const Finish = () => {
  const ctx = useCardsContext();

  const { handleRedoWrongGuessesOnly, resetStateAndStartOver } = ctx;

  const totalCorrect = ctx.state.totalCorrect;
  const totalWrong = ctx.state.totalWrong;

  const totalCardsGuessed = totalWrong + totalCorrect;

  let correctPercentage = (totalCorrect / totalCardsGuessed || 0) * 100;
  let wrongPercentage = (totalWrong / totalCardsGuessed || 0) * 100;

  if (totalCardsGuessed === 0) {
    correctPercentage = 50;
    wrongPercentage = 50;
  }

  correctPercentage = Math.round(correctPercentage);
  wrongPercentage = Math.round(wrongPercentage);

  const allRightOrWrong =
    totalCorrect === totalCardsGuessed || totalWrong === totalCardsGuessed;
  const allRightOrWrongClass = allRightOrWrong ? "all-right-or-wrong" : "";

  return (
    <section className='finish-55th mt-8'>
      {/* svg animation */}
      <div className='success-container'>
        <div className='action'>
          <div className='action_checkmark'>
            <svg width='100%' height='100%' viewBox='0 0 24 24'>
              <path d='M12,2A10,10 0 0,1 22,12A10,10 0 0,1 12,22A10,10 0 0,1 2,12A10,10 0 0,1 12,2M11,16.5L18,9.5L16.59,8.09L11,13.67L7.91,10.59L6.5,12L11,16.5Z' />
            </svg>
          </div>
          <div className='confetti' />
          <div className='confetti two' />
          <div className='confetti three' />
          <div className='confetti four' />
          <div className='confetti--purple' />
          <div className='confetti--purple two' />
          <div className='confetti--purple three' />
          <div className='confetti--purple four' />
        </div>
      </div>

      <h3 className='text-center my-6'>You rock!</h3>
      <article className='finish-55th__results p-4 rounded bg-gamma m-auto'>
        <h4 className='text-center mb-4'>Your results</h4>
        <div className='results__percentages d-flex align-items-center justify-content-center mb-4'>
          <If condition={correctPercentage > 0}>
            <div
              className={`results__positive w-50 text-center p-4 bg-success fw-8 color-beta ${allRightOrWrongClass}`}
              style={{ width: `${correctPercentage}%` }}
            >
              {correctPercentage}%
            </div>
          </If>
          <If condition={wrongPercentage > 0}>
            <div
              className={`results__negative w-50 text-center p-4 bg-danger fw-8 color-beta ${allRightOrWrongClass}`}
              style={{ width: `${wrongPercentage}%` }}
            >
              {wrongPercentage}%
            </div>
          </If>
        </div>
        <Button primary className='w-100 mb-2' onClick={resetStateAndStartOver}>
          Start over
        </Button>
        <If condition={totalWrong > 0}>
          <Button
            onClick={handleRedoWrongGuessesOnly}
            className='w-100'
            secondary
          >
            Quiz on wrong answers only
          </Button>
        </If>
      </article>
    </section>
  );
};
