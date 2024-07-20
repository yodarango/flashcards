import { ROUTE_HOME } from "@constants";
import { Link } from "react-router-dom";

// styles
import "./Header.scss";
import { HTMLProps } from "react";

export const Header = (props: HTMLProps<HTMLDialogElement>) => {
  const { className = "", ...restOfProps } = props;
  return (
    <header className={className + " header-94kt bg-gamma"} {...restOfProps}>
      <div className='w-100 p-4 header' data-styles=''>
        <Link
          to={ROUTE_HOME}
          className='color-alpha d-flex align-items-center justify-content-start gap-2'
        >
          <div className='img-logo'></div>
          <h3 className='m-0 p-0 color-font'>Polynguo</h3>
          <sup className='color-alpha'>by shrood</sup>
        </Link>
      </div>
    </header>
  );
};
