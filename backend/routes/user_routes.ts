import express from "express";
import userController from "../controllers/user_controller.ts";
const router = express.Router();

router.post("/create_user", userController.create);
router.post("/verify_user", userController.verify);

export default router;
