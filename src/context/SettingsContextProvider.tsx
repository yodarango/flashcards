import update from "immutability-helper";
import {
  TDefaultSettingsState,
  defaultSettingsContext,
  SettingsContext,
  initialSettingsData,
} from "./SettingsContext";
import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";

type TSettingsContextProvider = {
  children: React.ReactNode;
};

export const SettingsContextProvider = (props: TSettingsContextProvider) => {
  const { children } = props;

  const params = useParams();

  const [state, setState] = useState<TDefaultSettingsState>(
    defaultSettingsContext.state
  );

  // global settings for the flash cards
  function handleSaveSettings(settings: Partial<TDefaultSettingsState>) {
    console.log(settings);
    // the start index and end index cannot be the same. The start index cannot be greater than the end index.
    // let setWithAppliedSettings = [];
    // if the user wants to quiz themselves with a random number of cards
    // we need to discard all the other settings they might have set
    // if (Number(settings.randomNumberOfSettings) > 0) {
    //   const appliedSettings = applySettingsToSet(
    //     true,
    //     0,
    //     state.currentSettingsSet.length - 1,
    //     state.currentSettingsSet
    //   );
    //   setWithAppliedSettings = appliedSettings.slice(
    //     0,
    //     Number(settings.randomNumberOfSettings)
    //   );
    //   // update the settings to reflect the correct indexes
    //   settings.startIndex = 0;
    //   settings.endIndex = setWithAppliedSettings.length - 1;
    //   settings.isShufflingOn = false;
    // }
    // const updateTarget = {
    //   $merge: {
    //     ...settings,
    //     selectedRangeOfSettings: setWithAppliedSettings, // update the selected range of cards
    //     currentCardIndex: 0, // reset the current card index
    //     totalCorrect: 0, // reset the total correct guesses
    //     totalWrong: 0, // reset the total wrong guesses
    //   },
    // };
    // setState(update(state, updateTarget));
  }

  function handleToggleRandomQuizzing() {
    setState((prev) =>
      update(prev, {
        isRandomQuizzingOn: { $set: !prev.isRandomQuizzingOn },
      })
    );
  }

  function handleReset() {
    localStorage.setItem(
      "shrood__flashcards",
      JSON.stringify(initialSettingsData)
    );

    const updateTarget = {
      $merge: {
        ...initialSettingsData,
      },
    };

    setState(update(state, updateTarget));
  }

  // update local storage every time state changes
  useEffect(() => {}, [params, state]);

  return (
    <SettingsContext.Provider
      value={{
        state,
        handleToggleRandomQuizzing,
        handleSaveSettings,
        handleReset,
      }}
    >
      {children}
    </SettingsContext.Provider>
  );
};

export function useSettingsContext() {
  const context = useContext(SettingsContext);

  if (!context) {
    throw new Error(
      "useSettingsContext must be used within a SettingsContextProvider"
    );
  }

  return context;
}
