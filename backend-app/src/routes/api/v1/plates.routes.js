const express = require("express");
const router = express.Router();
const { authorization } = require('../../../middlewares/authorization');

const platesController = require("../../../controllers/plates.controller");

router.get("/plates/:sellerid", platesController.getAllPlates);

router.get("/details/:plateid", platesController.getPlate);

router.post("/create",authorization, platesController.createPlate);

router.patch("/update/:plateid", authorization, platesController.updatePlate);

router.delete("/delete/:plateid", authorization, platesController.deletePlate);


module.exports = router;