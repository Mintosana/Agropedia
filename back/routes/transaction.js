const express = require('express');
const router = express.Router();
const transactionController = require('../controllers/index').transactionController;

router.post("/createTransaction", transactionController.createTransaction);
router.get("/getAllTransactionsById/:id",transactionController.getAllTransactionsById);
router.get("/getAllPendingTransactionsById/:id",transactionController.getAllPendingTransactionsById);
router.get("/getAllTransactions",transactionController.getAllTransactions);
router.patch("/acceptTransaction/:id",transactionController.acceptTransaction);
router.patch("/rejectTransaction/:id",transactionController.rejectTransaction);
module.exports = router;