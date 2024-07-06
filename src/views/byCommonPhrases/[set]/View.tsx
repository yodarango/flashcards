import { CardsContextProvider } from "@context";
import { Layout } from "./Layout/Layout";

export const ViewWordsByCommonPhrasesTitle = () => {
  return (
    <CardsContextProvider>
      <Layout />
    </CardsContextProvider>
  );
};
