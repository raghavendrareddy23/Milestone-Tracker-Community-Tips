const express = require('express');
const cTipRouter = express.Router();
const protect = require('../utils/authMiddleware');
const {
  addTip,
  getTipsByMilestone,
  likeTip
} = require('../controller/communityTipController');

cTipRouter.post('/addTip', protect, addTip);

cTipRouter.get('/:milestoneId', getTipsByMilestone);

cTipRouter.post('/like/:id', protect, likeTip);

module.exports = cTipRouter;
