import { Container } from "../components/Container/Container";
import { Finished } from "../components/Finished/Finished";
import { IfElse } from "../../../../@ds/utils";
import { useCardsContext } from "@context";

export const Layout = () => {
  const cardsCtx = useCardsContext();
  return (
    <IfElse condition={cardsCtx.state.isFinished}>
      <Finished />
      <Container />
    </IfElse>
  );
};
