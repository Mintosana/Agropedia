const express = require('express');
const router = express.Router();
const transactionController = require('../controllers/index').transactionController;

router.post("/createTransaction", transactionController.createTransaction);
router.get("/getAllTransactionsById/:id",transactionController.getAllTransactionsById);

module.exports = router;