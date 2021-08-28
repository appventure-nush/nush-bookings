const mongoose = require('mongoose');
const ObjectID = mongoose.ObjectId;

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    unique: true,
    required: true,
  },
  password: String,
  profilePic: String,
  bio: String,
  phoneNumber: String,
  wastesPosted: [ObjectID],
  favorites: [ObjectID],
  darkMode: Boolean,
  dateJoined: Date,
  // location : {
  //   "type": String,
  //   "coordinates": [Number]
  // },
});

const User = mongoose.models.User || mongoose.model('User', UserSchema);
module.exports = User;
