import { Button, Modal, Input, Portal, Snackbar, Toast, IfElse } from "@ds";
import { useCardsContext } from "./context/CardsContextProvider";
import { HTMLAttributes, useState } from "react";

// styles
import "./AddHint.scss";

export const AddHint = (props: HTMLAttributes<HTMLDivElement>) => {
  const { handleAddHint, state } = useCardsContext();

  const currentCardHint = state.allCards[state.currentCardIndex]?.hint;
  const currentCardId = state.allCards[state.currentCardIndex]?.id;

  const [formData, setFormData] = useState({
    currentCardHint,
  });

  const { className = "", ...restOfProps } = props;

  const [toast, setToast] = useState<Record<string, any> | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  const handleHintBeforeSubmission = () => {
    if (formData.currentCardHint.length > 50) {
      setToast({
        type: "danger",
        messsage: "Hint cannot be more than 50 characters",
      });
      return;
    }

    handleAddHint(formData.currentCardHint, currentCardId);
    setShowModal(false);
    setToast({
      type: "success",
      messsage: "Hint added successfully",
    });
  };

  const modalTitle = !currentCardHint ? "Add a hint" : "Your hint";

  return (
    <section className={`add-hint-63xd ${className}`} {...restOfProps}>
      <Portal>
        <Snackbar
          onClose={() => setToast(null)}
          autoHideDuration={2000}
          open={!!toast}
        >
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
        onClose={() => setShowModal(false)}
        title={modalTitle}
        open={showModal}
      >
        <div className='add-hint-63xd__modal-content'>
          <IfElse condition={!!formData.currentCardHint && !isEditing}>
            <p className='text-center'>{currentCardHint}</p>
            <>
              <p className='mb-4'>Add a hin to help you remember this card</p>
              <label htmlFor='hint' className='opacity-60'>
                Yout Hint:
              </label>

              <Input
                onChange={({ target: { value } }) => {
                  setFormData({ currentCardHint: value });
                }}
                value={formData.currentCardHint}
                placeholder='Enter hint...'
                className='mb-4'
                maxRows={4}
                multiline
              />

              {/* actions */}
              <div className='add-hint-63xd__actions d-flex align-items-center justify-center-center gap-4'>
                <Button
                  onClick={() => setShowModal(false)}
                  className='w-100'
                  secondary
                >
                  Cancel
                </Button>
                <Button
                  onClick={handleHintBeforeSubmission}
                  className='w-100'
                  primary
                >
                  Save
                </Button>
              </div>
            </>
          </IfElse>
        </div>
      </Modal>
      <IfElse condition={!currentCardHint}>
        <Button className='w-100' onClick={() => setShowModal(true)} primary>
          Add a hint
        </Button>
        <div>
          <Button
            className='w-100 mb-4 d-flex align-items-center justify-center-center'
            onClick={() => {
              setIsEditing(false);
              setShowModal(true);
            }}
            primary
          >
            <span className='icon icon-eye-outline me-2' />
            <span>View Hint</span>
          </Button>
          <Button
            className='w-100 d-flex align-items-center justify-center-center'
            onClick={() => {
              setIsEditing(true);
              setShowModal(true);
            }}
            secondary
          >
            <span className='icon icon-pencil-outline me-2' />
            <span>Edit Hint</span>
          </Button>
        </div>
      </IfElse>
    </section>
  );
};
