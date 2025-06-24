const Tip = require("../model/ctipModel");

exports.addTip = async (req, res) => {
  const { milestoneId, content } = req.body;
  try {
    const tip = await Tip.create({
      milestoneId,
      content,
      author: req.userId,
    });

    const fullTip = await tip.populate('author', 'username');

    const io = req.app.get("io");
    io.to(milestoneId).emit(`tip:new:${milestoneId}`, fullTip);
    console.log(`Emitting to tip:new:${milestoneId}`);

    res.status(201).json({ message: "Tip added successfully", fullTip });
  } catch (err) {
    res.status(500).json({ message: "Error adding tip" });
  }
};

// Get tips for a milestone
exports.getTipsByMilestone = async (req, res) => {
  try {
    const tips = await Tip.find({
      milestoneId: req.params.milestoneId,
    }).populate("author", "username");
    res.json(tips);
  } catch (err) {
    res.status(500).json({ message: "Error retrieving tips" });
  }
};

// Like a tip
exports.likeTip = async (req, res) => {
  try {
    const tip = await Tip.findByIdAndUpdate(
      req.params.id,
      { $inc: { likes: 1 } },
      { new: true }
    );
    if (!tip) return res.status(404).json({ message: "Tip not found" });
    res.json({ message: "Tip liked", tip });
  } catch (err) {
    res.status(500).json({ message: "Error liking tip" });
  }
};
