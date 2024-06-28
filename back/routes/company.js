const express = require('express');
const router = express.Router();

const companyController = require("../controllers").companyController;
const contractController = require("../controllers").contractController;
const pdfController = require('../middleware/contract_creation');

router.get("/getAllCompanies", companyController.getAllCompanies);
router.get("/getUnvalidatedCompanies", companyController.getUnvalidatedCompanies);
router.get('/getCompanyByUserId/:id',companyController.getCompanyByUserId);
router.delete("/deleteCompanyById/:id", companyController.deleteCompanyById);
router.put("/updateCompanyById/:id", companyController.updateCompanyById);
router.put('/validateCompanyRequestById/:id',companyController.validateCompanyRequestById);

router.post('/generate-contract', pdfController.generateContract, contractController.uploadContract);
router.get('/downloadContract/:contractId', contractController.downloadContract);

module.exports = router;
