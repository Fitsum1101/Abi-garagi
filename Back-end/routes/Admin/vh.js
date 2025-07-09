const router = require("express").Router();

const { authenticateToken } = require("../../middleware/authenticateToken");
const authroizeRole = require("../../middleware/authroizeRole");

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

router.post(
  "/vehicle",
  authenticateToken,
  authroizeRole("MANAGER"),
  vhController.postVehicle
);

router.get(
  "/vehicle/:id",
  authenticateToken,
  authroizeRole("MANAGER"),
  vhController.getVechleById
);

router.get(
  "/vehicles/:id",
  authenticateToken,
  authroizeRole("MANAGER"),
  vhController.getVechleByCustomerId
);

module.exports = router;
