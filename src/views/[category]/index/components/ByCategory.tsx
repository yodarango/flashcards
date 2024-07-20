import { Link, generatePath, useParams } from "react-router-dom";
import { ROUTE_WORDS_CATEGORY, ROUTE_WORDS_CATEGORY_TITLE } from "@constants";
import { format as utilsFormat } from "@utils";
import { useEffect, useState } from "react";
import { TermsSetCard } from "@components";
import { allCardSets } from "@data/index";
import { TCardSet } from "@types";

export const ByCategory = () => {
  const { category } = useParams();

  const hasSubsets = category?.includes("--");

  const [cardSets, setCardSets] = useState<any>([]);
  const format = utilsFormat();

  // check if this is a sub category or a main category
  useEffect(() => {
    if (!category) return;

    // split the category into main and sub category
    const [mainCategory, subCategory] = category.split("--");
    // find the main category in the set
    const mainCategorySet =
      allCardSets.find((cardSet: TCardSet) => cardSet.id === mainCategory) ||
      ({} as TCardSet);

    if (subCategory) {
      // find the sub category in the main category
      const subCardSet: any = mainCategorySet.sets?.find(
        (cardSet: any) => cardSet.title.toLowerCase() === subCategory
      );

      setCardSets(subCardSet.sets);
    } else {
      // sum up the total cards in the sets
      const setsWithTotalTerms = mainCategorySet.sets.map(
        (set: Record<string, any>) => {
          const totalTerms: number = set.sets.reduce(
            (acc: number, set: any) => acc + set.sets?.length,
            0
          );

          set.totalTerms = format.thousandSeparator(totalTerms);
          return set;
        }
      );

      setCardSets(setsWithTotalTerms);
    }
  }, [category]);

  return (
    <div className='layout-words-by-category-07pt'>
      {cardSets.map((cardSet: TCardSet, i: number) => {
        let setPath;

        if (!hasSubsets) {
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
              totalTerms={String(cardSet.totalTerms || cardSet.sets.length)}
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
