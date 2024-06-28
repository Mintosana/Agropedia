const express = require('express');
const router = express.Router();


const contractController = require("../controllers").contractController;

router.get('/getAllContractsByCompanyId/:id',contractController.getAllContractsByCompanyId);
router.get('/getAllContractsByProducerId/:id',contractController.getAllContractsByProducerId);
router.get('/getAllContractsByProductId/:id',contractController.getAllContractsByProductId);
router.get('/getAllContractsByUserId/:id',contractController.getAllContractsByUserId);
router.put('/acceptContractById/:id',contractController.acceptContractById);
router.put('/refuseContractById/:id',contractController.refuseContractById);

module.exports = router;