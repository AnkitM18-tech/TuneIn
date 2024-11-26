import { v2 as cloudinary } from "cloudinary";
import dotenv from "dotenv";
import * as fs from "node:fs/promises";

dotenv.config();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export const uploadToCloudinary = async (file) => {
  try {
    const result = await cloudinary.uploader.upload(file.tempFilePath, {
      resource_type: "auto",
    });
    await fs.unlink(file.tempFilePath);
    return result.secure_url;
  } catch (error) {
    await fs.unlink(file.tempFilePath);
    console.log("Error in uploadToCloudinary method " + error);
    throw new Error("Error uploading to cloudinary " + error);
  }
};

export const deleteFromCloudinary = async (
  publicId,
  resource_type = "image"
) => {
  try {
    const response = await cloudinary.uploader.destroy(publicId, {
      resource_type: resource_type,
    });
    return response;
  } catch (error) {
    console.log("Error in deleteFromCloudinary method " + error);
    throw new Error("Error deleting from cloudinary " + error);
  }
};

export default cloudinary;
