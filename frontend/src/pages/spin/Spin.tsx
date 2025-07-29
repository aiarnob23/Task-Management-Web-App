import { useState, useMemo, useRef, useEffect } from "react";
import { ChevronDown, ChevronUp } from "lucide-react"; 
import "./Spin.scss";
import { Wheel } from "react-custom-roulette";
import { Link } from "react-router";

const allCategoriesData = [
  { option: "Sport" },
  { option: "Family" },
  { option: "Nature" },
  { option: "Arts and Craft" },
  { option: "Friends" },
  { option: "Meditation" },
];

const Spin = () => {
  const [mustSpin, setMustSpin] = useState(false);
  const [prizeNumber, setPrizeNumber] = useState(0);
  const [selectedCategories, setSelectedCategories] = useState<string[]>(
    allCategoriesData.map((item) => item.option)
  );
  const [isCategoryDropdownOpen, setIsCategoryDropdownOpen] = useState(false);
  const categoryDropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        categoryDropdownRef.current &&
        !categoryDropdownRef.current.contains(event.target as Node)
      ) {
        setIsCategoryDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const wheelData = useMemo(() => {
    return allCategoriesData.filter((item) =>
      selectedCategories.includes(item.option)
    );
  }, [selectedCategories]);

  const handleSpinClick = () => {
    if (wheelData.length === 0) {
      console.warn("No categories selected to spin the wheel!");
      return;
    }
    const newPrizeNumber = Math.floor(Math.random() * wheelData.length);
    setPrizeNumber(newPrizeNumber);
    setMustSpin(true);
  };

  const handleCategoryToggle = (categoryOption: string) => {
    setSelectedCategories((prevSelectedCategories) => {
      if (prevSelectedCategories.includes(categoryOption)) {
        if (prevSelectedCategories.length <= 2) {
          console.warn(
            "At least two categories must be selected. Cannot uncheck this category."
          );
          return prevSelectedCategories;
        }
        return prevSelectedCategories.filter((id) => id !== categoryOption);
      } else {
        return [...prevSelectedCategories, categoryOption];
      }
    });
  };

  const getCategoryDisplayText = () => {
    if (selectedCategories.length === 0) {
      return "Select Task Category";
    } else if (selectedCategories.length === allCategoriesData.length) {
      return "All Categories";
    } else if (selectedCategories.length === 1) {
      return selectedCategories[0];
    } else {
      return `${selectedCategories[0]}, ${selectedCategories[1]}, ...`;
    }
  };

  return (
    <div className="spin-container">
      <div className="left-div">
        <h3>Spin Wheel</h3>
      </div>
      <div className="middle-div">
        <div className="spinner">
          <Wheel
            mustStartSpinning={mustSpin}
            prizeNumber={prizeNumber}
            data={wheelData}
            outerBorderColor={"#CD3916"}
            outerBorderWidth={12}
            radiusLineColor={[
              "#FF7F0E",
              "#2CA02C",
              "#FFBB78",
              "#2CA02C",
              "#98DF8A",
              "#98DF8A",
            ]}
            radiusLineWidth={1}
            fontSize={15}
            textColors={["#1F1F1F"]}
            backgroundColors={[
              "#98DF8A",
              "#1F77B4",
              "#AEC7E8",
              "#FF7F0E",
              "#FFBB78",
              "#2CA02C",
            ]}
            onStopSpinning={() => {
              setMustSpin(false);
              console.log(
                "Prize won:",
                wheelData.length > 0 ? wheelData[prizeNumber].option : "No prize"
              );
            }}
          />
        </div>
        <div className="circle"></div>
        <p>Spin Wheel to pick your task</p>
        <div className="spin-buttons">
          <button onClick={handleSpinClick}>Spin</button>
          <button><Link to='/dashboard'>Go To Task</Link></button>
        </div>
      </div>
      <div className="right-div">
        <h4>Select Task Category</h4>
        {/* Category Selection Dropdown */}
        <div className="category-selection">
          <div ref={categoryDropdownRef} className="dropdown-wrapper">
            <button
              onClick={() => setIsCategoryDropdownOpen(!isCategoryDropdownOpen)}
              className="dropdown-button"
            >
              <span className="dropdown-text">
                {getCategoryDisplayText()}
              </span>
              {isCategoryDropdownOpen ? (
                <ChevronUp className="dropdown-icon" />
              ) : (
                <ChevronDown className="dropdown-icon" />
              )}
            </button>

            {isCategoryDropdownOpen && (
              <div className="dropdown-menu">
                <div className="dropdown-content">
                  {allCategoriesData.map((category) => (
                    <div
                      key={category.option}
                      className="dropdown-item"
                      onClick={() => handleCategoryToggle(category.option)}
                    >
                      <div className="checkbox-wrapper">
                        <input
                          type="checkbox"
                          checked={selectedCategories.includes(category.option)}
                          onChange={() => handleCategoryToggle(category.option)}
                          className="dropdown-checkbox"
                        />
                        {selectedCategories.includes(category.option) && (
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
                      <span className="dropdown-label">{category.option}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Spin;