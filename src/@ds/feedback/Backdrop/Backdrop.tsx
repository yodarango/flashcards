import { cloneElement } from "react";
import { If, Portal } from "@ds";

// styles
import "./Backdrop.scss";

type TBackdropProps = {
  backgroundColorClassName?: string;
  maxWidth?: string | number;
  onHeaderClose?: () => void;
  onClose?: () => void;
  height?: string;
  zIndex?: number;
  children?: any;
  width?: string;
  open: boolean;
  top?: string;
};

export const Backdrop = (props: TBackdropProps) => {
  const {
    backgroundColorClassName = "bg-beta",
    maxWidth = "80rem",
    height = "80vh",
    width = "90vw",
    onHeaderClose,
    top = "10vh",
    zIndex = 11,
    children,
    onClose,
    open,
    ...rest
  } = props;

  const trueMaxWidth =
    typeof maxWidth === "number" ? `${maxWidth * 0.1}rem` : maxWidth;

  let headerChild: JSX.Element = <></>;

  // check that there are at least two children
  if (Array.isArray(children) && children.length > 1) {
    headerChild = children.find(
      (child: JSX.Element) => child.type.name === "BackdropHeader"
    );
  } else {
    if (children.type.name === "BackdropHeader") headerChild = children;
  }

  headerChild = cloneElement(headerChild, {
    onClose: onHeaderClose || onClose,
  });

  // check that there are at least two children
  let childrenWithoutHeader: JSX.Element[] = [];
  if (Array.isArray(children) && children.length > 1) {
    childrenWithoutHeader = children?.filter(
      (child: JSX.Element) => child.type.name !== "BackdropHeader"
    );
  } else {
    if (children.type.name !== "BackdropHeader")
      childrenWithoutHeader = children;
  }

  return (
    <Portal {...rest}>
      <If condition={open}>
        <div className='shrood-backdrop-88ka' style={{ zIndex }}>
          <div
            className={`shrood-backdrop-88ka__content rounded-3 ${backgroundColorClassName}`}
            style={{
              maxWidth: trueMaxWidth,
              zIndex: zIndex + 1,
              top: top || "10vh",
              height,
              width,
            }}
          >
            <If condition={!!headerChild}>{headerChild}</If>
            <div className='shrood-backdrop-88ka-content__content'>
              {childrenWithoutHeader}
            </div>
          </div>
          <div
            className='shrood-backdrop-88ka__backdrop'
            onClick={onClose}
            style={{ zIndex }}
          />
        </div>
      </If>
    </Portal>
  );
};
