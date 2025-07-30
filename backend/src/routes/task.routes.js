import express from "express";
import { taskController } from "../controllers/task.controller.js";
const router = express.Router();

router.get(`/task-list/:id`, taskController.getUsersTaskList);
router.post("/create-new", taskController.createNewTask);
router.patch(`/update/:id`, taskController.updateTask);
router.get(`/details/:id`, taskController.getTaskDetails);
router.patch(`/soft-delete/:id`, taskController.deleteTask);

export const taskRoutes = router;
