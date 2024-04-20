const express = require("express");
const router = express.Router();

const producerController = require("../controllers").producerController;

router.get("/getProducerByUserId/:userId",producerController.getProducerByUserId);

module.exports = router