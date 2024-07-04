import { RightOrWrong } from "../RightOrWrong/RightOrWrong";
import { CardSetMeta } from "../CardseMeta/CardSetMeta";
import { FlashCard } from "../FlashCard/FlashCard";
import { Progress } from "../Progress/Progress";
import { AddHint } from "../AddHint/AddHint";

// styles
import "./Container.scss";

export const Container = () => {
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
