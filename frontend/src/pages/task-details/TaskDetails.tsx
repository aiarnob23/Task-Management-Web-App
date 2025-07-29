import { useState } from "react";
import { fakeTasks } from "../../utils/fakeData";
import "./TaskDetails.scss";
import CongratulationsModal from "../../components/modals/congrats/CongratulationsModal";

const TaskDetails = () => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [earnedPoints, setEarnedPoints] = useState<number>(0);
  const fakeTask = fakeTasks[0];

  const handleTaskComplete = (): void => {
    const points = 200;
    setEarnedPoints(points);
    setIsModalOpen(true);
  };
  const handleCloseModal = (): void => {
    setIsModalOpen(false);
  };

  return (
    <div className="task-details-container">
      <div className="task-details-header">
        <h3>Task Details</h3>
        <div className="task-header-btns">
          <button className="edit-btn">
            <span className="edit-icon">
              <img src="/icons/edit-orange.svg" alt="" />
            </span>
            <span className="edit-task-text">Edit Task</span>
          </button>
          <button className="back-btn">Back</button>
        </div>
      </div>
      <div className="border-bottom"></div>
      <div className="task-details-data">
        <div className="icon">
          <img src="/icons/art-craft-icon.svg" alt="" />
        </div>
        <div className="details">
          <div className="cat-details">
            <h3>{fakeTask.category}</h3>
            <p>{fakeTask.details}</p>
          </div>
          <div className="timeline-status">
            <div className="left-div">
              <p>End Date</p>
              <div className="calendar-date">
                <img src="/icons/calendar-edit.svg" alt="" />
                <span>{fakeTask.deadline}</span>
              </div>
            </div>
            <div className="border-vertical"></div>
            <div className="right-div">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="15"
                height="15"
                viewBox="0 0 15 15"
                fill="none"
              >
                <circle cx="7.67936" cy="7.50004" r="6.90592" fill="#DD9221" />
              </svg>
              <span>{fakeTask.status}</span>
            </div>
          </div>
          <div className="change-status"></div>
        </div>
      </div>
      <div className="task-details-footer">
        <div className="task-details-footer-btns">
          <button className="dlt-btn">Delete Task</button>
          <button onClick={handleTaskComplete} className="submit-btn">Submit</button>
        </div>
      </div>
      {/* The Congratulations Modal */}
      <CongratulationsModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        pointsEarned={earnedPoints}
      />
    </div>
  );
};

export default TaskDetails;
