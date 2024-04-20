const express = require('express');
const router = express.Router();

const userRouter = require('./user');
const landRouter = require('./land_plot');
const producerRouter = require('./producer');

router.use('/user',userRouter);
router.use('/landPlot',landRouter);
router.use("/producer",producerRouter);

module.exports = router;