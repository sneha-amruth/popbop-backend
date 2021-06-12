const { User } = require("../models/user.model");
const { Video } = require("../models/video.model");
const { Playlist } = require("../models/playlist.model");

exports.getUserById = async(req, res, next, id) => {
  try {
    const user = await User.findById(id);
    if(!user){
      return res.status(400).json({ success: false, message: "user does not exist"})
    }
    req.user = user;
    next()
  } catch(err){
    res.status(400).json({success: false, message: "could not retrieve user", error: err.message});
  }
}

exports.getVideoById = async(req, res, next, id) => {
  try {
    const video = await Video.findById(id);
    if(!video){
      return res.status(400).json({ success: false, message: "video does not exist"})
    }
    req.video = video;
    next()
  } catch(err){
    res.status(400).json({success: false, message: "could not retrieve video", error: err.message});
  }
}

exports.getPlaylistById = async(req, res, next, id) => {
  try {
    const playlist = await Playlist.findById(id);
    if(!playlist){
      return res.status(400).json({ success: false, message: "playlist does not exist"})
    }
    req.playlist = playlist;
    next()
  } catch(err){
    res.status(400).json({success: false, message: "could not retrieve video", error: err.message});
  }
}
