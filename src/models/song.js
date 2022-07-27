const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2')
const { Schema } = mongoose;

const SongSchema = new Schema({
  artist: { type: String},
  dateSong: { type: Date},
  name: { type: String},
  genere: { type: String},
  visit: { type: Number}
});

SongSchema.plugin(mongoosePaginate)

module.exports = mongoose.model('Song', SongSchema);
