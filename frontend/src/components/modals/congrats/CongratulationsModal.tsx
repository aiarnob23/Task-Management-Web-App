import React from "react";
import './CongratulationsModal.scss';

interface CongratulationsModalProps {
  isOpen: boolean;
  onClose: () => void;
  pointsEarned?: number;
}

const CongratulationsModal: React.FC<CongratulationsModalProps> = ({
  isOpen,
  onClose,
}) => {
  if (!isOpen) {
    return null;
  }

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <button className="modal-close-button" onClick={onClose}>
          <img src="/svg/modal/x.svg" alt="" />
        </button>
      <div className="modal-body">
         <div className="congrats-svg">
            <img src="/svg/modal/congrats.svg" alt="" />
         </div>
        <p className="main-message">Successfully Completed the Task!</p>
        <p className="reward-message">
          Congratulations! you have successfully completed the task and you got 20 points.
        </p>
      </div>
      </div>
    </div>
  );
};

export default CongratulationsModal;
