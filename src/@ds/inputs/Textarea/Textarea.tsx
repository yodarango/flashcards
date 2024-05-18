import {
  TextareaAutosize as MTextareaAutosize,
  TextareaAutosizeProps,
} from "@mui/base/TextareaAutosize";

import "./Textarea.scss";

interface ITextarea {
  danger?: boolean;
  bordered?: boolean;
}
export const Textarea = (props: TextareaAutosizeProps & ITextarea) => {
  const { danger, bordered, className, ...rest } = props;

  const dangerClass = danger ? "danger" : bordered ? "bordered" : "";
  return (
    <MTextareaAutosize
      {...rest}
      className={`textarea-shrood-47ks ${className} ${dangerClass}`}
    />
  );
};
