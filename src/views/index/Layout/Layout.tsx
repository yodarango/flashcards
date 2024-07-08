import { Link, generatePath } from "react-router-dom";
import { ROUTE_WORDS_CATEGORY } from "@constants";
import { TermsSetCard } from "@components";
import { TCardSet } from "@types";
import { allCardSets } from "@data";

// styles
import "./Layout.scss";

export const Layout = () => {
  return (
    <div className='card-sets-67th d-flex align-items-center justify-content-center flex-wrap gap-4 pt-8'>
      {allCardSets.map((cardSet: TCardSet) => {
        const cardSetPath = generatePath(ROUTE_WORDS_CATEGORY, {
          category: cardSet.id,
        });

        console.log("cardSetPath", cardSetPath);
        return (
          <Link to={cardSetPath} key={cardSet.id}>
            <TermsSetCard
              totalTerms={cardSet.totalTerms}
              thumbnail={cardSet.thumbnail}
              title={cardSet.title}
            />
          </Link>
        );
      })}
    </div>
  );
};
