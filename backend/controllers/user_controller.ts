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

 
      res
        .status(response.status)
        .json({
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
};

export default userController;
