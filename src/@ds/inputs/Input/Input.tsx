import { Input as MInput, InputProps } from "@mui/base/Input";
import "./Input.scss";

interface IInput {
  borderless?: boolean | string;
  shineOnFocus?: boolean;
  danger?: boolean;
}
export const Input = (props: InputProps & IInput) => {
  const { danger, className, shineOnFocus = true, ...rest } = props;

  const shineOnFocusClass = shineOnFocus ? "shine-on-focus" : "";
  const dangerClass = danger ? "danger" : "";

  return (
    <MInput
      {...rest}
      className={`${dangerClass} ${shineOnFocusClass} ${className}`}
    />
  );
};
