const express = require("express");
const router = express.Router();

const { getVideoById } = require("../controllers/params");
const { getAllVideos, uploadNewVideo, getVideoDetails, updateVideoDetails, deleteVideo } = require("../controllers/video.controller");

router.param("videoId", getVideoById);
router.get("/", getAllVideos);
router.post("/", uploadNewVideo);
router.get("/:videoId", getVideoDetails);
router.post("/:videoId", updateVideoDetails);
router.delete("/:videoId", deleteVideo);

module.exports = router;
