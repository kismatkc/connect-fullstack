import express from "express";
import userController from "../controllers/user_controller.ts";
const router = express.Router();

router.post("/create_user", userController.create);
router.post("/verify_user", userController.verify);
router.get("/get-searched-friends", userController.getFriends);

export default router;
