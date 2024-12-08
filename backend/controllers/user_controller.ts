import { Request, response, Response } from "express";

import userModel from "../models/user_model.ts";
import { createGeneralNotificationsType } from "../types/index.ts";
import sharp from "sharp";
import { uploadPicture } from "../lib/upload-picture-supabase.ts";

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

      const notification =
        await userModel.createGeneralNotifications(notificationDetails);
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

      const notification =
        await userModel.getGeneralNotification(notificationDetails);
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
      //       {
      //   fieldname: 'picture',
      //   originalname: 'DVR #1_Rec + Excerise Room_DVR #1_20240814072634_20240814072650_83805105 (2).jpg',
      //   encoding: '7bit',
      //   mimetype: 'image/jpeg',
      //   buffer: <Buffer ff d8 ff fe 00 0b 68 69 6b 76 69 73 69 6f 6e ff db 00 43 00 06 04 05 06 05 04 06 06 05 06 07 07 06 08 0a 10 0a 0a 09 09 0a 14 0e 0f 0c 10 17 14 18 18 ... 50304 more bytes>,
      //   size: 50354
      // }
      const description = req.body.description;
      const file = req.file;
      if (!(file || description))
        throw new Error("No file or description provided");
      const images = [
        { width: 640, fileName: `small-${file.originalname}` },
        { width: 1024, fileName: `medium-${file.originalname}` },
        { width: 1280, fileName: `large-${file.originalname}` },
      ];

      const resizedimages = await Promise.all(
        images.map(async (image) => {
          const buffer = await sharp(file.buffer)
            .resize({ width: image.width })
            .toBuffer();
          const response = await uploadPicture(image.fileName, buffer);
          return response;
        }),
      );
      console.log(resizedimages);

      res.status(200);
    } catch (error) {
      res
        .status(500)
        .json({ success: false, message: "Internal server error", error });
      console.log(error);
    }
  },
};

export default userController;
