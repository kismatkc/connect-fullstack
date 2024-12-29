import { Request, Response } from "express";

import userModel from "../models/user_model.ts";
import { createGeneralNotificationsType } from "../types/index.ts";
import sharp from "sharp";
import {
  deletePictures,
  uploadPicture,
} from "../lib/picture-supabase-utils.ts";

const userController = {
  create: async (req: Request, res: Response) => {
    try {
      const userDetails = req.body;
      const user = await userModel.create(userDetails);
      if (user.status === 201) {
        res
          .status(user.status)
          .json({ success: true, data: user.data, message: user.message });
      } else {
        console.log(user.error);

        res.status(user.status).json({ success: false, message: user.message });
      }
    } catch (error) {
      console.log(error);

      res
        .status(500)
        .json({ success: false, message: "Internal server error" });
    }
  },

  verify: async (req: Request, res: Response) => {
    try {
      const userDetails = req.body;
      const user = await userModel.verify(userDetails);
      if (user.status === 200) {
        res
          .status(user.status)
          .json({ success: true, data: user.data, message: user.message });
      } else {
        console.log(user.error);

        res.status(user.status).json({ success: false, message: user.message });
      }
    } catch (error) {
      res
        .status(500)
        .json({ success: false, message: "Internal server error" });
    }
  },
  getPeople: async (req: Request, res: Response) => {
    try {
      const query = req.query.query as string;

      const response = await userModel.getPeople(query);

      res.status(response.status).json({
        success: true,
        data: response.data,
        message: response.message,
      });
    } catch {
      res
        .status(500)
        .json({ success: false, message: "Internal server error" });
    }
  },
  getUserDetails: async (req: Request, res: Response) => {
    try {
      const id = req.query.query as string;

      const response = await userModel.getUserDetails(id);

      res.status(response.status).json({
        success: true,
        data: response.data,
        message: response.message,
      });
    } catch (error) {
      console.log(error);
      res
        .status(500)
        .json({ success: false, message: "Internal server error" });
    }
  },
  sendFriendRequest: async (req: Request, res: Response) => {
    try {
      const friendRequestDetails = req.body;
      const response = await userModel.sendFriendRequest(friendRequestDetails);

      res.status(response.status).json({
        success: true,
        data: response.data || null,
        error: response.error || null,
        message: response.message,
      });
    } catch (error) {
      console.log(error);
      res
        .status(500)
        .json({ success: false, message: "Internal server error", error });
    }
  },
  getPendingRequests: async (req: Request, res: Response) => {
    try {
      const recipientId = req.query.recipientId as string;

      const response = await userModel.getPendingRequests(recipientId);
      const data = response.data.map((item) => {
        const { id, requester_id, requester } = item;

        return { id, requester_id, ...requester };
      });

      res.status(response.status).json({
        success: true,
        data: data || null,
        error: response.error || null,
        message: response.message,
      });
    } catch (error) {
      console.log(error);
      res
        .status(500)
        .json({ success: false, message: "Internal server error", error });
    }
  },
  deletePendingRequest: async (req: Request, res: Response) => {
    try {
      const id = req.query.friendRequestId as string;

      const response = await userModel.deletePendingRequest(id);
      res.status(response.status).json({
        success: true,
        data: response.data || null,
        error: response.error || null,
        message: response.message,
      });
    } catch (error) {
      console.log(error);
      res
        .status(500)
        .json({ success: false, message: "Internal server error", error });
    }
  },
  acceptPendingRequest: async (req: Request, res: Response) => {
    try {
      const id = req.body.friendRequestId as string;
      const response = await userModel.acceptPendingRequest(id);
      res.status(response.status).json({
        success: true,
        data: response.data || null,
        error: response.error || null,
        message: response.message,
      });
    } catch (error) {
      console.log(error);
      res
        .status(500)
        .json({ success: false, message: "Internal server error", error });
    }
  },
  getFriendshipStatus: async (req: Request, res: Response) => {
    try {
      const friendshipDetails = req.query.friendshipDetails as {
        userId: string;
        friendId: string;
      };
      const response = await userModel.getFriendshipStatus(friendshipDetails);
      res.status(response.status).json({
        success: true,
        data: response.data || null,
        error: response.error || null,
        message: response.message,
      });
    } catch (error) {
      console.log(error);
      res
        .status(500)
        .json({ success: false, message: "Internal server error", error });
    }
  },
  createGeneralNotifications: async (req: Request, res: Response) => {
    try {
      const notificationDetails = req.body as createGeneralNotificationsType;

      const notification = await userModel.createGeneralNotifications(
        notificationDetails
      );
      res.status(notification.status).json({
        success: true,
        data: notification.data || null,
        error: notification.error || null,
        message: notification.message,
      });
    } catch (error) {
      console.log(error);
      res
        .status(500)
        .json({ success: false, message: "Internal server error", error });
    }
  },
  getGeneralNotifications: async (req: Request, res: Response) => {
    try {
      const notificationDetails = req.query as {
        notificationFor: string;
        notificationType: string;
      };

      const notification = await userModel.getGeneralNotification(
        notificationDetails
      );
      if (notification?.data && notification.data.length > 0) {
        const data = notification.data.map((item) => {
          return {
            notification_description: item.notification_description,
            ...item.notification_from,
          };
        });
        console.log(data);

        res.status(notification.status).json({
          success: true,
          data: data || null,
          error: notification.error || null,
          message: notification.message,
        });
      } else {
        res.status(notification.status).json({
          success: true,
          data: notification.data || null,
          error: notification.error || null,
          message: notification.message,
        });
      }
    } catch (error) {
      console.log(error);
      res
        .status(500)
        .json({ success: false, message: "Internal server error", error });
    }
  },
  getFriendsDetails: async (req: Request, res: Response) => {
    try {
      const userId = req.query.query as string;
     

      const response = await userModel.getFriendsDetails(userId);
      const data = response.data.map((item) => {
        const { fk_recipient, fk_requester } = item;
        //@ts-ignore
        return fk_recipient.id === userId ? fk_requester : fk_recipient;
      });
      res.status(response.status).json({
        success: true,
        data: data || null,
        error: response.error || null,
        message: response.message,
      });
    } catch (error) {
      console.log(error);
      res
        .status(500)
        .json({ success: false, message: "Internal server error", error });
    }
  },
  createPost: async (req: Request, res: Response) => {
    try {
      const description = req.body.description;
      const file = req.file;
      const userId = req.body.userId;
      if (!(file && description))
        throw new Error("No file or description provided");

      const uuid = crypto.randomUUID();

      const images = [{ width: 680, fileName: `680-${uuid}-${userId}photo` }];

      const [urlWithoutSize] = await Promise.all(
        images.map(async (image) => {
          const buffer = await sharp(file.buffer)
            .resize({ width: image.width })
            .toBuffer();
          const response = await uploadPicture(image.fileName, buffer);
          return response;
        })
      );
      const response = await userModel.createPost(
        urlWithoutSize,
        description,
        userId
      );

      res.status(response.status).json({
        response: response.success,
        data: response.data || null,
        error: response.error || null,
        message: response.message,
      });
    } catch (error) {
      console.log(error);
      res
        .status(500)
        .json({ success: false, message: "Internal server error", error });
    }
  },
  deletePost: async (req: Request, res: Response) => {
    try {
      const postId = req.query.postId as string;

      const response = await userModel.deletePost(postId);
      const deleted = await deletePictures(response.data.post_picture_link);

      res.status(response.status).json({
        success: true,
        data: response.data || null,
        error: response.error || null,
        message: response.message,
      });
    } catch (error) {
      console.log(error);
      res
        .status(500)
        .json({ success: false, message: "Internal server error", error });
    }
  },

  getYourPosts: async (req: Request, res: Response) => {
    try {
      const userId = req.query.userId as string;

      const response = await userModel.getYourPosts(userId);
      const posts = response.data.map((post: any) => {
        return {
          user: {
            firstName: post.user_id.first_name,
            lastName: post.user_id.last_name,
            avatarLink: post.user_id.profile_picture_url,
            userId: post.user_id.id,
          },
          postId: post.id,
          description: post.description,
          pictureLink: post.post_picture_link,
        };
      });

      res.status(response.status).json({
        response: response.success,
        data: posts || null,
        error: response.error || null,
        message: response.message,
      });
    } catch (error) {
      console.log(error);
      res
        .status(500)
        .json({ success: false, message: "Internal server error", error });
    }
  },

  getFriendsPosts: async (req: Request, res: Response) => {
    try {
      const userId = req.query.userId as string;
      const friendsResponse = await userModel.getFriendsDetails(userId);
      const friendsDetails = friendsResponse.data.map((item) => {
        const { fk_recipient, fk_requester } = item;
        //@ts-ignore
        return fk_recipient.id === userId ? fk_requester : fk_recipient;
      });
      const friendIds = friendsDetails.map((friend: any) => friend.id);
      const response = await userModel.getFriendsPosts(friendIds);
      const posts = response.data.map((post: any) => {
        return {
          user: {
            firstName: post.user_id.first_name,
            lastName: post.user_id.last_name,
            avatarLink: post.user_id.profile_picture_url,
            userId: post.user_id.id,
          },
          postId: post.id,
          description: post.description,
          pictureLink: post.post_picture_link,
        };
      });

      const data = res.status(response.status).json({
        response: response.success,
        data: posts || null,
        error: response.error || null,
        message: response.message,
      });
    } catch (error) {
      console.log(error);
      res
        .status(500)
        .json({ success: false, message: "Internal server error", error });
    }
  },
  createLike: async (req: Request, res: Response) => {
    try {
      const likeDetails = req.body;
      const response = await userModel.createLike(likeDetails);
      res.status(response.status).json({
        response: response.success,
        data: response.data,
        error: response.error || null,
        message: response.message,
      });
    } catch (error) {
      console.log(error);

      res
        .status(500)
        .json({ success: false, message: "Internal server error" });
    }
  },
  likeStatus: async (req: Request, res: Response) => {
    try {
      const likeDetails = req.query as { postId: string; userId: string };
      const response = await userModel.likeStatus(likeDetails);
      console.log(response.data);

      res.status(response.status).json({
        response: response.success,
        data: response.data || null,
        error: response.error || null,
        message: response.message,
      });
    } catch (error) {
      console.log(error);

      res
        .status(500)
        .json({ success: false, message: "Internal server error" });
    }
  },
  deleteLike: async (req: Request, res: Response) => {
    try {
      const likeId = req.params.likeId;
      console.log(likeId);

      const response = await userModel.deleteLike(likeId);
      res.status(response.status).json({
        response: response.success,
        data: null,
        error: response.error || null,
        message: response.message,
      });
    } catch (error) {
      console.log(error);

      res
        .status(500)
        .json({ success: false, message: "Internal server error" });
    }
  },
  getPeopleWhoLikedThePost: async (req: Request, res: Response) => {
    try {
      const postId = req.params.postId;

      const response = await userModel.getPeopleWhoLikedThePost(postId);
      const data =
        //@ts-ignore
        response.data.length > 0
          ? //@ts-ignore

            response.data.map((like) => ({
              id: like.user_details.id,

              firstName: like.user_details.first_name,

              lastName: like.user_details.last_name,

              profilePictureUrl: like.user_details.profile_picture_url,
            }))
          : response.data;
      res.status(response.status).json({
        response: response.success,
        data,
        error: response.error || null,
        message: response.message,
      });
    } catch (error) {
      console.log(error);

      res
        .status(500)
        .json({ success: false, message: "Internal server error" });
    }
  },
  createComment: async (req: Request, res: Response) => {
    try {
      const commentDetails = req.body;
      const response = await userModel.createComment(commentDetails);
      res.status(response.status).json({
        response: response.success,

        error: response.message || null,
        message: response.message,
      });
    } catch (error) {
      console.log(error);

      res
        .status(500)
        .json({ success: false, message: "Internal server error" });
    }
  },
  getAllComments: async (req: Request, res: Response) => {
    try {
      const postId = req.params.postId;

      const response = await userModel.getAllComments(postId);
      const data =
        //@ts-ignore
        response.data.length > 0
          ? //@ts-ignore

            response.data.map((comment: any) => ({
              id: comment.user_details.id,

              firstName: comment.user_details.first_name,

              lastName: comment.user_details.last_name,

              profilePictureUrl: comment.user_details.profile_picture_url,
              description: comment.description,
              commentId: comment.id,
            }))
          : response.data;
      res.status(response.status).json({
        response: response.success,
        data,
        error: response.error || null,
        message: response.message,
      });
    } catch (error) {
      console.log(error);

      res
        .status(500)
        .json({ success: false, message: "Internal server error", error });
    }
  },
  deleteComment: async (req: Request, res: Response) => {
    try {
      const commentId = req.params.commentId;

      const response = await userModel.deleteComment(commentId);
      res.status(response.status).json({
        response: response.success,
        data: null,
        error: response.error || null,
        message: response.message,
      });
    } catch (error) {
      console.log(error);

      res
        .status(500)
        .json({ success: false, message: "Internal server error" });
    }
  },
};

export default userController;
