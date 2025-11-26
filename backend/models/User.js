const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
  username: { type: String, required: true, unique: true },
  passwordHash: { type: String, required: true },
  role: { type: String, enum: ['student', 'hq_admin'], default: 'student' },
  // Optional: link a user to a specific chapter if needed
  chapterId: { type: mongoose.Schema.Types.ObjectId, ref: 'Chapter' } 
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);