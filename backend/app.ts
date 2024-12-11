import express, { json } from "express";

import userRoutes from "./routes/user_routes.js";


import cors from "cors";
import { corsOptions } from "./lib/utils.ts";
import cookieParser from "cookie-parser";

const app = express();
const PORT = 4000;
app.use(cors(corsOptions()));
app.use(cookieParser());


app.use(json());

app.use("/api", userRoutes);

app.get("/", (req, res) => {
  res.send("Hello from the connect backend");
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});


