const mongoose = require('mongoose');

const tipSchema = new mongoose.Schema({
  milestoneId: { type: mongoose.Schema.Types.ObjectId, ref: 'Milestone', required: true },
  content: { type: String, required: true },
  author: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }, 
  likes: { type: Number, default: 0 }
}, {
  timestamps: true
});

module.exports = mongoose.model('Tip', tipSchema);
