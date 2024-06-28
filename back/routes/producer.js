const express = require("express");
const router = express.Router();

const producerController = require("../controllers").producerController;

router.get("/getProducerByUserId/:userId",producerController.getProducerByUserId);
router.get('/getAllProducers',producerController.getAllProducers);

module.exports = router