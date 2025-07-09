const router = require("express").Router();

const { authenticateToken } = require("../../middleware/authenticateToken");
const authroizeRole = require("../../middleware/authroizeRole");

const serviceController = require("../../controllers/Admin/services");
const {
  postServiceValidation,
  serviceIdValidation,
} = require("../../util/validation");

router.post(
  "/service",
  [postServiceValidation()],
  serviceController.postService
);

router.get("/services", serviceController.getServices);

router.get(
  "/service/:id",
  authenticateToken,
  authroizeRole("MANAGER"),
  [serviceIdValidation()],
  serviceController.getServicesById
);

router.delete(
  "/service/:id",
  authenticateToken,
  authroizeRole("MANAGER"),
  [serviceIdValidation()],
  serviceController.deleteService
);

router.put(
  "/service/:id",
  authenticateToken,
  authroizeRole("MANAGER"),
  [],
  serviceController.updateService
);

module.exports = router;
