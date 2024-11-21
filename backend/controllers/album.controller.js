import { Album } from "../models/album.models.js";

export const getAllAlbums = async (req, res, next) => {
  try {
    const albums = await Album.findById({});
    return res.status(200).json({
      success: true,
      message: "Albums fetched successfully",
      albums,
    });
  } catch (error) {
    console.log("Error in get all albums method " + error);
    next(error);
  }
};

export const getAlbumById = async (req, res, next) => {
  try {
    const { albumId } = req.params;
    const album = await Album.findById(albumId).populate("songs");

    if (!album) {
      return res
        .status(404)
        .json({ success: false, message: "Album Not Found" });
    }

    return res.status(200).json({
      success: true,
      message: "Albums fetched successfully",
      album,
    });
  } catch (error) {
    console.log("Error in getAlbumById method " + error);
    next(error);
  }
};
