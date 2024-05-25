const express = require('express');
const router = express.Router();

const userController = require("../controllers").userController;

router.post("/register",userController.register);
router.get("/getAllUsers",userController.getAllUsers);
router.get("/getUserById/:id", userController.getUserById);
router.get("/getUserByProducerId/:id",userController.getUserByProducerId);
router.put("/updateUserById/:id",userController.updateUserById);
router.delete("/deleteUserById/:id",userController.deleteUserById);


module.exports = router;