/**************************************************************************************************************************
 * This layout accounts for a one livel object where the terms to be quizzed are nested within within the first level
 * and the object where the terms are nested within the second level. 🦚
 * *********************************************************************
 *
 */

import { ByPopularity } from "../components/ByPopularity";
import { ByCategory } from "../components/ByCategory";
import { LOCAL_STORAGE_KEY } from "@constants";
import { useParams } from "react-router-dom";
import { IfElse } from "@ds";

// styles
import "./Layout.scss";

export const Layout = () => {
  const { category } = useParams();

  // the data object that holds the terms by category has nested card sets, therefore selecting one
  // will not  load the cards to be quizzed
  const hasSubcategories = category?.includes("words-by-category");

  // every time a user lands here, make sure that the local storage is cleared
  // to avoid any data that may have been stored from the previous session
  localStorage.removeItem(LOCAL_STORAGE_KEY);

  return (
    <div className='layout-select-category-39hh'>
      <IfElse condition={!!hasSubcategories}>
        <ByCategory />
        <ByPopularity />
      </IfElse>
    </div>
  );
};
