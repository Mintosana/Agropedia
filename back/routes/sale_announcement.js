const express = require('express');
const router = express.Router();
const SaleController = require('../controllers').saleController;

router.get("/getSaleById/:id",SaleController.getSaleById);
router.get("/getAllSales",SaleController.getAllSales);
router.post("/createSale",SaleController.createSale);
router.delete("/deleteSale/:id",SaleController.deleteSale);

module.exports = router;