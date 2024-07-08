import { Link, generatePath, useParams } from "react-router-dom";
import { ROUTE_WORDS_CATEGORY, ROUTE_WORDS_CATEGORY_TITLE } from "@constants";
import { TermsSetCard } from "@components";
import { allCardSets } from "@data/index";
import { TCardSet } from "@types";

// styles
import "./Layout.scss";
import { useEffect, useState } from "react";

export const Layout = () => {
  const { category } = useParams();

  const [hasSubcategories, setHasSubcategories] = useState<boolean>(
    category === "words-by-category"
  );
  const [cardSets, setCardSets] = useState<any>([]);

  // check if this is a sub category or a main category
  useEffect(() => {
    if (category?.includes("--")) {
      const [mainCategory, subCategory] = category.split("--");

      const mainCategorySets =
        allCardSets.find((cardSet: TCardSet) => cardSet.id === mainCategory) ||
        ({} as TCardSet);

      const subCardSet: any = mainCategorySets.sets?.find(
        (cardSet: any) => cardSet.title.toLowerCase() === subCategory
      );

      setCardSets(subCardSet?.sets || []);
      setHasSubcategories(false);
    } else {
      const cardSets = allCardSets.find(
        (cardSet: TCardSet) => cardSet.id === category
      );
      setCardSets(cardSets?.sets);
    }
  }, [category]);

  return (
    <div className='layout-words-by-common-phrases-39hh'>
      {cardSets.map((cardSet: Omit<TCardSet, "totalTerms">, i: number) => {
        let setPath;

        if (hasSubcategories) {
          setPath = generatePath(ROUTE_WORDS_CATEGORY, {
            category: `${category!}--${cardSet.title
              .replace(/ /g, "-")
              .toLowerCase()}`,
          });
        } else {
          setPath = generatePath(ROUTE_WORDS_CATEGORY_TITLE, {
            title: cardSet.title.replace(/ /g, "-").toLowerCase(),
            category,
          });
        }

        return (
          <Link to={setPath} key={cardSet.id}>
            <TermsSetCard
              totalTerms={String(cardSet.sets.length)}
              thumbnail={<FallBackThumbnail title={i + 1} />}
              title={cardSet.title!}
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
