/*****************************************************************************************
 * If Else component that renders the first component if the value is true and the second
 *  component if the value is false 🐺
 *v************************************
 */

export type TIfElse = {
  condition: boolean;
  children: any;
};
export const IfElse = ({ children, condition }: TIfElse) => {
  if (condition) return children[0];
  else return children[1];
};
