const express = require('express');
const SaleController = require('../controllers').saleController;
const upload = require('../middleware/index').upload;

const router = express.Router();

router.get("/getSaleById/:id",SaleController.getSaleById);
router.get("/getAllSales",SaleController.getAllSales);
router.post("/createSale",SaleController.createSale);
router.delete("/deleteSale/:id",SaleController.deleteSale);

module.exports = router;