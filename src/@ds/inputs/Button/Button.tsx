import { Button as MButton, ButtonProps } from "@mui/base/Button";
import { Loading } from "../../";
import "./Button.scss";

interface IButton {
  maxWidth?: string | number;
  minWidth?: string | number;
  secondary?: boolean;
  loading?: boolean;
  primary?: boolean;
  success?: boolean;
  danger?: boolean;
}

export const Button = (props: IButton & ButtonProps) => {
  const {
    className = "",
    secondary,
    maxWidth,
    minWidth,
    children,
    disabled,
    primary,
    success,
    loading,
    danger,
    style,
    ...rest
  } = props;

  const color = secondary
    ? "secondary"
    : danger
    ? "danger"
    : success
    ? "success"
    : primary
    ? "primary"
    : "default";

  const trueMaxWidth =
    typeof maxWidth === "string"
      ? maxWidth
      : typeof maxWidth === "number"
      ? `${maxWidth * 0.1}rem`
      : "";

  const trueMinWidth =
    typeof minWidth === "string"
      ? minWidth
      : typeof minWidth === "number"
      ? `${minWidth * 0.1}rem`
      : "";

  const trueClassName = maxWidth ? className + " w-100" : className;

  return (
    <MButton
      {...rest}
      disabled={loading || disabled}
      className={`d-flex align-items-center justify-content-center ${trueClassName} ${color}`}
      style={{ ...style, maxWidth: trueMaxWidth, minWidth: trueMinWidth }}
    >
      {loading && <Loading type='small' className='me-2' primary={success} />}
      {!loading && children}
    </MButton>
  );
};
