const express = require("express");
const router = express.Router();

const { authVerify } = require("../middlewares/authVerify")
const { getVideoById, getPlaylistById } = require("../controllers/params")
const { createPlaylist, removePlaylist, addVideoToPlaylist, removeVideoFromPlaylist, getUserPlaylists } = require("../controllers/playlist.controller");

router.param("userId",authVerify);
router.param("playlistId", getPlaylistById);
router.param("videoId", getVideoById);

router.post("/:videoId", authVerify, getVideoById, createPlaylist);
router.delete("/:playlistId", authVerify, getPlaylistById, removePlaylist)

router.post("/:playlistId/:videoId", authVerify, getPlaylistById, getVideoById, addVideoToPlaylist);
router.delete("/:playlistId/:videoId", authVerify, getPlaylistById, getVideoById, removeVideoFromPlaylist);

router.get("/", authVerify, getUserPlaylists);

module.exports = router;