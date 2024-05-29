const express = require('express');
const router = express.Router();

const userRouter = require('./user');
const landRouter = require('./land_plot');
const producerRouter = require('./producer');
const saleRouter = require('./sale_announcement');
const productRouter = require('./product');
const transactionRouter = require('./transaction');
const reviewRouter = require('./review')

router.use('/user',userRouter);
router.use('/landPlot',landRouter);
router.use('/product',productRouter);
router.use("/producer",producerRouter);
router.use('/sale',saleRouter);
router.use('/transaction',transactionRouter);
router.use('/review',reviewRouter);

module.exports = router;