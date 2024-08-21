import { If } from "@ds";

export type TToast = {
  type?: "success" | "danger" | "warning" | "info" | "default";
  style?: React.CSSProperties;
  onClose?: () => void;
  children?: any;
  title?: string;
  icon?: string;
};

import "./Toast.scss";

export const Toast = (props: TToast) => {
  const { icon, onClose, children, title, type, style } = props;
  let cardClass;

  switch (type) {
    case "success":
      cardClass = "bg-success border border-success-80";
      break;
    case "danger":
      cardClass = "bg-danger border border-danger-80";
      break;
    case "warning":
      cardClass = "bg-warning border border-warning-80";
      break;
    case "info":
      cardClass = "bg-info border border-info-80";
      break;
    case "default":
      cardClass = "color-alpha border border-color-alpha-80";
      break;
    default:
      cardClass = "color-alpha border border-color-alpha-80";
      break;
  }

  const closeClass = !!onClose ? "py-3 ps-3 pe-1" : "p-3";
  return (
    <div
      className={`toast-04hl ${closeClass} ${cardClass} d-flex align-items-center justify-content-start gap-3 color-beta`}
      style={style}
    >
      {icon && (
        <div className='color-beta flex-shrink-0'>
          <ion-icon name={icon} />
        </div>
      )}
      <div className='w-100'>
        <div className='d-flex align-items-center justify-content-end column-gap-4'>
          <div className='w-100'>
            <h5>{title}</h5>
            <p>{children}</p>
          </div>
          <If condition={!!onClose}>
            <button
              className='btn-base flex-shrink-0 color-beta'
              onClick={onClose}
            >
              <ion-icon name='close' />
            </button>
          </If>
        </div>
      </div>
    </div>
  );
};
