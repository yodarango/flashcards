import IndependenceAngel from "@assets/images/independence_angel_small.webp";
import DowntownGDL from "@assets/images/downtown_gdl_small.webp";
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
];

export { allCardSets, termsByCategory, termsByPhrase };
