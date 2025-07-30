import React from "react";
import "./DeleteTaskModal.scss";
import { deleteTask } from "../../../services/taskServices";

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

  // handle task deletion
  const handleTaskDelete = async () => {
    const res = await deleteTask("688961c9d67c10c48820ed38");
    if(res?.success){
      onClose();
      window.location.href="/dashboard";
    }
  };
  return (
    <div className="warning-modal-overlay">
      <div className="warning-modal-content">
        <div className="banner">
          <img src="/svg/modal/dlt-alert.svg" alt="" />
        </div>

        <h2>Are you Sure!!</h2>
        <p>Do you want to delete this Task on this app?</p>
        <div className="modal-footer-btns">
          <button onClick={handleTaskDelete} className="yes-btn">
            Yes
          </button>
          <button onClick={onClose} className="no-btn">
            No
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteTaskModal;
