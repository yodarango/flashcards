import { CardsContextProvider } from "../../../context/CardsContextProvider";
import { Layout } from "./Layout/Layout";

export const ViewWordsByCommonPhrasesTitle = () => {
  return (
    <CardsContextProvider>
      <Layout />
    </CardsContextProvider>
  );
};
