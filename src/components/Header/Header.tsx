import PolynguoLogo from "@assets/images/polynguo_logo.webp";
import { ROUTE_HOME } from "@constants";
import { Link } from "react-router-dom";
import { HTMLProps } from "react";
import { Thumbnail } from "@ds";

// styles
import "./Header.scss";

export const Header = (props: HTMLProps<HTMLDialogElement>) => {
  const { className = "", ...restOfProps } = props;
  return (
    <header className={className + " header-94kt bg-gamma"} {...restOfProps}>
      <div className='w-100 p-4 header' data-styles=''>
        <div className='d-flex align-items-center justify-content-start gap-2'>
          <Link to={ROUTE_HOME} className='color-alpha'>
            <div className='img-logo'>
              <Thumbnail
                src={PolynguoLogo}
                alt="Shrood's Polynguo logo"
                width='100%'
              />
            </div>
          </Link>

          <h3 className='m-0 p-0 color-font'>Polynguo</h3>
          <sup className='color-alpha'>by shrood</sup>
        </div>
      </div>
    </header>
  );
};
