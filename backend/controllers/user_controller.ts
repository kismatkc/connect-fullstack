import { Request, Response } from "express";

import userModel from "../models/user_model.ts";

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
      console.log("test", id);
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
      const friendshipDetails = req.query.friendshipDetails as {userId: string,friendId: string};
      console.log("request received",friendshipDetails)
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
  }
};

export default userController;
