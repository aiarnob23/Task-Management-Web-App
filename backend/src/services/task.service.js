import { Task } from "../models/task.model.js";

// create new task
const createNewTask = async (payload) => {
  const result = await Task.create(payload);
  return result;
};

//update task status
const updateTask = async (_id, payload) => {
  const result = await Task.findByIdAndUpdate(_id, payload);
  return result;
};

//get user's task list
const getTaskList = async (userId) => {
  const result = await Task.find({
    user: userId,
    isDeleted: false,
  });
  return result;
};

export const taskService = {
  createNewTask,
  updateTask,
  getTaskList,
};
