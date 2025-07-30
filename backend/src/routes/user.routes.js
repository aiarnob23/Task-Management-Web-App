import express from "express";
import { userController } from "../controllers/user.controller.js";
const router = express.Router();

router.post('/create-new', userController.createNewUserToDB);
router.post('/login', userController.userLoginVerification);
router.patch(`/update/:id`, userController.updateUserDetails);

export const userRoutes = router;