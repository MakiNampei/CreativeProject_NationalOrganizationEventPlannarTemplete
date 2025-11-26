const mongoose = require('mongoose');

const eventSchema = mongoose.Schema({
  chapterId: { type: mongoose.Schema.Types.ObjectId, ref: 'Chapter', required: true },
  title: { type: String, required: true },
  description: { type: String },
  dateTime: { type: Date, required: true },
  location: { type: String },
  isOpenForCollab: { type: Boolean, default: false }
});

module.exports = mongoose.model('Event', eventSchema);