import { CardsContextProvider } from "@context";
import { Container } from "./Container";

function App() {
  return (
    <CardsContextProvider>
      <Container />
    </CardsContextProvider>
  );
}

export default App;
