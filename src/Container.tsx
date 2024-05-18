import { RightOrWrong } from "./RightOrWrong";
import { CardSetMeta } from "./CardSetMeta";
import { FlashCard } from "./FlashCard";
import { Progress } from "./Progress";
import { Settings } from "./Settings";
import { AddHint } from "./AddHint";

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
      <Settings />
    </div>
  );
};
