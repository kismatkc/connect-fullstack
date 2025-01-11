import express, { json } from "express";

import userRoutes from "./routes/user_routes.js";

import cors from "cors";
import { corsOptions } from "./lib/utils.ts";
import cookieParser from "cookie-parser";
import { createServer } from "http";
import { Server } from "socket.io";
import { Redis } from "./lib/redis.ts";

const app = express();
const PORT = 4000;
app.use(cors(corsOptions()));
app.use(cookieParser());

const httpServer = createServer(app);
const io = new Server(httpServer, {
  cors: corsOptions(),
});

io.on("connection", (socket) => {
  const userIdleLimit = 10 * 1000;
  let userSetTimeout = undefined;
  let activeUser = undefined;
  const resetPinPongTimer = () => {
    if (userSetTimeout) clearTimeout(userSetTimeout);
    userSetTimeout = setTimeout(() => {
      console.log("kicked out due to inactivity");
      Redis.hdel("onlineUsers", activeUser).then(() =>
        io.emit("isOffline", activeUser)
      );

      socket.disconnect(true);
    }, userIdleLimit);
  };

  socket.on("ping", () => {
    console.log("ping");

    resetPinPongTimer();
  });
  resetPinPongTimer();
  console.log(`user connected`, socket.id);

  socket.on("registerUser", async (user: { senderId: string }) => {
    const { senderId } = user;
    activeUser = senderId;
    await Redis.hset("onlineUsers", senderId, socket.id);
    io.emit("isOnline", senderId);
    console.log("user registered", senderId);
  });
  socket.on("unregisterUser", async (user: { senderId: string }) => {
    const { senderId } = user;
    await Redis.hdel("onlineUsers", senderId);
    io.emit("isOffline", senderId);

    console.log("user unregistered", senderId);
  });
  socket.on(
    "sendMessage",
    async (user: { receiverId: string; message: string }) => {
      const { receiverId, message } = user;

      const recipientId = await Redis.hget("onlineUsers", receiverId);
      io.to(recipientId).emit("receiveMessage", message);
    }
  );

  socket.on("disconnect", () => {
    if (userSetTimeout) clearTimeout(userSetTimeout);

    console.log(`user disconnected`, socket.id);
  });
});

app.use(json());
app.use("/api/friends-status", async (req, res) => {
  try {
    const userIds = req.query.ids as string[];

    const onlineUsers = await Redis.hgetall("onlineUsers");
    const onlineFriends =
      userIds.length > 0
        ? userIds.map((item) => {
            const status = Object.hasOwn(onlineUsers, item)
              ? "online"
              : "offline";
            return { [item]: status };
          })
        : userIds;

    const data = Object.assign({}, ...onlineFriends);

    res.status(200).json({
      response: true,
      data: data || null,

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
