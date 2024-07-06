import { createContext } from "react";

export enum EPage {
  FINISHED = "finished",
  HOME = "home",
  QUIZ = "quiz",
}

export type TDefaultSettingsState = {
  randomNumberOfCards: number; // number of randomly selected Settings including from the first to the last of the total number of Settings
  isRandomQuizzingOn: boolean; // the user is testing themselves on a random set of Settings
  isShufflingOn: boolean; // shuffles the slice of Settings encapsulated by the startIndex and endIndex
  startIndex: number; // the start index of the slice of Settings to be quizzed
  endIndex: number; // the end index of the slice of Settings to be quizzed
};

export const initialSettingsData: TDefaultSettingsState = {
  isRandomQuizzingOn: false,
  randomNumberOfCards: 0,
  isShufflingOn: false,
  startIndex: 0,
  endIndex: 0,
};

export const defaultSettingsContext = {
  state: initialSettingsData,
  handleSaveSettings: (_: Partial<TDefaultSettingsState>) => {},
  handleToggleRandomQuizzing: () => {},
  handleReset: () => {},
};

export const SettingsContext = createContext(defaultSettingsContext);
