import express from "express";
import userController from "../controllers/user_controller.ts";
const router = express.Router();

router.post("/create_user", userController.create);
router.post("/verify_user", userController.verify);
router.get("/get-searched-friends", userController.getPeople);
router.get("/get-user-profile-details", userController.getUserDetails);
router.post("/send-friend-request", userController.sendFriendRequest);
router.get("/get-pending-request", userController.getPendingRequests);

export default router;
