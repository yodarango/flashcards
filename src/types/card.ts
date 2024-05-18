export enum EGuessedCorrectly {
  CORRECT = "correct",
  INCORRECT = "incorrect",
  UNQUIZZED = "unQuizzed",
}

export type TCard = {
  front: string;
  guess: EGuessedCorrectly;
  back: string;
  hint: string;
  id: number;
};
