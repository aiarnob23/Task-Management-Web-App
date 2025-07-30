import { model, Schema } from "mongoose";

const taskSchema = new Schema({
  category: {
    type: String,
    required: true,
  },
  details: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    required: false,
    default: "Pending",
  },
  deadline: {
    type: Date,
    required: true,
  },
  points: {
    type: Number,
    required: false,
    default: 20,
  },
  isDeleted: {
    type: Boolean,
    default: false,
    required: false,
  },
  user: {
    type: String,
    required: true,
  },
});

export const Task = model("Task", taskSchema);
