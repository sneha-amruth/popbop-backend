const { extend } = require("lodash");
const { Video } = require("../models/video.model");

exports.getAllVideos = async (req, res) => {
    try {
      const videos = await Video.find({});
      res.json({ success: true, data: videos })
    } catch (err) {
      res.status(500).json({ success: false, message: "unable to fetch videos", errorMessage: err.message })
    }
  }

  exports.uploadNewVideo = async (req, res) => {
    try {
      const video = req.body;
      const NewVideo = new Video(video);
      const savedVideo = await NewVideo.save();
      res.json({ success: true, data: savedVideo })
    } catch (err) {
      res.status(500).json({ success: false, message: "unable to add video", errorMessage: err.message })
    }
  }

  exports.getVideoDetails = (req, res) => {
    let { video } = req;
    video.__v = undefined;
    res.json({ success: true, data: video })
  }

  exports.updateVideoDetails = async (req, res) => {
    const videoUpdates = req.body;
    let {video} = req;

    video = extend(video, videoUpdates);
    video = await video.save();
    res.json({ success: true, data: video});
  }

  exports.deleteVideo =  async (req, res) => { 
    let {video} = req;
    await video.remove();
    res.json({ success: true, data: video }) 
  }

  