import { Song } from "../models/song.models.js";

export const getAllSongs = async (req, res, next) => {
  try {
    // -1 ~ Descending => newest -> oldest & 1 ~ Ascending => oldest -> newest
    const songs = await Song.find({}).sort({ createdAt: -1 });
    return res.status(200).json({
      success: true,
      message: "Songs fetched successfully",
      songs,
    });
  } catch (error) {
    console.log("Error in get all songs method ", error);
    next(error);
  }
};

export const getFeaturedSongs = async (req, res, next) => {
  try {
    // 6 random songs from mongodb for now
    const songs = await Song.aggregate([
      {
        $sample: {
          size: 6,
        },
      },
      {
        $project: {
          _id: 1,
          title: 1,
          artist: 1,
          imageUrl: 1,
          audioUrl: 1,
        },
      },
    ]);

    return res.status(200).json({
      success: true,
      songs,
    });
  } catch (error) {
    console.log("Error in get featured songs method ", error);
    next(error);
  }
};

export const getMadeForYouSongs = async (req, res, next) => {
  try {
    // 4 random songs from mongodb for now
    const songs = await Song.aggregate([
      {
        $sample: {
          size: 4,
        },
      },
      {
        $project: {
          _id: 1,
          title: 1,
          artist: 1,
          imageUrl: 1,
          audioUrl: 1,
        },
      },
    ]);

    return res.status(200).json({
      success: true,
      songs,
    });
  } catch (error) {
    console.log("Error in get made for you songs method ", error);
    next(error);
  }
};

export const getTrendingSongs = async (req, res, next) => {
  try {
    // 4 random songs from mongodb for now
    const songs = await Song.aggregate([
      {
        $sample: {
          size: 4,
        },
      },
      {
        $project: {
          _id: 1,
          title: 1,
          artist: 1,
          imageUrl: 1,
          audioUrl: 1,
        },
      },
    ]);

    return res.status(200).json({
      success: true,
      songs,
    });
  } catch (error) {
    console.log("Error in get trending songs method ", error);
    next(error);
  }
};
