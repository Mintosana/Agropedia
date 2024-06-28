const express = require('express');
const router = express.Router();

const productController = require('../controllers').productController;

router.post('/createProduct',productController.createProduct);
router.get('/getProductById/:id',productController.getProductById);
router.get('/getAllProducts',productController.getAllProducts);
router.get('/getProductQuantityFromSales',productController.getProductQuantityFromSales);

module.exports = router;