const mongoose = require('mongoose');

const orgSchema = mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String }
});

module.exports = mongoose.model('Organization', orgSchema);