import { useState, useEffect, useRef } from "react";
import { ChevronDown, ChevronUp, Check } from "lucide-react";
import "./TaskList.scss";
import AddTaskModal from "../../modals/add-task/AddTaskModal";
import { getUsersTaskLists } from "../../../services/taskServices";
import OrbitalSpinner from "../../ui/LoadingSpinner";
import { formatTaskDate } from "../../../utils/dateFormat";

const TaskList = () => {
  const [isCategoryOpen, setIsCategoryOpen] = useState(false);
  const [isStatusOpen, setIsStatusOpen] = useState(false);
  const [selectedCategories, setSelectedCategories] = useState<string[]>(["All Categories"]);
  const [selectedStatus, setSelectedStatus] = useState<string>("All Task");
  const [tasks, setTasks] = useState<any>([]);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const categories = [
    "All Categories",
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
        !categoryDropdownRef.current.contains(event.target)
      ) {
        setIsCategoryOpen(false);
      }
      if (
        statusDropdownRef.current &&
        !statusDropdownRef.current.contains(event.target)
      ) {
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

  const handleCategorySelect = (category: string) => {
    if (category === "All Categories") {
      setSelectedCategories(["All Categories"]);
    } else {
      let newSelection = [...selectedCategories];
      
      if (newSelection.includes("All Categories")) {
        newSelection = newSelection.filter(c => c !== "All Categories");
      }
      
      if (newSelection.includes(category)) {
        newSelection = newSelection.filter(c => c !== category);
        if (newSelection.length === 0) {
          newSelection = ["All Categories"];
        }
      } else {
        newSelection.push(category);
      }
      
      setSelectedCategories(newSelection);
    }
  };

  const handleStatusSelect = (status: string) => {
    setSelectedStatus(status);
    setIsStatusOpen(false);
  };

  // Filter tasks 
  const filteredTasks = tasks.filter((task: any) => {
    const categoryMatch = selectedCategories.includes("All Categories") || selectedCategories.includes(task.category);
    const statusMatch = selectedStatus === "All Task" || task.status === selectedStatus;
    return categoryMatch && statusMatch;
  });

  //handle task details view
  const handleTaskDetailsView = (taskId: string) => {
    window.location.href = `/task-details/${taskId}`;
  };

  // Get display text for category dropdown
  const getCategoryDisplayText = () => {
    if (selectedCategories.includes("All Categories")) {
      return "Select Task Category";
    }
    if (selectedCategories.length === 1) {
      return selectedCategories[0];
    }
    return `${selectedCategories.length} categories selected`;
  };

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
                        className={`dropdown-item ${selectedCategories.includes(category) ? 'selected' : ''}`}
                        onClick={() => handleCategorySelect(category)}
                      >
                        <div className="checkbox-wrapper">
                          <input
                            type="checkbox"
                            className="dropdown-checkbox"
                            checked={selectedCategories.includes(category)}
                            onChange={() => {}}
                          />
                          {selectedCategories.includes(category) && (
                            <div className="checkbox-checkmark">
                              <Check className="checkmark-icon" />
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
                <span className="dropdown-text">{selectedStatus}</span>
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
                        className={`dropdown-item ${selectedStatus === status ? 'selected' : ''}`}
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
      ) : !filteredTasks?.length ? (
        <div className="no-task-div">
          <img src="/svg/task/no-task-frame.svg" alt="" />
          <h3>No Task is Available yet, Please Add your New Task</h3>
        </div>
      ) : (
        <div className="task-card-div">
          {filteredTasks.map((task: any) => (
            <div key={task?._id}>
              <div onClick={() => handleTaskDetailsView(task._id)} className="task-single-card">
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
                        : task.status === "InProgress" || task.status === "Ongoing"
                        ? "inprogress-color"
                        : task.status === "Collaborative Task"
                        ? "collaborative-color"
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