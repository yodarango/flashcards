import { CardsContextProvider } from "../../../context/SettingsContextProvider";
import { Layout } from "./Layout/Layout";

export const ViewWordsByCommonPhrasesTitle = () => {
  return (
    <CardsContextProvider>
      <Layout />
    </CardsContextProvider>
  );
};
