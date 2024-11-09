import { Request, Response } from "express";
import userModel from "../models/user_model.js";
import { SignUpDetails, LoginDetails } from "../types/index.js";
import { generateToken } from "../lib/utils.ts";

const userController = {
  verify: async (req: Request, res: Response) => {
    console.log("f")
    try {
      console.log("request received");

      const userDetails: LoginDetails = req.body;

      const response = await userModel.verify(userDetails);
      if (!response.verified) {
        res.status(response.status).json({ message: response.error });
      } else {
        const user = response.data;
        res.cookie("jwt", generateToken(user), {
          httpOnly: true,
          secure: process.env.ENVIRONMENT === "production",
          sameSite: "lax",
          maxAge: 30 * 60 * 1000,
          path: "/",
        });
        res.status(response.status).json({ data: response.data });
      }
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: "server error" });
    }
  },
  create: async (req: Request, res: Response) => {
    try {
      const userDetails: SignUpDetails = req.body;
      const response = await userModel.create(userDetails);
      res.status(201).json({ message: "user created", response });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "user not created", error });
    }
  },
};

export default userController;
