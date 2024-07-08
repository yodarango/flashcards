import { Finished } from "../../../components/Finished/Finished";
import { Container } from "@views/components";
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
