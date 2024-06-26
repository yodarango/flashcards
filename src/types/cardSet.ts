import { TCard } from "./card";

export type TCardSet = {
  sets: TCard[] | TCardSet[];
  totalTerms: string;
  thumbnail?: string;
  title: string;
  slug?: string;
  id: string;
};
