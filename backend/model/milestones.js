const mongoose = require('mongoose');

const milestoneSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  title: { type: String },
  description: { type: String },
  date: { type: Date },
  category: { type: String, enum: ['pregnancy', 'preconception'] },
}, {
  timestamps: true,
});

module.exports = mongoose.model('Milestone', milestoneSchema);
