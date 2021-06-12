const { extend } = require("lodash");
const { User } = require("../models/user.model");
const { Playlist } = require("../models/playlist.model");

exports.getUsersDefaultPlaylists = async(req, res) => {
  try {
      const { user } = req;
      const userDefaultPlaylists = await User.findById(user._id).select('likedVideos watchLater historyVideos').populate('likedVideos watchLater historyVideos', 'title channelName thumbnail channelImgUrl videoUrl viewCount');
      res.json({success: true, data: userDefaultPlaylists});
    } catch(err) {
      res.status(500).json({ success: false, message: "unable to fetch users default playlists", errorMessage: err.message })
    }
}

exports.getUsersLikedVideos = async(req, res) => {
  try {
    const { user } = req;
    const userLikedVideos = await User.findById(user._id).select('likedVideos').populate('likedVideos', 'title channelName thumbnail channelImgUrl videoUrl viewCount');
     res.json({success: true, data: userLikedVideos});
  } catch(err) {
    res.status(500).json({ success: false, message: "unable to fetch users liked videos", errorMessage: err.message })
  }
}

exports.addVideoToLiked = async(req, res) => {
  try {
     const { user, video } = req;
     if(user && video) {
       if(user.likedVideos.includes(video._id)){
         return res.json({ success: false, errorMessage: "Video is already liked" });
       }
     } 
      let updatedLikedVideos = { ...user, likedVideos: user.likedVideos.concat({_id:  video._id})};
      updatedLikedVideos = extend( user, updatedLikedVideos);
      const saveLikedVideos = await updatedLikedVideos.save();
      res.json({ success: true, data: video });
     
  } catch(err) {
     console.error(err);
      res.status(500).json({ success: false, message: "unable to add video to liked videos", errorMessage: err.message })
  }
}

exports.removeVideoFromLiked = async(req, res) => {
  try {
    const { user, video } = req;
    if(user && video) {
      if(!user.likedVideos.includes(video._id)) {
        res.json({ success: false, errorMessage: "Video is not in liked videos" });
      }
    }
      let index = user.likedVideos.indexOf(video._id);
      if(index > -1){
        user.likedVideos.splice(index, 1);
      }
      await user.save();
      res.status(200).json({success:true, message:"video removed from liked videos", data: video})
  } catch(err){
    res.status(500).json({ success: false, message: "unable to remove video from liked videos", errorMessage: err.message })
  }
}

exports.addVideoToWatchHistory = async(req, res) => {
  try {
     const { user, video } = req;
     if(user && video) {
       if(user.historyVideos.includes(video._id)){
         res.json({ success: false, errorMessage: "Video is already in watch history" });
       }
     } 
      let updatedHistoryVideos = { ...user, historyVideos: user.historyVideos.concat({_id:  video._id})};
      updatedHistoryVideos = extend( user, updatedHistoryVideos);
      const saveHistoryVideos = await updatedHistoryVideos.save();
      res.json({ success: true, data: video });
     
  } catch(err) {
     res.status(500).json({ success: false, message: "unable to add video to watch history", errorMessage: err.message })
  }
}

exports.removeVideoFromWatchHistory = async(req, res) => {
  try {
    const { user, video } = req;
    if(user && video) {
      if(!user.historyVideos.includes(video._id)) {
        res.json({ success: false, errorMessage: "Video is not in watch history" });
      }
    }
      let index = user.historyVideos.indexOf(video._id);
      if(index > -1){
        user.historyVideos.splice(index, 1);
      }
      await user.save();
      res.status(200).json({success:true, data: video, message:"video removed from watch history"})
  } catch(err){
    res.status(500).json({ success: false, message: "unable to remove video from watch history", errorMessage: err.message })
  }
}

exports.addVideoToWatchLater = async(req, res) => {
  try {
     const { user, video } = req;
     if(user && video) {
       if(user.watchLater.includes(video._id)){
         res.json({ success: false, errorMessage: "Video is already in watch later" });
       }
     } 
      let updatedWatchLater = { ...user, watchLater: user.watchLater.concat({_id:  video._id})};
      updatedWatchLater = extend( user, updatedWatchLater);
      const saveWatchLater = await updatedWatchLater.save();
      res.json({ success: true, data: video });
     
  } catch(err) {
     res.status(500).json({ success: false, message: "unable to add video to watch later", errorMessage: err.message })
  }
}

exports.removeVideoFromWatchLater = async(req, res) => {
  try {
    const { user, video } = req;
    if(user && video) {
      if(!user.watchLater.includes(video._id)) {
        res.json({ success: false, errorMessage: "Video is not in watch later" });
      }
    }
      let index = user.watchLater.indexOf(video._id);
      if(index > -1){
        user.watchLater.splice(index, 1);
      }
      await user.save();
      res.status(200).json({success:true, data: video, message:"video removed from watch later"})
  } catch(err){
    res.status(500).json({ success: false, message: "unable to remove video from watch later", errorMessage: err.message })
  }
}