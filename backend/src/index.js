import express from "express";
import dotenv from "dotenv";

import userRouter from "../routes/user.routes.js";
import adminRouter from "../routes/admin.routes.js";
import authRouter from "../routes/auth.routes.js";
import songsRouter from "../routes/songs.routes.js";
import albumsRouter from "../routes/albums.routes.js";
import statsRouter from "../routes/stats.routes.js";

import { connectDB } from "../lib/db.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use("/api/users", userRouter);
app.use("/api/admin", adminRouter);
app.use("/api/auth", authRouter);
app.use("/api/songs", songsRouter);
app.use("/api/albums", albumsRouter);
app.use("/api/stats", statsRouter);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  connectDB();
});
