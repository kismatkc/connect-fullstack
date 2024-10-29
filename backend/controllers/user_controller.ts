import { Request, Response } from "express";
import userModel from "../models/user_model.js";
import { userInput } from "../types/index.js";

const userController = {
  create: async (req: Request, res: Response) => {
    try {
      const userDetails: userInput = req.body;
      console.log("user details", userDetails);

      const response = await userModel.create(userDetails);

      res.status(201).json({ message: "user created", response });
    } catch (error) {
      res.status(500).json({ message: "user not created", error });
    }
  },
};

export default userController;
