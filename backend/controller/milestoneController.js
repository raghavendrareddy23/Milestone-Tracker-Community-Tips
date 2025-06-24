const Milestone = require('../model/milestones');

exports.createMilestone = async (req, res) => {
  try {
    const milestone = await Milestone.create({ ...req.body, userId: req.userId });
    res.status(201).json({ message: 'Milestone created successfully', milestone });
  } catch (err) {
    res.status(500).json({ message: 'Error creating milestone' });
  }
};

exports.getMilestones = async (req, res) => {
  try {
    const milestones = await Milestone.find().sort({ date: 1 });
    res.json(milestones);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching milestones' });
  }
};

exports.getMilestoneById = async (req, res) => {
  try {
    const milestoneById = await Milestone.findById(req.params.id);
    if (!milestoneById) {
      return res
        .status(404)
        .json({ success: false, message: "Milestone not found" });
    }
    res.status(200).json(milestoneById);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ success: false, message: "Error fetching milestone" });
  }
};

exports.updateMilestone = async (req, res) => {
  try {
    const milestone = await Milestone.findOneAndUpdate(
      { _id: req.params.id, userId: req.userId },
      req.body,
      { new: true }
    );
    if (!milestone) return res.status(404).json({ message: 'Milestone not found' });
    res.json({ message: 'Milestone updated', milestone });
  } catch (err) {
    res.status(500).json({ message: 'Error updating milestone' });
  }
};

exports.deleteMilestone = async (req, res) => {
  try {
    const result = await Milestone.findOneAndDelete({ _id: req.params.id, userId: req.userId });
    if (!result) return res.status(404).json({ message: 'Milestone not found' });
    res.json({ message: 'Milestone deleted' });
  } catch (err) {
    res.status(500).json({ message: 'Error deleting milestone' });
  }
};
