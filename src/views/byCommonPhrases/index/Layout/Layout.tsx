import { ROUTE_WORDS_BY_COMMON_PHRASES_TITLE } from "@constants";
import { Link, generatePath } from "react-router-dom";
import { termsByPhrase as cardSets } from "@data";
import { TermsSetCard } from "@components";
import { TCardSet } from "@types";

// styles
import "./Layout.scss";

export const Layout = () => {
  return (
    <div className='layout-words-by-common-phrases-39hh'>
      {cardSets.map((cardSet: Omit<TCardSet, "totalTerms">, i: number) => {
        const setPath = generatePath(ROUTE_WORDS_BY_COMMON_PHRASES_TITLE, {
          title: cardSet.title.replace(/ /g, "-").toLowerCase(),
        });

        return (
          <Link to={setPath}>
            <TermsSetCard
              totalTerms={String(cardSet.sets.length)}
              thumbnail={<FallBackThumbnail title={i + 1} />}
              title={cardSet.title}
              key={cardSet.id}
            />
          </Link>
        );
      })}
    </div>
  );
};

function FallBackThumbnail({ title }: { title: number }) {
  const randomPastelColors = [
    "#ffadad",
    "#ffd6a5",
    "#fdffb6",
    "#caffbf",
    "#9bf6ff",
    "#a0c4ff",
    "#bdb2ff",
    "#c8b6ff",
    "#ffc6ff",
    "#fffffc",
  ];
  return (
    <div
      className='d-flex align-items-center justify-content-center'
      style={{
        backgroundColor:
          randomPastelColors[
            Math.floor(Math.random() * randomPastelColors.length)
          ],
        height: "100%",
        width: "100%",
      }}
    >
      <h1 className='text-center color-beta'>{title}</h1>
    </div>
  );
}
