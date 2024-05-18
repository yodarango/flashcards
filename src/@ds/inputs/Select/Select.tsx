import { Select as MSelect, SelectProps } from "@mui/base/Select";
import { Option as MOption, OptionProps } from "@mui/base/Option";

import "./Select.scss";

export const Select = (props: SelectProps<any, any>) => {
  return <MSelect {...props} />;
};

export const Option = (props: OptionProps<any, any>) => {
  return <MOption {...props} />;
};
