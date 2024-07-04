import { createContext } from "react";

export enum EPage {
  FINISHED = "finished",
  HOME = "home",
  QUIZ = "quiz",
}

export type TDefaultSettingsState = {
  randomNumberOfSettings: number; // number of randomly selected Settings including from the first to the last of the total number of Settings
  isRandomQuizzingOn: boolean; // the user is testing themselves on a random set of Settings
  isShufflingOn: boolean; // shuffles the slice of Settings encapsulated by the startIndex and endIndex
  startIndex: number; // the start index of the slice of Settings to be quizzed
  endIndex: number; // the end index of the slice of Settings to be quizzed
};

export const initialData: TDefaultSettingsState = {
  isRandomQuizzingOn: false,
  randomNumberOfSettings: 0,
  isShufflingOn: false,
  startIndex: 0,
  endIndex: -1,
};

export const defaultContext = {
  state: initialData,
  handleSaveSettings: (_: Partial<TDefaultSettingsState>) => {},
  handleToggleRandomQuizzing: () => {},
  handleReset: () => {},
};

export const SettingsContext = createContext(defaultContext);
