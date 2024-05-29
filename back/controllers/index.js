const userController = require('./user');
const landController = require('./land_plot');
const producerController = require("./producer");
const saleController = require("./sale_announcement");
const productController = require("./product");
const transactionController = require("./transaction");
const reviewController = require("./review");

module.exports = {
    userController,
    landController,
    producerController,
    saleController,
    productController,
    transactionController,
    reviewController,
}