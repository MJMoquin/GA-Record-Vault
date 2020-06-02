const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const commentSchema = new Schema({
  userId: {type: String},
  content: String
}, {
  timestamps: true
});

const albumSchema = new Schema({
    userId: {type: String},
    bandName: {type: String},
    albumName: {type: String},
    releaseYear: {type: Number},
    coverImageUrl: {type: String},
    comments: {type: [commentSchema]}
  }, {
    timestamps: true
  });

  module.exports = mongoose.model('Album', albumSchema);