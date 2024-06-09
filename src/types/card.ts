export enum EGuessedCorrectly {
  CORRECT = "correct",
  INCORRECT = "incorrect",
  UNQUIZZED = "unquizzed",
}

export type TCard = {
  guess: EGuessedCorrectly;
  front: string; // the term to be guessed
  back: string; // the answer
  hint: string;
  id: number;
};
