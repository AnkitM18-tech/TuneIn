import { Song } from "../models/song.models.js";
import { Album } from "../models/album.models.js";
import { uploadToCloudinary } from "../lib/cloudinary.js";

export const createSong = async (req, res, next) => {
  try {
    if (!req.files || !req.files.audioFile || !req.files.imageFile) {
      return res.status(400).json({
        success: false,
        message: "Please upload all files",
      });
    }
    const { title, artist, albumId, duration } = req.body;
    const audioFile = req.files.audioFile;
    const imageFile = req.files.imageFile;

    const audioUrl = await uploadToCloudinary(audioFile);
    const imageUrl = await uploadToCloudinary(imageFile);

    const song = new Song({
      title,
      artist,
      audioUrl,
      imageUrl,
      albumId: albumId || null,
      duration,
    });

    await song.save();

    // if song belongs to an album, update the album's songs array
    if (albumId) {
      await Album.findByIdAndUpdate(albumId, {
        $push: {
          songs: song._id,
        },
      });
    }
    return res.status(201).json({
      success: true,
      song,
    });
  } catch (error) {
    console.log("Error in create song controller ", error);
    next(error);
  }
};

export const deleteSong = async (req, res, next) => {
  try {
    const { id } = req.params;

    const song = await Song.findById(id);
    // if song belongs to an album, update the album's songs array
    if (song.albumId) {
      await Album.findByIdAndUpdate(song.albumId, {
        $pull: {
          songs: song._id,
        },
      });
    }

    await Song.findByIdAndDelete(id);

    return res.status(200).json({
      success: true,
      message: "Song deleted successfully",
    });
  } catch (error) {
    console.log("Error in delete song controller ", error);
    next(error);
  }
};

export const createAlbum = async (req, res, next) => {
  try {
    const { title, artist, releaseYear } = req.body;
    const { imageFile } = req.files;

    const imageUrl = await uploadToCloudinary(imageFile);

    const album = new Album({
      title,
      artist,
      imageUrl,
      releaseYear,
    });
    await album.save();

    return res.status(201).json({
      success: true,
      message: "Album created successfully",
      album,
    });
  } catch (error) {
    console.log("Error in create album controller ", error);
    next(error);
  }
};

export const deleteAlbum = async (req, res, next) => {
  try {
    const { id } = req.params;
    await Song.deleteMany({ albumId: id });
    await Album.findByIdAndDelete(id);
    return res.status(200).json({
      success: true,
      message: "Album deleted successfully",
    });
  } catch (error) {
    console.log("Error in create album controller ", error);
    next(error);
  }
};

export const checkAdmin = async (req, res, next) => {
  return res.status(200).json({ admin: true });
};
