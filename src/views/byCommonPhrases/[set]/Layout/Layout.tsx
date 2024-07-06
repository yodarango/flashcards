import { CardsContextProvider, SettingsContextProvider } from "@context";
import { Container } from "@views/components";

export const Layout = () => {
  return (
    <SettingsContextProvider>
      <CardsContextProvider>
        <Container />
      </CardsContextProvider>
    </SettingsContextProvider>
  );
};
