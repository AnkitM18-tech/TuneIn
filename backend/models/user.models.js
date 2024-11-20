import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
      required: true,
    },
    imageUrl: {
      type: String,
      required: true,
    },
    clerkId: {
      // while using a 3rd party service like clerk, we are storing the id for users to keep track
      type: String,
      required: true,
      unique: true,
    },
  },
  { timestamps: true } // createdAt, updatedAt
);

export const User = mongoose.model("User", userSchema);
