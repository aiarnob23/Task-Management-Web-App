import { useEffect, useState, useCallback, useRef } from "react";
import { ChevronDown, ChevronUp, Check } from "lucide-react";
import "./TaskDetails.scss";
import CongratulationsModal from "../../components/modals/congrats/CongratulationsModal";
import DeleteTaskModal from "../../components/modals/delete-task/DeleteTaskModal";
import { Link, useParams } from "react-router-dom";
import { getTaskDetails, updateTask } from "../../services/taskServices";
import OrbitalSpinner from "../../components/ui/LoadingSpinner";
import { updateUserDetails } from "../../services/userServices";
import EditTaskModal from "../../components/modals/edit-task/EditTaskModal";
import { formatTaskDate } from "../../utils/dateFormat";

const TaskDetails = () => {
  const { taskId } = useParams<{ taskId: string }>();
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState<boolean>(false);
  const [isWarningModalOpen, setIsWarningModalOpen] = useState<boolean>(false);
  const [isStatusDropdownOpen, setIsStatusDropdownOpen] =
    useState<boolean>(false);
  const [task, setTask] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [selectedStatus, setSelectedStatus] = useState<string>("");

  const statusDropdownRef = useRef<any>(null);

  const statusOptions = ["Ongoing", "Pending", "Collaborative Task", "Done"];

  const handleTaskComplete = async () => {
    const points = 20;
    setIsModalOpen(true);
    await updateUserDetails({ points: points });
    await updateTask(taskId as string, { status: "Done" });
    setTimeout(() => {
      window.location.reload();
    }, 1500);
  };

  const handleDeleteTask = () => {
    setIsWarningModalOpen(true);
  };

  const handleCloseModal = (): void => {
    setIsModalOpen(false);
  };

  const handleCloseWarningModal = (): void => {
    setIsWarningModalOpen(false);
  };

  const handleCloseEditModal = (): void => {
    setIsEditModalOpen(false);
  };

  //  fetchTaskDetails function
  const fetchTaskDetails = useCallback(async () => {
    setLoading(true);
    try {
      const res = await getTaskDetails(taskId as string);
      setTask(res);
      setSelectedStatus(res?.status);
    } catch (error) {
      console.error("Error fetching task details:", error);
    } finally {
      setLoading(false);
    }
  }, [taskId]);

  useEffect(() => {
    fetchTaskDetails();
  }, [fetchTaskDetails]);

  // dropdown close handle
  useEffect(() => {
    const handleClickOutside = (event: any) => {
      if (
        statusDropdownRef.current &&
        !statusDropdownRef.current.contains(event.target)
      ) {
        setIsStatusDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // toggle dropdown
  const toggleStatusDropdown = () => {
    setIsStatusDropdownOpen(!isStatusDropdownOpen);
  };

  // handle status selection
  const handleStatusSelect = async (status: string) => {
    setSelectedStatus(status);
    setIsStatusDropdownOpen(false);

    try {
      if (task?._id && status !== "All Task") {
        await updateTask(task._id, { status: status });
        await fetchTaskDetails();
      }
    } catch (error) {
      console.error("Error updating task status:", error);
    }
  };

  return (
    <div className="task-details-container">
      <div className="task-details-header">
        <h3>Task Details</h3>
        <div className="task-header-btns">
          <div className="task-points">{task?.points} Points</div>
          <button onClick={() => setIsEditModalOpen(true)} className="edit-btn">
            <span className="edit-icon">
              <img src="/icons/edit-orange.svg" alt="" />
            </span>
            <span className="edit-task-text">Edit Task</span>
          </button>
          <Link to="/dashboard">
            <button className="back-btn">Back</button>
          </Link>
        </div>
      </div>
      <div className="border-bottom"></div>
      {loading ? (
        <div className="min-h-[300px] flex justify-center items-center">
          <OrbitalSpinner />
        </div>
      ) : (
        <div className="task-details-data">
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
                  <span>{formatTaskDate(task?.deadline)}</span>
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
                      : task?.status === "InProgress" ||
                        task?.status === "Ongoing"
                      ? "inprogress-color"
                      : task?.status === "Collaborative Task"
                      ? "collaborative-color"
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
                <div ref={statusDropdownRef} className="dropdown-wrapper">
                  <button
                    onClick={toggleStatusDropdown}
                    className="dropdown-button"
                  >
                    <span className="dropdown-text">{selectedStatus}</span>
                    {isStatusDropdownOpen ? (
                      <ChevronUp className="dropdown-icon" />
                    ) : (
                      <ChevronDown className="dropdown-icon" />
                    )}
                  </button>

                  {isStatusDropdownOpen && (
                    <div className="dropdown-menu">
                      <div className="dropdown-content">
                        {statusOptions.map((status) => (
                          <div
                            key={status}
                            className={`dropdown-item ${
                              selectedStatus === status ? "selected" : ""
                            }`}
                            onClick={() => handleStatusSelect(status)}
                          >
                            <div className="checkbox-wrapper">
                              <input
                                type="checkbox"
                                className="dropdown-checkbox"
                                checked={selectedStatus === status}
                                onChange={() => {}}
                              />
                              {selectedStatus === status && (
                                <div className="checkbox-checkmark">
                                  <Check className="checkmark-icon" />
                                </div>
                              )}
                            </div>
                            <span className="dropdown-label">{status}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      <div className="task-details-footer">
        <div className="task-details-footer-btns">
          <button onClick={handleDeleteTask} className="dlt-btn">
            Delete Task
          </button>
          <button onClick={handleTaskComplete} className="submit-btn">
            Submit
          </button>
        </div>
      </div>
      {/* Congratulations modal */}
      <CongratulationsModal isOpen={isModalOpen} onClose={handleCloseModal} />
      {/*Delete task warning modal */}
      <DeleteTaskModal
        taskId={task?._id}
        isOpen={isWarningModalOpen}
        onClose={handleCloseWarningModal}
      />
      {/* Edit task modal */}
      <EditTaskModal
        taskId={task?._id}
        isOpen={isEditModalOpen}
        onClose={handleCloseEditModal}
        prevcategory={task?.category}
        prevdetails={task?.details}
      />
    </div>
  );
};

export default TaskDetails;
