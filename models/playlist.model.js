const mongoose = require("mongoose");

const PlaylistVideosSchema = new mongoose.Schema({
  video: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Video",
    required: "Video details required"
  }
})
const PlaylistSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  },
  name: {
    type: String,
    required: "Please provide name of the playlist"
  },
  playlistVideos: [PlaylistVideosSchema]
}, {timestamps: true})

const Playlist = mongoose.model("Playlist", PlaylistSchema);

module.exports = {Playlist}