import express, { json } from "express";
import connectToDatabase from "./lib/database.ts";
import userRoutes from "./routes/user_routes.js";
import cors from "cors";
import { compareSync } from "bcrypt";
const app = express();
const PORT = 4000;
app.use(cors({
  origin: "*"
}))
app.use(json());
app.use("/api", userRoutes);


app.get("/", (req, res) => {
  res.send("Hello from the connect backend");
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

connectToDatabase();
