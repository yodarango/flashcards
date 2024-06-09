import { useCardsContext } from "./context/CardsContextProvider";
import { EPage } from "./context/CardsContext";
import { RightOrWrong } from "./RightOrWrong";
import { CardSetMeta } from "./CardSetMeta";
import { CardsSets } from "./CardsSets";
import { FlashCard } from "./FlashCard";
import { Progress } from "./Progress";
import { AddHint } from "./AddHint";
import { Finish } from "./Finish";

// styles
import "./Container.scss";

export const Container = () => {
  const ctx = useCardsContext();
  const { allCardSets, currentPage } = ctx.state;

  if (allCardSets.length === 0)
    return <div className='container-52tr'>Please load a card set first</div>;

  if (currentPage === EPage.FINISHED)
    return (
      <div className='container-52tr'>
        <Finish />
      </div>
    );

  if (currentPage === EPage.QUIZ)
    return (
      <div className='container-52tr'>
        <Progress className='container-52tr__progress' />
        <CardSetMeta />
        <FlashCard className='container-52tr__flashcard mb-4' />
        <RightOrWrong className='container-52tr__right-or-wrong mb-4' />
        <AddHint />
      </div>
    );

  return <CardsSets />;
};
