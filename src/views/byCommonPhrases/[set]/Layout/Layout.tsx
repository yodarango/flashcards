import { Finish } from "../../../components/Finish/Finish";
import { Container } from "@views/components";
import { IfElse } from "../../../../@ds/utils";
import { useCardsContext } from "@context";

export const Layout = () => {
  const cardsCtx = useCardsContext();
  return (
    <IfElse condition={cardsCtx.state.isFinished}>
      <Finish />
      <Container />
    </IfElse>
  );
};
