const express = require('express');
const milestoneRouter = express.Router();
const auth = require('../utils/authMiddleware');
const {
  createMilestone,
  getMilestones,
  getMilestoneById,
  updateMilestone,
  deleteMilestone
} = require('../controller/milestoneController');

milestoneRouter.post('/add',auth, createMilestone);
milestoneRouter.get('/', getMilestones);
milestoneRouter.get('/:id',auth, getMilestoneById);
milestoneRouter.put('/:id', auth, updateMilestone);
milestoneRouter.delete('/:id', auth, deleteMilestone);

module.exports = milestoneRouter;
