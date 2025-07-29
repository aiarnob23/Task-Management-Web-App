import express from "express";
import { userController } from "../controllers/user.controller.js";
const router = express.Router();

router.post('/create-new', userController.createNewUserToDB);
router.post('/login', userController.userLoginVerification);

export const userRoutes = router;