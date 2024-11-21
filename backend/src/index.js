import express from "express";
import dotenv from "dotenv";
import { clerkMiddleware } from "@clerk/express";
import fileUpload from "express-fileupload";
import path from "path";

import userRouter from "../routes/user.routes.js";
import adminRouter from "../routes/admin.routes.js";
import authRouter from "../routes/auth.routes.js";
import songsRouter from "../routes/songs.routes.js";
import albumsRouter from "../routes/albums.routes.js";
import statsRouter from "../routes/stats.routes.js";

import { connectDB } from "../lib/db.js";

dotenv.config();

const __dirname = path.resolve();
const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());

app.use(clerkMiddleware()); // adds auth to req object => req.auth
app.use(
  fileUpload({
    useTempFiles: true,
    tempFileDir: path.join(__dirname, "tmp"),
    createParentPath: true,
    limits: {
      fileSize: 5 * 1024 * 1024, //5 MB max file size
    },
  })
);

app.use("/api/users", userRouter);
app.use("/api/admin", adminRouter);
app.use("/api/auth", authRouter);
app.use("/api/songs", songsRouter);
app.use("/api/albums", albumsRouter);
app.use("/api/stats", statsRouter);

// global error handler
app.use((err, req, res, next) => {
  res.status(500).json({
    success: false,
    message:
      process.env.NODE_ENV === "development"
        ? err.message
        : "Internal Server Error",
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  connectDB();
});
