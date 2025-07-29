import express from "express";
import { taskController } from "../controllers/task.controller.js";
const router = express.Router();

router.post('/create-new', taskController.createNewTask);
router.post(`/update/:id`, taskController.updateTask);

export const taskRoutes = router;