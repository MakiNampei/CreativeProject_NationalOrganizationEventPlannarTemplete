const mongoose = require('mongoose');

const chapterSchema = mongoose.Schema({
  organizationId: { type: mongoose.Schema.Types.ObjectId, ref: 'Organization', required: true },
  schoolName: { type: String, required: true },
  city: { type: String, required: true },
  state: { type: String, required: true },
  lat: { type: Number, required: true },
  lng: { type: Number, required: true },
  history: { type: String }
});

module.exports = mongoose.model('Chapter', chapterSchema);