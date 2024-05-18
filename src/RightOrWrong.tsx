import { Button } from "@ds";

// styles
import "./RightOrWrong.scss";
import { HTMLAttributes } from "react";

export const RightOrWrong = (props: HTMLAttributes<HTMLSelectElement>) => {
  const { className = "", ...restOfProps } = props;
  return (
    <section
      className={`${className} right-or-wrong-00ex d-flex align-items-center justify-content-center column-gap-4 mx-auto`}
      {...restOfProps}
    >
      <Button className='color-beta w-100' success>
        <span className='icon icon-checkmark-outline color-beta' />
        <span>Right</span>
      </Button>
      <Button className='color-alpha w-100' danger>
        <span className='icon icon-close-outline color-alpha' />
        <span>Wrong</span>
      </Button>
    </section>
  );
};
