import { taskService } from "../services/task.service.js";
import catchAsync from "../utils/catchAsync.js";
import sendResponse from "../utils/sendResponse.js";
import AppError from "../error/appError.js";

//get user's task
const getUsersTaskList = catchAsync(async (req, res) => {
  const userId = req?.params?.id;
  if (req.realUser.userId !== userId) {
    return next(new AppError("Access Denied", 401));
  }
  if (userId) {
    const result = await taskService.getTaskList(userId);
    if (result) {
      return sendResponse(res, {
        success: true,
        statusCode: 200,
        message: "Task list fetched successfully",
        data: result,
      });
    }
  }
  return sendResponse(res, {
    success: false,
    statusCode: 500,
    message: "Something went wrong",
    data: null,
  });
});

//find a task details
const getTaskDetails = catchAsync(async (req, res) => {
  const _id = req?.params?.id;
  if (_id) {
    const result = await taskService.findTaskById(_id);
    if (result) {
      return sendResponse(res, {
        success: true,
        statusCode: 200,
        message: "Task details fetched successfully",
        data: result,
      });
    }
  }
  return sendResponse(res, {
    success: false,
    statusCode: 404,
    message: "Task details not found",
    data: null,
  });
});

//create new task
const createNewTask = catchAsync(async (req, res) => {
  const payload = req?.body;
  if (payload) {
    const result = await taskService.createNewTask(payload);
    if (result) {
      return sendResponse(res, {
        success: true,
        statusCode: 200,
        message: "Task created successfully",
        data: result,
      });
    }
  }
  return sendResponse(res, {
    success: false,
    statusCode: 500,
    message: "Something went wrong",
    data: null,
  });
});

//update task details
const updateTask = catchAsync(async (req, res) => {
  const payload = req?.body;
  const _id = req?.params?.id;
  const taskDetails = await taskService.findTaskById(_id);

  if (!taskDetails) {
    return next(new AppError("Data Not found", 404));
  }

  if (taskDetails.user !== req.realUser?.userId) {
    return next(new AppError("Access Denied", 401));
  }

  if (payload && _id) {
    const result = await taskService.updateTask(_id, payload);
    if (result) {
      return sendResponse(res, {
        success: true,
        statusCode: 200,
        message: "Task updated successfully",
        data: result,
      });
    }
  }
  return sendResponse(res, {
    success: false,
    statusCode: 500,
    message: "Something went wrong",
    data: null,
  });
});

//soft delete
const deleteTask = catchAsync(async (req, res) => {
  const _id = req?.params?.id;
  const taskDetails = await taskService.findTaskById(_id);
  if (taskDetails.user !== req.realUser?.userId) {
    return next(new AppError("Access Denied", 401));
  }
  if (_id) {
    const result = await taskService.deleteTask(_id);
    if (result) {
      return sendResponse(res, {
        success: true,
        statusCode: 200,
        message: "Task deleted successfully",
        data: result,
      });
    }
  }
  return sendResponse(res, {
    success: false,
    statusCode: 404,
    message: "Failed to delete the task",
    data: null,
  });
});

export const taskController = {
  createNewTask,
  updateTask,
  deleteTask,
  getUsersTaskList,
  getTaskDetails,
};
