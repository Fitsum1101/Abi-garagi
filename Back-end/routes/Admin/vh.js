const router = require("express").Router();

const { authenticateToken } = require("../../middleware/authenticateToken");

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

router.post("/vehicle", authenticateToken, vhController.postVehicle);

router.get("/vehicle/:id", authenticateToken, vhController.getVechleById);

router.get(
  "/vehicles/:id",
  authenticateToken,
  vhController.getVechleByCustomerId
);

module.exports = router;
