const express = require('express');
const router = express.Router();

const userController = require("../controllers").userController;

router.post("/register",userController.register);
router.get("/getAllUsers",userController.getAllUsers);
router.post("/login",userController.login);
router.put("/updateUserById/:id",userController.updateUserById);
router.delete("/deleteUserById/:id",userController.deleteUserById);


module.exports = router;