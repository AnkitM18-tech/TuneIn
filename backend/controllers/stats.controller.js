import { Song } from "../models/song.models.js";
import { User } from "../models/user.models.js";
import { Album } from "../models/album.models.js";

export const getStats = async (req, res, next) => {
  try {
    const [totalSongs, totalUsers, totalAlbums, uniqueArtists] =
      await Promise.all([
        Song.countDocuments(),
        User.countDocuments(),
        Album.countDocuments(),
        Song.aggregate([
          {
            $unionWith: {
              coll: "albums",
              pipeline: [],
            },
          },
          {
            $group: {
              _id: "$artist",
            },
          },
          {
            $count: "count",
          },
        ]),
      ]);

    return res.status(200).json({
      success: true,
      message: "Statistics fetched",
      totalSongs,
      totalUsers,
      totalAlbums,
      totalArtists: uniqueArtists[0]?.count || 0,
    });
  } catch (error) {
    console.log("Error in stats controller ", error);
    next(error);
  }
};
