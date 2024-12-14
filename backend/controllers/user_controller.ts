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
      console.log(req.query);

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
      if (!(file || description))
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
};

export default userController;
