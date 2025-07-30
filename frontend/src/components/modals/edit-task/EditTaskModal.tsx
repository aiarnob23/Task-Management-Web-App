import { useForm, type SubmitHandler, Controller } from "react-hook-form";
import { useEffect } from "react";
import "./EditTaskModal.scss";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { updateTask } from "../../../services/taskServices";

interface EditTaskModalProps {
  isOpen: boolean;
  onClose: () => void;
  taskId: string;
  prevcategory: string;
  prevdetails: string;
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
};

const EditTaskModal: React.FC<EditTaskModalProps> = ({
  isOpen,
  onClose,
  taskId,
  prevcategory,
  prevdetails,
}) => {

  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<TaskInputs>();

  useEffect(() => {
    if (isOpen && prevcategory && prevdetails) {
      reset({
        category: prevcategory,
        details: prevdetails,
        deadline: undefined, 
      });
    }
  }, [isOpen, prevcategory, prevdetails, reset]);

  const onSubmit: SubmitHandler<TaskInputs> = async (data) => {
    try {
      await updateTask(taskId, data);
      onClose();
      window.location.reload();
    } catch (error) {
      console.error("Error updating task:", error);
    }
  };

  if (!isOpen) {
    return null;
  }

  return (
    <div className="edit-task-modal-overlay">
      <div className="edit-task-modal-content">
        <button className="modal-close-button" onClick={onClose}>
          <img src="/svg/modal/x.svg" alt="" />
        </button>
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
              {isSubmitting ? "Updating Task..." : "Update Task"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditTaskModal;