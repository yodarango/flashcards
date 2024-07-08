import { CardsContextProvider } from "@context";
import { Layout } from "./Layout/Layout";

export const ViewWordsByCategorySet = () => {
  return (
    <CardsContextProvider>
      <Layout />
    </CardsContextProvider>
  );
};
