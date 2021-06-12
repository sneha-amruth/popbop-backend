const express = require("express");
const router = express.Router();

const { authVerify } = require("../middlewares/authVerify")
const { getVideoById, getPlaylistById } = require("../controllers/params")
const { getUsersDefaultPlaylists, getUsersLikedVideos, addVideoToLiked, addVideoToWatchHistory,addVideoToWatchLater, removeVideoFromLiked,removeVideoFromWatchHistory,removeVideoFromWatchLater } = require("../controllers/defaultPlaylists.controller")

router.param("userId",authVerify);
router.param("videoId", getVideoById);
router.param("playlistId", getPlaylistById);

router.get("/default", authVerify, getUsersDefaultPlaylists);
router.get("/liked", authVerify, getUsersLikedVideos);
router.post("/liked/:videoId",authVerify, getVideoById, addVideoToLiked);
router.post("/history/:videoId",authVerify, getVideoById, addVideoToWatchHistory);
router.post("/watch-later/:videoId",authVerify, getVideoById, addVideoToWatchLater);


router.delete("/liked/:videoId", authVerify, getVideoById, removeVideoFromLiked);
router.delete("/history/:videoId", authVerify, getVideoById, removeVideoFromWatchHistory);
router.delete("/watch-later/:videoId", authVerify, getVideoById, removeVideoFromWatchLater);

module.exports = router;

