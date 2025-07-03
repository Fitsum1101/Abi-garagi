const router = require("express").Router();

const vhController = require("../../controllers/Admin/vh");
const {
  vehicleColorValidation,
  vehicleMilageValidation,
  vehicleTypeValidation,
  vehicleModelValidation,
  vehicleSerialValidation,
  vehicleTagValidation,
  vehcileMakeValidation,
  vehicleYearValidation,
} = require("../../util/validation");

router.post("/vehicle", vhController.postVehicle);

router.get("/vehicle/:id", vhController.getVechleById);

router.get("/vehicles/:id", vhController.getVechleByCustomerId);

module.exports = router;
