import { Portal, PortalProps } from "@mui/base/Portal";
import { If } from "../../utils";
import "./Modal.scss";

type TModal = {
  contentContainerStyle?: Record<string, any>;
  showCloseButton?: boolean;
  bodyMaxHeight?: string;
  onClose: () => void;
  showWaves?: boolean;
  zIndex?: number;
  children: any;
  open: boolean;
  title: string;
  top?: number;
} & PortalProps;

export const Modal = (props: TModal) => {
  const {
    contentContainerStyle = {},
    showCloseButton = true,
    bodyMaxHeight = "",
    showWaves = true,
    zIndex = 10,
    children,
    onClose,
    title,
    open,
    top,
    ...rest
  } = props;

  const trueMaxHeight =
    typeof bodyMaxHeight === "string"
      ? bodyMaxHeight
      : `${bodyMaxHeight * 0.1}rem`;
  return (
    <Portal {...rest}>
      <If condition={open}>
        <div
          style={{
            top: `${top}vh`,
            zIndex: zIndex + 1,
          }}
          className='shrood-modal-0elj'
        >
          <div
            className='shrood-modal-0elj__content p-6'
            style={{
              maxHeight: trueMaxHeight,
              zIndex: zIndex + 1,
              top: `${top}vh`,
            }}
          >
            <If condition={showCloseButton}>
              <button
                className='shrood-modal-0elj__close color-alpha bg-nu'
                onClick={onClose}
              >
                <ion-icon name='close' />
              </button>
            </If>
            <h4 className='mb-2 text-center mb-6 px-4'>{title}</h4>
            <div
              className='shrood-modal-0elj-content__content'
              style={{ ...contentContainerStyle }}
            >
              {children}
            </div>
          </div>
          <div
            className='shrood-modal-0elj__backdrop'
            onClick={onClose}
            style={{ zIndex }}
          ></div>
        </div>
      </If>
    </Portal>
  );
};
