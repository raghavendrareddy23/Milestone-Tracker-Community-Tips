const express = require("express");
const router = express.Router();
const authRouter = require("./authRoutes");
const milestoneRouter = require("./milestoneRoutes")
const cTipRouter = require('./cTipRoutes')

router.use("/auth", authRouter);
router.use("/milestones", milestoneRouter)
router.use("/community-tips", cTipRouter)

module.exports = router;