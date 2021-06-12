const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: "Please enter first name",
    trim: true
  }, 
  lastName: {
    type: String,
    required: "Please enter last name",
    trim: true
  },
  email: {
    type: String,
    required: "Please enter email id",
    trim: true,
    unique: true,
    validate: {
            validator: function(v) {
                return /[a-z][0-9]*@gmail.com/.test(v)
            },
            message: props => `${props.value} is not a valid email`
        }
  },
  password: {
    type: String,
    require: "Please enter password",
    trim: true,
    validate: {
        validator: function(v) {
            return v.length>7 && /\d+/.test(v)
        },
        message: props => `password must be 7 characters long and must contain a number`
    }
    },
    likedVideos: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "Video",
   }],

  historyVideos: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "Video",
  }],
  watchLater: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "Video",
  }]

}, {timestamps: true});

const User = mongoose.model("User", UserSchema);

module.exports = { User }