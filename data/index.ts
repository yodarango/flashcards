import IndependenceAngel from "@assets/images/independence_angel_small.webp";
import DowntownGDL from "@assets/images/downtown_gdl_small.webp";
import PopularityImg from "@assets/images/popularity.webp";
import { termsBySimilarity } from "./termsBySimilarity";
import { termsByPopularity } from "./termsByPopularity";
import CardPairs from "@assets/images/card_pairs.webp";
import { termsByCategory } from "./termsByCategory";
import { termsByPhrase } from "./termsByPhrase";

const allCardSets = [
  {
    id: "words-by-common-phrases",
    title: "By common phrases",
    totalTerms: "6,584",
    thumbnail: DowntownGDL,
    sets: termsByPhrase,
  },
  {
    id: "words-by-category",
    title: "By category",
    totalTerms: "11,182",
    thumbnail: IndependenceAngel,
    sets: termsByCategory,
  },
  {
    id: "words-by-similarity",
    title: "By similarity",
    totalTerms: "210",
    thumbnail: CardPairs,
    sets: termsBySimilarity,
  },
  {
    id: "words-by-popularity",
    title: "By popularity",
    totalTerms: "400+",
    thumbnail: PopularityImg,
    sets: termsByPopularity,
  },
];

export { allCardSets, termsByCategory, termsByPhrase };
