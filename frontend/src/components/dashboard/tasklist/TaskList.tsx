import { useState, useEffect, useRef } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import "./TaskList.scss";
import AddTaskModal from "../../modals/add-task/AddTaskModal";
import { getUsersTaskLists } from "../../../services/taskServices";
import OrbitalSpinner from "../../ui/LoadingSpinner";

const TaskList = () => {
  const [isCategoryOpen, setIsCategoryOpen] = useState(false);
  const [isStatusOpen, setIsStatusOpen] = useState(false);
  const [selectedCategories, setSelectedCategories] = useState<any>([]);
  const [selectedStatus, setSelectedStatus] = useState(["Pending"]);
  const [tasks, setTasks] = useState<any>([]);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const categories = [
    "Arts and Craft",
    "Nature",
    "Family",
    "Sport",
    "Friends",
    "Meditation",
  ];

  const statusOptions = [
    "All Task",
    "Ongoing",
    "Pending",
    "Collaborative Task",
    "Done",
  ];

  //task fetch
  useEffect(() => {
    setLoading(true);
    const getTasks = async () => {
      const res = await getUsersTaskLists();
      setTasks(res);
      setLoading(false);
    };

    getTasks();
  }, [isModalOpen]);

  const categoryDropdownRef = useRef<any>(null);
  const statusDropdownRef = useRef<any>(null);

  // dropdown close handle
  useEffect(() => {
    const handleClickOutside = (event: any) => {
      if (
        categoryDropdownRef.current &&
        !categoryDropdownRef.current.contains(event.target) &&
        statusDropdownRef.current &&
        !statusDropdownRef.current.contains(event.target)
      ) {
        setIsCategoryOpen(false);
        setIsStatusOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);
  // dropdown handle
  const toggleCategoryDropdown = () => {
    setIsCategoryOpen(!isCategoryOpen);
    setIsStatusOpen(false);
  };

  const toggleStatusDropdown = () => {
    setIsStatusOpen(!isStatusOpen);
    setIsCategoryOpen(false);
  };

  const handleCategoryToggle = (category: string) => {
    setSelectedCategories((prev: any) => {
      if (prev.includes(category)) {
        return prev.filter((c: any) => c !== category);
      } else {
        return [...prev, category];
      }
    });
  };

  const handleStatusSelect = (status: any) => {
    if (status === "All Task") {
      setSelectedStatus([
        "All Task",
        "Ongoing",
        "Pending",
        "Collaborative Task",
        "Done",
      ]);
    } else {
      setSelectedStatus((prev) => {
        if (prev.includes(status)) {
          return prev.filter((s) => s !== status);
        } else {
          if (prev.includes("All Task")) {
            return prev.filter((s) => s !== "All Task");
          }
          return [...prev, status];
        }
      });
    }
  };

  const getCategoryDisplayText = () => {
    if (selectedCategories.length === 0) {
      return "Select Task Category";
    } else if (selectedCategories.length === 1) {
      return selectedCategories[0];
    } else {
      return `${selectedCategories[0]} , ${selectedCategories[1]}, ...`;
    }
  };

  const getStatusDisplayText = () => {
    if (selectedStatus.length === statusOptions.length) {
      return "All Task";
    } else if (selectedStatus.length === 0) {
      return "Select Status";
    } else if (selectedStatus.length === 1) {
      return selectedStatus[0];
    } else {
      return `${selectedStatus[0]} , ${selectedStatus[1]}, ...`;
    }
  };

  //handle task details view
  const handleTaskDetailsView = (taskId:string)=>{
    window.location.href=`/task-details/${taskId}`;
  }

  //handle format date
  const formatTaskDate = (dateString: any) => {
    const date = new Date(dateString);
    const options: Intl.DateTimeFormatOptions = {
      weekday: "long",
      month: "long",
      day: "numeric",
      year: "numeric",
    };
    const formattedDate = date.toLocaleDateString("en-US", options);
    const parts = formattedDate.split(", ");
    return `${parts[0]}, ${parts[1]} - ${parts[2]}`;
  };

  console.log(tasks);
  // ------------------------------------------------------------------------//
  return (
    <div className="task-list-container">
      <div className="task-list-heading-div">
        <h3>All Task List</h3>
        <div className="filter-div">
          {/* Category Selection  */}
          <div className="category-selection">
            <div ref={categoryDropdownRef} className="dropdown-wrapper">
              <button
                onClick={toggleCategoryDropdown}
                className="dropdown-button"
              >
                <span className="dropdown-text">
                  {getCategoryDisplayText()}
                </span>
                {isCategoryOpen ? (
                  <ChevronUp className="dropdown-icon" />
                ) : (
                  <ChevronDown className="dropdown-icon" />
                )}
              </button>

              {isCategoryOpen && (
                <div className="dropdown-menu">
                  <div className="dropdown-content">
                    {categories.map((category) => (
                      <div
                        key={category}
                        className="dropdown-item"
                        onClick={() => handleCategoryToggle(category)}
                      >
                        <div className="checkbox-wrapper">
                          <input
                            type="checkbox"
                            checked={selectedCategories.includes(category)}
                            onChange={() => handleCategoryToggle(category)}
                            className="dropdown-checkbox"
                          />
                          {selectedCategories.includes(category) && (
                            <div className="checkbox-checkmark">
                              <svg
                                className="checkmark-icon"
                                fill="currentColor"
                                viewBox="0 0 20 20"
                              >
                                <path
                                  fillRule="evenodd"
                                  d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                  clipRule="evenodd"
                                />
                              </svg>
                            </div>
                          )}
                        </div>
                        <span className="dropdown-label">{category}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Status Selection  */}
          <div className="status-selection">
            <div ref={statusDropdownRef} className="dropdown-wrapper">
              <button
                onClick={toggleStatusDropdown}
                className="dropdown-button"
              >
                <span className="dropdown-text">{getStatusDisplayText()}</span>
                {isStatusOpen ? (
                  <ChevronUp className="dropdown-icon" />
                ) : (
                  <ChevronDown className="dropdown-icon" />
                )}
              </button>

              {isStatusOpen && (
                <div className="dropdown-menu">
                  <div className="dropdown-content">
                    {statusOptions.map((status) => (
                      <div
                        key={status}
                        className="dropdown-item"
                        onClick={() => handleStatusSelect(status)}
                      >
                        <div className="checkbox-wrapper">
                          <input
                            type="checkbox"
                            checked={selectedStatus.includes(status)}
                            onChange={() => handleStatusSelect(status)}
                            className="dropdown-checkbox"
                          />
                          {selectedStatus.includes(status) && (
                            <div className="checkbox-checkmark">
                              <svg
                                className="checkmark-icon"
                                fill="currentColor"
                                viewBox="0 0 20 20"
                              >
                                <path
                                  fillRule="evenodd"
                                  d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                  clipRule="evenodd"
                                />
                              </svg>
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

          <button
            onClick={() => setIsModalOpen(true)}
            className="add-task-button"
          >
            Add New Task
          </button>
        </div>
      </div>
      {/* Conditional rendering  */}
      {loading ? (
        <div className="loading-spinner-container min-h-[400px] flex justify-center items-center">
          <OrbitalSpinner />
        </div>
      ) : !tasks?.length ? (
        <div className="no-task-div">
          <img src="/svg/task/no-task-frame.svg" alt="" />
          <h3>No Task is Available yet, Please Add your New Task</h3>
        </div>
      ) : (
        <div className="task-card-div">
          {tasks.map((task: any) => (
            <div key={task?._id}>
              <div onClick={()=>handleTaskDetailsView(task._id)} className="task-single-card">
                <div className="task-card-header">
                  <div className="icon-cat-div">
                    <div className="icon">
                      <img src="/icons/art-craft-icon.svg" alt="" />
                    </div>
                    <div>
                      <div className="task-category">{task.category}</div>
                      <div className="task-details">{task.details}</div>
                    </div>
                  </div>
                  <div className="trash">
                    <img src="/icons/trash-orange.svg" alt="" />
                  </div>
                </div>

                <div className="task-card-footer">
                  <div className="task-deadline">
                    <div className="calender-icon">
                      <img src="/icons/calendar-edit.svg" alt="" />
                    </div>
                    <div className="date">{formatTaskDate(task.deadline)}</div>
                  </div>
                  <div
                    className={`task-status ${
                      task.status === "Pending"
                        ? "pending-color"
                        : task.status === "Done"
                        ? "done-color"
                        : task.status === "InProgress"
                        ? "inprogress-color"
                        : ""
                    }`}
                  >
                    <div className="svg">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="6"
                        height="7"
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
                    <div className="status-text"> {task.status}</div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
      {/* Add new task modal */}
      <AddTaskModal isOpen={isModalOpen} onClose={handleCloseModal} />
    </div>
  );
};

export default TaskList;