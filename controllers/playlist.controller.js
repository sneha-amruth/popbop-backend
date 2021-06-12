const { extend } = require("lodash");
const { User } = require("../models/user.model");
const { Playlist } = require("../models/playlist.model");

exports.createPlaylist = async(req, res) => {
  try {
    const { user, video } = req;
    const { name } = req.body;
    
    let NewPlaylist = new Playlist(
      { userId: user._id,
      name, 
      playlistVideos: [{_id: video._id, video: video._id}]
      })
    let savedPlaylist = await NewPlaylist.save();
    savedPlaylist = await savedPlaylist.populate('playlistVideos.video').execPopulate();
    res.json({ success: true, data: savedPlaylist });
  } catch(err) {
    res.status(500).json({ success: false, message: "unable to create playlist", errorMessage: err.message })
  }
}

exports.removePlaylist = async(req, res) => {
  try {
    const { playlist } = req;
    if(playlist) {
      await Playlist.deleteOne({ _id: playlist._id });
      res.status(200).json({success:true, message:"playlist removed"})
    }
  } catch(err){
    res.status(500).json({ success: false, message: "unable to delete playlist", errorMessage: err.message })
  }
}

exports.addVideoToPlaylist = async(req, res) => {
  try {
    const { playlist, video } = req;
     if( playlist) {
       if(playlist.playlistVideos.includes(video)){
         res.json({ success: false, errorMessage: "Video is already in playlist" });
       }
     } 
     let updatedPlaylist = { ...playlist, playlistVideos: playlist.playlistVideos.concat({_id: video._id, video: video._id})}
      updatedPlaylist = extend( playlist, updatedPlaylist)
      let savedPlaylist = await updatedPlaylist.save();
      savedPlaylist = savedPlaylist.populate('playlistVideos').execPopulate()
      res.json({ success: true, data: savedPlaylist })
  } catch(err) {
    res.status(500).json({ success: false, message: "unable to add video to playlist", errorMessage: err.message })
  }
}

exports.removeVideoFromPlaylist = async(req, res) => {
  try {
    const { playlist, video } = req;
    await playlist.playlistVideos.id(video._id).remove();
    await playlist.save();
    const userPlaylist = await Playlist.findById(playlist._id);
    await userPlaylist.populate('playlistVideos.video').execPopulate();
     res.status(200).json({success:true, data: userPlaylist, message:"video removed from playlist"});
  } catch(err) {
    res.status(500).json({ success: false, message: "unable to remove video from playlist", errorMessage: err.message })
  }
}

exports.getUserPlaylists = async (req, res) => {
  try {
     const { user } = req;
     if(user){
       const playlists = await Playlist.find({userId: user._id}).select('name playlistVideos').populate('playlistVideos.video', 'title channelName thumbnail channelImgUrl videoUrl viewCount')
       req.playlists = playlists
       res.json({ success: true, data: playlists })
     }
     else {
       res.json({ success: true, data: [] })
     }
  } catch(err){
    res.status(500).json({ success: false, message: "unable to fetch user's playlists", errorMessage: err.message })
  }
}
