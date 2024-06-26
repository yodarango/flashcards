import { HTMLProps } from "react";
import { Thumbnail } from "../../@ds/dataDisplay";

// styles
import "./TermsSetCard.scss";

type TermsSetCardProps = {
  thumbnail: string | JSX.Element | React.ReactNode;
  totalTerms: string;
  title: string;
} & HTMLProps<HTMLDivElement>;

export const TermsSetCard = (props: TermsSetCardProps) => {
  const {
    className = "",
    totalTerms,
    thumbnail,
    title,
    ...restOfProps
  } = props;
  return (
    <div
      className={"terms-set-card-11gt p-4 bg-gamma rounded " + className}
      {...restOfProps}
    >
      {typeof thumbnail === "string" && (
        <Thumbnail
          src={thumbnail}
          className='rounded mb-2'
          height={"20rem"}
          width={"100%"}
          alt=''
        />
      )}
      {typeof thumbnail !== "string" && (
        <div className='terms-set-card-11gt__raw-thumbnail d-flex align-items-center justify-content-center rounded mb-2'>
          {thumbnail}
        </div>
      )}
      <h4 className='mb-2'>{title}</h4>
      <p className='opacity-80'>Total words: {totalTerms}</p>
    </div>
  );
};
