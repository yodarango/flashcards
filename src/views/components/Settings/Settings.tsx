import { Button, Input, Modal, Portal, Snackbar, Switch, Toast } from "@ds";
import { TDefaultSettingsState, useCardsContext } from "@context";
import { HTMLAttributes, useEffect, useState } from "react";

// styles
import "./Settings.scss";

export const Settings = (props: HTMLAttributes<HTMLDivElement>) => {
  const cardsCtx = useCardsContext();

  const cardsState = cardsCtx.state;

  console.log("cardsState", cardsState);

  const randomNumberOfCards = 0; //cardsState.randomNumberOfCards;
  const isRandomQuizzingOn = false; // cardsState.isRandomQuizzingOn;
  const isShufflingOn = cardsState.isShufflingOn;
  const startIndex = cardsState.startIndex;
  const endIndex = cardsState.endIndex;

  const [isModalOpen, setIsModalOpen] = useState(false);

  const { className = "", ...restOfProps } = props;

  const [formData, setFormData] = useState<Partial<TDefaultSettingsState>>({});
  const [toast, setToast] = useState<Record<string, any> | null>(null);

  const totalCards = cardsState.totalCardsInTheSet;

  function handleChange(targetName: string, value: number | string | boolean) {
    setFormData((prev) => ({ ...prev, [targetName]: value }));
  }

  function saveSettings() {
    // the start index and end index cannot be the same. The start index cannot be greater than the end index.
    if (
      formData.startIndex === formData.endIndex ||
      formData.startIndex! > formData.endIndex!
    ) {
      setToast({
        type: "danger",
        messsage: "The start index cannot be greater or equal to the end index",
      });
      return;
    }

    if (isNaN(formData.startIndex!) || isNaN(formData.endIndex!)) {
      setToast({
        type: "danger",
        messsage: "Only numbers are allowed for the start and end index.",
      });
      return;
    }

    if (formData.randomNumberOfCards! > totalCards) {
      setToast({
        type: "danger",
        messsage:
          "The number of random cards cannot be greater than the total number of cards in this set.",
      });
      return;
    }

    if (
      Number(formData.startIndex) > totalCards ||
      Number(formData.endIndex) > totalCards
    ) {
      setToast({
        type: "danger",
        messsage:
          "The start or end index cannot be greater than the total number of cards in this set.",
      });
      return;
    }

    cardsCtx.handleUpdateSettings(formData);

    setIsModalOpen(false);
  }

  useEffect(() => {
    setFormData({
      isShufflingOn,
      startIndex,
      endIndex,
      randomNumberOfCards,
    });
  }, [isShufflingOn, startIndex, endIndex, randomNumberOfCards]);
  return (
    <section className={`settings-00oo ${className}`} {...restOfProps}>
      <Portal>
        <Snackbar onClose={() => setToast(null)} open={!!toast}>
          <Toast
            type={toast?.type}
            onClose={() => setToast(null)}
            style={{ zIndex: 15 }}
          >
            {toast?.messsage}
          </Toast>
        </Snackbar>
      </Portal>
      <Modal
        contentContainerStyle={{ overflowY: "scroll" }}
        onClose={() => setIsModalOpen(false)}
        open={isModalOpen}
        title='Settings'
      >
        <section className={`settings-00oo__content`}>
          <div
            className={
              isRandomQuizzingOn ? "content__section--deactivated" : ""
            }
          >
            <h4 className='mt-0 mb-4'>Sequential Quizzing</h4>
            <p>Enter the range you want to be quizzed in</p>
            <p className='mb-4 color-lambda'>
              Total cards in this set: {totalCards}
            </p>
            <div className='mb-4 '>
              <label className='opacity-60'>Start at:</label>
              <Input
                onChange={({ target: { value } }) =>
                  handleChange("startIndex", Number(value) - 1)
                }
                value={Number(formData.startIndex) + 1}
                placeholder='Card number'
              />
            </div>
            <div className='mb-4'>
              <label className='opacity-60'>End at:</label>
              <Input
                onChange={({ target: { value } }) =>
                  handleChange("endIndex", Number(value) - 1)
                }
                value={Number(formData.endIndex) + 1}
                placeholder='Card number'
              />
            </div>

            {/* shuffle */}
            <div className='d-flex align-items-center justify-between gap-4 mb-4'>
              <label className='opacity-60'>Shuffle:</label>
              <Switch
                onChange={({ target: { checked } }) =>
                  setFormData((prev) => ({ ...prev, isShufflingOn: checked }))
                }
                checked={formData.isShufflingOn}
              />
            </div>
          </div>

          <hr className='mb-4' />

          {/* random quizzing */}

          <div className='d-flex align-items-center justify-between gap-4 mb-4'>
            <label className='opacity-60'>Random quizzing instead:</label>
            <Switch
              // onChange={handleToggleRandomQuizzing}
              checked={isRandomQuizzingOn}
            />
          </div>
          <div
            className={
              !isRandomQuizzingOn ? "content__section--deactivated" : ""
            }
          >
            <h4 className='mt-0 mb-4'>Random Quizzing</h4>
            <p className='mb-2 mt- mx-0'>
              Enter the amount of randomly selected cards you would like to test
              in:
            </p>
            <Input
              placeholder='Enter number of random cards'
              onChange={({ target: { value } }) =>
                handleChange("randomNumberOfCards", value)
              }
              value={formData.randomNumberOfCards}
              className='mb-4'
            />
          </div>

          <hr className='mb-4' />

          {/* actions */}
          <div className='settings-00oo__actions d-flex align-items-center justify-center-center gap-4 mb-4'>
            <Button
              onClick={() => setIsModalOpen(false)}
              className='w-100'
              secondary
            >
              Cancel
            </Button>
            <Button onClick={saveSettings} className='w-100' primary>
              Save
            </Button>
          </div>

          {/*  delete all data  */}

          <Button // onClick={handleReset}
            className='w-100'
            danger
          >
            Clear all data
          </Button>
        </section>
      </Modal>
      <button
        className='progress-72lh__settings p-0 m-0 d-flex align-items-center justify-content-center bg-gamma'
        onClick={() => setIsModalOpen(true)}
      >
        <span className='icon icon-settings-outline' />
      </button>
    </section>
  );
};
