import express from "express";
import { userController } from "../controllers/user.controller.js";
import { verifyToken } from "../middlewares/auth.middlewares.js";
const router = express.Router();

router.post('/create-new', userController.createNewUserToDB);
router.post('/login', userController.userLoginVerification);
router.patch(`/update/:id`,verifyToken, userController.updateUserDetails);
router.get(`/find-points/:id`, userController.getUsersPoints);

export const userRoutes = router;