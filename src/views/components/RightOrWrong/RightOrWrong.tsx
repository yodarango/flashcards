import { useCardsContext } from "@context";
import { HTMLAttributes } from "react";
import { Button } from "@ds";

// styles
import "./RightOrWrong.scss";

export const RightOrWrong = (props: HTMLAttributes<HTMLSelectElement>) => {
  const { className = "", ...restOfProps } = props;

  const { handleCorrectGuess, handleWrongGuess } = useCardsContext();

  return (
    <section
      className={`${className} right-or-wrong-00ex d-flex align-items-center justify-content-center column-gap-4 mx-auto`}
      {...restOfProps}
    >
      <Button onClick={handleWrongGuess} className='color-alpha w-100' danger>
        <span className='icon icon-close-outline color-alpha' />
        <span>Wrong</span>
      </Button>
      <Button onClick={handleCorrectGuess} className='color-beta w-100' success>
        <span className='icon icon-checkmark-outline color-beta' />
        <span>Correct</span>
      </Button>
    </section>
  );
};
