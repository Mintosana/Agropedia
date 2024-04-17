const express = require('express');
const router = express.Router();

const landController = require("../controllers").landController;

router.post("/createLand", landController.createPlot);
router.get("/getAllLand",landController.getAllLand);
router.get("/getPlotsByUserId/:id", landController.getPlotsByUserId);
router.put("/updatePlotById/:id",landController.updatePlotById);
router.delete("/deletePlotById/:id",landController.deletePlotById);

module.exports = router;