const mongoose = require('mongoose');
const ObjectId = require('mongodb').ObjectID;

const WasteSchema = new mongoose.Schema({
  title: String,
  description: String,
  imageUrl: String,
  category: String,
  datePosted: Date,
  noFavorites: Number,
  collected: Boolean,
  // location : {
  //   "type": String,
  //   "coordinates": [Number]
  // },
  postedBy: mongoose.Schema.ObjectId,
  postedByText: String,
  collected: Boolean,
});

const Waste = mongoose.model.Waste || mongoose.model('Waste', WasteSchema);
module.exports = Waste;
