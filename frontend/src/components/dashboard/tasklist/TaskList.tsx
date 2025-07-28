import  { useState, useEffect, useRef } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import './TaskList.scss';

const TaskList = () => {
  const [isCategoryOpen, setIsCategoryOpen] = useState(false);
  const [isStatusOpen, setIsStatusOpen] = useState(false);
  const [selectedCategories, setSelectedCategories] = useState<any>([]);
  const [selectedStatus, setSelectedStatus] = useState(['Pending']);

  const categories = [
    'Arts and Craft',
    'Nature',
    'Family',
    'Sport',
    'Friends',
    'Meditation',
  ];

  const statusOptions = [
    'All Task',
    'Ongoing',
    'Pending',
    'Collaborative Task',
    'Done',
  ];

  const categoryDropdownRef = useRef<any>(null);
  const statusDropdownRef = useRef<any>(null);

  // dropdown close handle
  useEffect(() => {
    const handleClickOutside = (event : any) => {
      if (
        categoryDropdownRef.current && !categoryDropdownRef.current.contains(event.target) &&
        statusDropdownRef.current && !statusDropdownRef.current.contains(event.target)
      ) {
        setIsCategoryOpen(false);
        setIsStatusOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
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

  const handleCategoryToggle = (category:string) => {
    setSelectedCategories((prev:any) => {
      if (prev.includes(category)) {
        return prev.filter((c:any) => c !== category);
      } else {
        return [...prev, category];
      }
    });
  };

  const handleStatusSelect = (status:any) => {
    if (status === 'All Task') {
      setSelectedStatus([
        'All Task',
        'Ongoing',
        'Pending',
        'Collaborative Task',
        'Done',
      ]);
    } else {
      setSelectedStatus((prev) => {
        if (prev.includes(status)) {
          return prev.filter((s) => s !== status);
        } else {
          if (prev.includes('All Task')) {
            return prev.filter((s) => s !== 'All Task');
          }
          return [...prev, status];
        }
      });
    }
  };

  const getCategoryDisplayText = () => {
    if (selectedCategories.length === 0) {
      return 'Select Task Category';
    } else if (selectedCategories.length === 1) {
      return selectedCategories[0];
    } else {
      return `${selectedCategories[0]} , ${selectedCategories[1]}, ...`;
    }
  };

  const getStatusDisplayText = () => {
    if (selectedStatus.length === statusOptions.length) {
      return 'All Task';
    } else if (selectedStatus.length === 0) {
      return 'Select Status';
    } else if (selectedStatus.length === 1) {
      return selectedStatus[0];
    } else {
      return `${selectedStatus[0]} , ${selectedStatus[1]}, ...`;
    }
  };

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
                <span className="dropdown-text">{getCategoryDisplayText()}</span>
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

          <button className="add-task-button">Add New Task</button>
        </div>
      </div>
    </div>
  );
};

export default TaskList;
