import { RightOrWrong } from "./RightOrWrong";
import { FlashCard } from "./FlashCard";
import { Progress } from "./Progress";
import { Settings } from "./Settings";

// styles
import "./Container.scss";

export const Container = () => {
  return (
    <div className='container-52tr'>
      <Progress className='container-52tr__progress' />
      <FlashCard className='container-52tr__flashcard mb-4' />
      <RightOrWrong className='container-52tr__right-or-wrong' />
      <Settings />
    </div>
  );
};
