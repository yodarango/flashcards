import { RightOrWrong } from "./RightOrWrong";
import { CardSetMeta } from "./CardSetMeta";
import { FlashCard } from "./FlashCard";
import { Progress } from "./Progress";
import { AddHint } from "./AddHint";

// styles
import "./Container.scss";
import { useCardsContext } from "./context/CardsContextProvider";
import { Finish } from "./Finish";

export const Container = () => {
  const ctx = useCardsContext();
  const { isFinished } = ctx.state;

  if (isFinished) {
    return (
      <div className='container-52tr'>
        <Finish />
      </div>
    );
  }

  return (
    <div className='container-52tr'>
      <Progress className='container-52tr__progress' />
      <CardSetMeta />
      <FlashCard className='container-52tr__flashcard mb-4' />
      <RightOrWrong className='container-52tr__right-or-wrong mb-4' />
      <AddHint />
    </div>
  );
};
