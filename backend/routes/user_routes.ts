import express from "express";
import userController from "../controllers/user_controller.ts";
const router = express.Router();

import formDataResolver from "../lib/form-data-resolver.ts";
router.post("/create_user", userController.create);
router.post("/verify_user", userController.verify);
router.get("/get-searched-friends", userController.getPeople);
router.get("/get-user-profile-details", userController.getUserDetails);
router.post("/send-friend-request", userController.sendFriendRequest);
router.post(
  "/create-general-notification",
  userController.createGeneralNotifications
);
router.post("/create-post", formDataResolver, userController.createPost);
router.post("/create-like", userController.createLike);
router.delete("/delete-like/:likeId", userController.deleteLike);
router.get("/get-pending-request", userController.getPendingRequests);
router.get("/get-friendship-status", userController.getFriendshipStatus);
router.get("/get-like-status", userController.likeStatus);
router.get("/get-friends", userController.getFriendsDetails);
router.get("/get-your-posts", userController.getYourPosts);
router.get("/get-friends-posts", userController.getFriendsPosts);
router.get(
  "/get-general-notifications",
  userController.getGeneralNotifications
);
router.get(
  "/get-people-who-liked-the-post/:postId",
  userController.getPeopleWhoLikedThePost
);
router.delete("/delete-pending-request", userController.deletePendingRequest);
router.delete("/delete-post", userController.deletePost);
router.patch("/accept-pending-request", userController.acceptPendingRequest);

export default router;
