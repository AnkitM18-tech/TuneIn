import { User } from "../models/user.models.js";

export const getAllUsers = async (req, res, next) => {
  try {
    const currentUserId = req.auth.userId;
    const users = await User.find({ clerkId: { $ne: currentUserId } });
    return res.status(200).json({
      success: true,
      message: "Users fetched",
      users,
    });
  } catch (error) {
    console.log("Error in get all users method ", error);
    next(error);
  }
};
