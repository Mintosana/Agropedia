const express = require('express');

const router = express.Router();

const UserController = require("../controllers").UserController;

router.post("/register",UserController.register);
router.get("/getAllUsers",UserController.getAllUsers);
router.post("/login",UserController.login);
router.put("/updateUserById/:id",UserController.updateUserById);
router.delete("/deleteUserById/:id",UserController.deleteUserById);


module.exports = router;