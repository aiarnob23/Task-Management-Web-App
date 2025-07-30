import express from "express";
import { taskController } from "../controllers/task.controller.js";
import { verifyToken } from "../middlewares/auth.middlewares.js";
const router = express.Router();

router.get(`/task-list/:id`,verifyToken, taskController.getUsersTaskList);
router.post("/create-new", taskController.createNewTask);
router.patch(`/update/:id`, taskController.updateTask);
router.get(`/details/:id`, taskController.getTaskDetails);
router.patch(`/soft-delete/:id`, taskController.deleteTask);

export const taskRoutes = router;
