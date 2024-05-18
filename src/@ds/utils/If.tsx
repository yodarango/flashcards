/***********************************************************************************************
 * Will render children if condition is true, otherwise returns <> </> 🥐
 * **********************************************************************
 *
 */

import { ReactNode } from "react";

type TIf = {
  condition: boolean;
  children: ReactNode | JSX.Element | string | number;
};
export const If = ({ condition, children }: TIf) => {
  if (condition) return <>{children}</>;
  return <></>;
};
