import { useForm, type SubmitHandler, Controller } from "react-hook-form";
import "./AddTaskModal.scss";
import Cookies from "js-cookie";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { createNewTask } from "../../../services/taskServices";

interface AddTaskModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const categories = [
  { option: "Sport" },
  { option: "Family" },
  { option: "Nature" },
  { option: "Arts and Craft" },
  { option: "Friends" },
  { option: "Meditation" },
];

type TaskInputs = {
  category: string;
  details: string;
  deadline: Date;
  user: string;
};

const AddTaskModal: React.FC<AddTaskModalProps> = ({ isOpen, onClose }) => {
  const user = Cookies.get("task-management-app-userId");

  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isSubmitting },
  } = useForm<TaskInputs>();

  const onSubmit: SubmitHandler<TaskInputs> = async (data) => {
    data.user = user as string;
    const res = await createNewTask(data);
    if(res?.success){
      onClose();
    }
  };

  if (!isOpen) {
    return null;
  }

  return (
    <div className="add-task-modal-overlay">
      <div className="add-task-modal-content">
        <button className="modal-close-button" onClick={onClose}>
          <img src="/svg/modal/x.svg" alt="" />
        </button>
        <div className="heading">
          <h2>Add Your Goal</h2>
        </div>
        <div className="form-container">
          <form onSubmit={handleSubmit(onSubmit)}>
            {/* category select */}
            <div className="form-group">
              <label htmlFor="category">Category</label>
              <select
                id="category"
                {...register("category", { required: "Category is required" })}
              >
                <option value="">Select a category</option>
                {categories.map((cat) => (
                  <option key={cat.option} value={cat.option}>
                    {cat.option}
                  </option>
                ))}
              </select>
              {errors.category && (
                <span className="error-message">{errors.category.message}</span>
              )}
            </div>
            {/* details field */}
            <div className="form-group">
              <label htmlFor="details">Details</label>
              <input
                id="details"
                {...register("details", { required: "Details is required" })}
                type="text"
              />
              {errors.details && (
                <span className="error-message">{errors.details.message}</span>
              )}
            </div>

            <div className="form-group">
              <label htmlFor="deadline">Deadline</label>
              {/*  date - react-datepicker  */}
              <Controller
                control={control}
                name="deadline"
                rules={{ required: "Deadline is required" }}
                render={({ field }) => (
                  <DatePicker
                    id="deadline"
                    selected={field.value}
                    onChange={(date: Date | null) => {
                      field.onChange(date);
                    }}
                    minDate={new Date()}
                    dateFormat="yyyy/MM/dd"
                    placeholderText="Select a date"
                    className="custom-datepicker-input"
                    calendarClassName="custom-datepicker-calendar"
                    showPopperArrow={false}
                  />
                )}
              />
              {errors.deadline && (
                <span className="error-message">{errors.deadline.message}</span>
              )}
            </div>

            {/* Submit button */}
            <button type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Adding Task..." : "Add Task"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddTaskModal;
