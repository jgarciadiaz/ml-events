const mongoose = require('mongoose');

const EventSchema = new mongoose.Schema({
  uuid: String,
  title: String,
  description: String,
  url: String,
  image: String,
  score: Number
});

const GrpnEvent = mongoose.model('event', EventSchema);

module.exports = GrpnEvent;
