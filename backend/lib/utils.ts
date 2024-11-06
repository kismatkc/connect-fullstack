import { CorsOptions } from "cors";
import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
export const corsOptions = (): CorsOptions => ({
  origin: process.env.FRONTEND_URL,
  credentials: true,
  methods: ["GET", "POST", "PUT", "OPTIONS"],
});

type user = {
  email: string;
  firstName: string;
  lastName: string;
  birthday: Date;
  gender: string;
  avatarUrl: string;
};

export const generateToken = (user: user) => {
  const token = jwt.sign(user, process.env.JWT_SECRET, {
    expiresIn: "1d",
  });
  return token;
};

export const verifyToken = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const token = req.cookies.jwt;
    const allowAccess = jwt.verify(token, process.env.JWT_SECRET);
    next();
  } catch (error) {
    res.status(403).json({
      success: false,
      message: "You dont have enough permisson to visit this resources",
    });
    console.log(error);
  }
};
// console.log(
//   generateToken({
//     email: "john.doe@example.com",
//     firstName: "John",
//     lastName: "Doe",
//     birthday: new Date("1990-01-01"),
//     gender: "male",
//     avatarUrl: "https://placehold.co/150x150",
//   })
// );
