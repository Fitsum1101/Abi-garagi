const router = require("express").Router();

const { authenticateToken } = require("../../middleware/authenticateToken");

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
  [serviceIdValidation()],
  serviceController.getServicesById
);

router.delete(
  "/service/:id",
  authenticateToken,
  [serviceIdValidation()],
  serviceController.deleteService
);

router.put(
  "/service/:id",
  authenticateToken,
  [],
  serviceController.updateService
);

module.exports = router;
