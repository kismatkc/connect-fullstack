import express from "express";
import userController from "../controllers/user_controller.js";
const router = express.Router();

router.post("/create_user", userController.create);

export default router;
