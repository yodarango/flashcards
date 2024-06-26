import { TermsSetCard } from "@components";
import { Link } from "react-router-dom";
import { TCardSet } from "@types";

const allCardSets: TCardSet[] = [
  {
    slug: ROUTE_WORDS_BY_COMMON_PHRASES,
    id: "words-by-common-phrases",
    title: "By common phrases",
    totalTerms: "6,584",
    thumbnail: "https://picsum.photos/300/300",
    sets: [],
  },
  {
    slug: ROUTE_WORDS_BY_CATEGORY,
    id: "words-by-category",
    title: "By category",
    totalTerms: "11,182",
    thumbnail: "https://picsum.photos/300/300",
    sets: [],
  },
];

// styles
import "./Layout.scss";
import {
  ROUTE_WORDS_BY_CATEGORY,
  ROUTE_WORDS_BY_COMMON_PHRASES,
} from "@constants";

export const Layout = () => {
  // this is here in case I want to allow users to upload their own cards in the future
  // const [imgHeight, setImgHeight] = useState(0);

  // // height of the image should be the same as the width
  // // to maintain the aspect ratio
  // const handleImageLoad = () => {
  //   if (cardContent.current) {
  //     const img = cardContent.current.querySelector("img");
  //     if (img) {
  //       setImgHeight(img.clientWidth);
  //     }
  //   }
  // };

  return (
    <div
      className='card-sets-67th d-flex align-items-center justify-content-center flex-wrap gap-4 pt-8'
      // onLoad={handleImageLoad}
    >
      {allCardSets.map((cardSet: TCardSet) => (
        <Link to={cardSet.slug!} key={cardSet.id}>
          <TermsSetCard
            totalTerms={cardSet.totalTerms}
            thumbnail={cardSet.thumbnail}
            title={cardSet.title}
          />
        </Link>
      ))}
    </div>
  );
};
