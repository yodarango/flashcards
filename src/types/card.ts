export enum EGuessedCorrectly {
  CORRECT = "correct",
  INCORRECT = "incorrect",
  UNQUIZZED = "unquizzed",
}

export type TCard = {
  guess?: EGuessedCorrectly;
  spa?: string;
  koine?: string;
  eng?: string;
  hint?: string;
  id: string;
};
