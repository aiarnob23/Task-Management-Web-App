import { useEffect, useState } from "react";
import "./TaskDetails.scss";
import CongratulationsModal from "../../components/modals/congrats/CongratulationsModal";
import DeleteTaskModal from "../../components/modals/delete-task/DeleteTaskModal";
import { Link, useParams } from "react-router";
import { getTaskDetails } from "../../services/taskServices";
import OrbitalSpinner from "../../components/ui/LoadingSpinner";

const TaskDetails = () => {
  const {taskId} = useParams<{taskId:any}>();
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [isWarningModalOpen, setIsWarningModalOpen] = useState<boolean>(false);
  const [earnedPoints, setEarnedPoints] = useState<number>(0);
  const [task, setTask] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [selectedStatus , setSelectedStatus] = useState<any>("")

  const handleChange = (event:any) =>{
    setSelectedStatus(event.target.value);
  }

  const handleTaskComplete = (): void => {
    const points = 200;
    setEarnedPoints(points);
    setIsModalOpen(true);
  };

  const handleDeleteTask = () =>{
    setIsWarningModalOpen(true);
  }
  const handleCloseModal = (): void => {
    setIsModalOpen(false);
  };
 
  const handleCloseWarningModal = ():void=>{
    setIsWarningModalOpen(false);
  }

  useEffect(()=>{
    setLoading(true);
    const fetchTaskDetails = async()=>{
      const res = await getTaskDetails(taskId);
      setTask(res);
      setSelectedStatus(res?.status);
      setLoading(false);
    }

    fetchTaskDetails();
  },[taskId])



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
          <Link to='/dashboard'><button className="back-btn">Back</button></Link>
        </div>
      </div>
      <div className="border-bottom"></div>
      {
        loading 
        ? 
        (<div className="min-h-[300px] flex justify-center items-center"><OrbitalSpinner/></div>) 
        :
        (<div className="task-details-data">
        <div className="icon">
          <img src="/icons/art-craft-icon.svg" alt="" />
        </div>
        <div className="details">
          <div className="cat-details">
            <h3>{task?.category}</h3>
            <p>{task?.details}</p>
          </div>
          <div className="timeline-status">
            <div className="left-div">
              <p>End Date</p>
              <div className="calendar-date">
                <img src="/icons/calendar-edit.svg" alt="" />
                <span>{task?.deadline}</span>
              </div>
            </div>
            <div className="border-vertical"></div>
            <div className="right-div">
              <div
                    className={`task-status ${
                      task?.status === "Pending"
                        ? "pending-color"
                        : task?.status === "Done"
                        ? "done-color"
                        : task?.status === "InProgress"
                        ? "inprogress-color"
                        : ""
                    }`}
                  >
                    <div className="svg">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="14"
                        height="14"
                        viewBox="0 0 6 7"
                        fill="none"
                      >
                        <circle
                          cx="3"
                          cy="3.5"
                          r="3"
                          fill="var(--svg-fill-color)"
                        />
                      </svg>
                    </div>
                    <div className="status-text"> {task?.status}</div>
                  </div>
            </div>
          </div>
          <div className="change-status">
            <h3>Change Status</h3>
            <div className="status-change-dropdown">
                  <select value={selectedStatus} onChange={handleChange} id="">
                    <option value="InProgress">InProgress</option>
                    <option value="Pending">Pending</option>
                    <option value="Done">Done</option>
                  </select>
            </div>
          </div>
        </div>
      </div>)
      }
      <div className="task-details-footer">
        <div className="task-details-footer-btns">
          <button onClick={handleDeleteTask} className="dlt-btn">Delete Task</button>
          <button onClick={handleTaskComplete} className="submit-btn">Submit</button>
        </div>
      </div>
      {/* Congratulations modal */}
      <CongratulationsModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
      />
      {/*Delete task warning modal */}
      <DeleteTaskModal
      isOpen={isWarningModalOpen}
      onClose={handleCloseWarningModal}
      />
    </div>
  );
};

export default TaskDetails;
