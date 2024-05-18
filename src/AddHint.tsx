import { HTMLAttributes, useState } from "react";
import { Button, Modal, Input } from "@ds";

// styles
import "./AddHint.scss";

export const AddHint = (props: HTMLAttributes<HTMLDivElement>) => {
  const { className = "", ...restOfProps } = props;

  const [showModal, setShowModal] = useState(false);

  return (
    <section className={`add-hint-63xd ${className}`} {...restOfProps}>
      <Modal
        onClose={() => setShowModal(false)}
        open={showModal}
        title='Add a hint'
      >
        <div className='add-hint-63xd__modal-content'>
          <p className='mb-4'>Add a hin to help you remember this card</p>
          <label htmlFor='hint' className='opacity-60'>
            Yout Hint:
          </label>

          <Input
            placeholder='Enter hint...'
            maxRows={4}
            multiline
            className='mb-4'
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
            <Button onClick={() => {}} className='w-100' primary>
              Save
            </Button>
          </div>
        </div>
      </Modal>
      <Button className='w-100' onClick={() => setShowModal(true)} primary>
        Add a hint
      </Button>
    </section>
  );
};
