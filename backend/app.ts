import express, { json } from "express";

import userRoutes from "./routes/user_routes.js";

import cors from "cors";
import { corsOptions } from "./lib/utils.ts";
import cookieParser from "cookie-parser";
import { createServer } from "http";
import { Server } from "socket.io";

const app = express();
const PORT = 4000;
app.use(cors(corsOptions()));
app.use(cookieParser());

const httpServer = createServer(app);
const io = new Server(httpServer, {
  cors: corsOptions(),
});

const onlineUsers = {};

io.on("connection", (socket) => {
  // socket.on("status")
  socket.on("registerUser", (user: { senderId: string }) => {
    const { senderId } = user;
    onlineUsers[senderId] = socket.id;
    console.log("regiwtered", onlineUsers);
  });
  socket.on("unregisterUser", (user: { senderId: string }) => {
    const { senderId } = user;
    const hi = delete onlineUsers[senderId];

    console.log("user unregistered", onlineUsers);
  });
  socket.on("sendMessage", (user: { receiverId: string; message: string }) => {
    const { receiverId, message } = user;

    io.to(onlineUsers[receiverId]).emit("receiveMessage", message);
  });

  socket.on("disconnect", (user) => {
    console.log(`user disconnected`);
  });
});

app.use(json());
app.use("/api/friends-status", (req, res) => {
  try {
    const userIds = req.query.ids as string[];
    const onlineFriends =
      userIds.length > 0
        ? userIds.map((item) => {
            const status = Object.hasOwn(onlineUsers, item)
              ? "online"
              : "offline";
            return { [item]: status };
          })
        : userIds;
    console.log(onlineFriends);

    res.status(200).json({
      response: true,
      data: onlineFriends || null,

      message: "online friends found",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      response: false,
      error: error || null,

      message: "online friends not found",
    });
  }
});
app.use("/api", userRoutes);

app.get("/", (req, res) => {
  res.send("Hello from the connect backend");
});

httpServer.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
