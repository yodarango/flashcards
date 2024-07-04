import { SettingsContextProvider } from "@context";
import { Container } from "@views/components";

export const Layout = () => {
  return (
    <SettingsContextProvider>
      <Container />
    </SettingsContextProvider>
  );
};
