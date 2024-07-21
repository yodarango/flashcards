import { termsByCategory } from "./termsByCategory";
import { termsByPhrase } from "./termsByPhrase";

const allCardSets = [
  {
    id: "words-by-common-phrases",
    title: "By common phrases",
    totalTerms: "6,584",
    thumbnail: "https://picsum.photos/300/300",
    sets: termsByPhrase,
  },
  {
    id: "words-by-category",
    title: "By category",
    totalTerms: "11,182",
    thumbnail: "https://picsum.photos/300/300",
    sets: termsByCategory,
  },
];

export { allCardSets, termsByCategory, termsByPhrase };
