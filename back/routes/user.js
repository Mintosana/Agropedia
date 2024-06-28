const express = require('express');
const router = express.Router();

const userController = require("../controllers").userController;
const upload = require('../middleware').upload;

router.post("/register",userController.register);
router.get("/getAllUsers",userController.getAllUsers);
router.get("/getUserById/:id", userController.getUserById);
router.get("/getUserByProducerId/:id",userController.getUserByProducerId);
router.get("/getUserByCompanyId/:id",userController.getUserByCompanyId);
router.put("/updateUserById/:id",userController.updateUserById);
router.put("/updateUserToCompany/:id", userController.updateUserToCompany);
router.delete("/deleteUserById/:id",userController.deleteUserById);

router.post("/uploadCompanyDocument/:id", upload.single('file'), userController.sendCompanyDocuments);


module.exports = router;