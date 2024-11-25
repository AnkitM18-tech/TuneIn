import { Message } from "../models/message.models.js";
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

export const getMessages = async (req, res, next) => {
  try {
    const myId = req.auth.userId;
    const { userId } = req.params;

    const messages = await Message.find({
      $or: [
        { senderId: myId, receiverId: userId },
        { senderId: userId, receiverId: myId },
      ],
    }).sort({ createdAt: 1 });

    res.status(200).json({
      success: true,
      messages: "Messages Retrieved",
      messages,
    });
  } catch (error) {
    console.log("Error in get messages method ", error);
    next(error);
  }
};
