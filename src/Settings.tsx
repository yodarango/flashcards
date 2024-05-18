import { TDefaultCardsState, useCardsContext } from "@context";
import { Button, Input, Modal, Switch } from "./@ds";
import { HTMLAttributes, useState } from "react";

// styles
import "./Settings.scss";

export const Settings = (props: HTMLAttributes<HTMLDivElement>) => {
  const ctx = useCardsContext();

  const [isModalOpen, setIsModalOpen] = useState(false);

  const { className = "", ...restOfProps } = props;

  const [formData, setFormData] = useState<Partial<TDefaultCardsState>>({
    isShufflingOn: false,
    startIndex: 0,
    endIndex: 0,
  });
  const { handleSaveSettings, state } = ctx;
  const totalCards = state.totalCards;

  function handleChange(targetName: string, value: number | boolean) {
    setFormData((prev) => ({ ...prev, [targetName]: value }));
  }

  function saveSettings() {
    handleSaveSettings(formData);
    setIsModalOpen(false);
  }

  return (
    <section className={`settings-00oo ${className}`} {...restOfProps}>
      <Modal
        onClose={() => setIsModalOpen(false)}
        open={isModalOpen}
        title='Settings'
      >
        <section className={`settings-00oo__content`}>
          <p>Enter the range you want to be quizzed in</p>
          <p className='mb-4 color-lambda'>
            Total cards in this set: {totalCards}
          </p>
          <div className='mb-4 '>
            <label className='opacity-60'>Start at:</label>
            <Input
              onChange={({ target: { value } }) =>
                handleChange("startIndex", Number(value))
              }
              value={formData.startIndex}
              placeholder='Card number'
              type='number'
            />
          </div>
          <div className='mb-4'>
            <label className='opacity-60'>End at:</label>
            <Input
              onChange={({ target: { value } }) =>
                handleChange("endIndex", Number(value))
              }
              value={formData.endIndex}
              placeholder='Card number'
              type='number'
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

          {/* actions */}
          <div className='settings-00oo__actions d-flex align-items-center justify-center-center gap-4'>
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
