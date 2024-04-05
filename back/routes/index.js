const express = require('express');
const router = express.Router();

const userRouter = require('./user');
const landRouter = require('./land_plot');

router.use('/user',userRouter);
router.use('/landPlot',landRouter);

module.exports = router;