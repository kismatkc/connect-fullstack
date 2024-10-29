import express, { json } from "express";
import connectToDatabase from "./lib/database.js";
import userRoutes from "./routes/user_routes.js";
const app = express();
const PORT = process.env.PORT || 4000;
app.use(json());
app.use("/api", userRoutes);

app.get("/", (req, res) => {
  res.send("Hello from the connect backend");
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

connectToDatabase();
