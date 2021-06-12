const mongoose = require("mongoose");

const VideoSchema = new mongoose.Schema({
  title: {
    type: String,
    required: "Please enter video title",
    trim: true
  },
  channelName: {
    type: String,
    required: "Please enter channel name",
    trim: true
  },
  thumbnail: {
    type: String,
    trim: true,
    required: "Thumnail URL is required"
  },
  channelImgUrl: {
    type: String,
    trim: true,
    required: "Channel Image URL is required"
  },
  videoUrl: {
    type: String,
    trim: true,
    required: "Video URL is required"
  },
  viewCount: {
    type: Number,
  }
}, { timestamps: true });

const Video = mongoose.model("Video", VideoSchema);

module.exports = {Video}
