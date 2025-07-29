import React from "react";
import './CongratulationsModal.scss';

interface DeleteTaskModalProps {
  isOpen: boolean;
  onClose: () => void;
  pointsEarned?: number;
}

const DeleteTaskModal: React.FC<DeleteTaskModalProps> = ({
  isOpen,
  onClose,
}) => {
  if (!isOpen) {
    return null;
  }

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <div className="banner"><img src="/svg/modal/dlt-alert.svg" alt="" /></div>
      </div>
      <h2>Are you Sure!!</h2>
      <p>Do you want to delete this Task on this app?</p>
      <div className="modal-footer-btns">
        <button>Yes</button>
        <button>No</button>
      </div>
    </div>
  );
};

export default DeleteTaskModal;
