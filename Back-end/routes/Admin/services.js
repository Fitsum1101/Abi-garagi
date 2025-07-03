const router = require("express").Router();

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
  [serviceIdValidation()],
  serviceController.getServicesById
);

router.delete(
  "/service/:id",
  [serviceIdValidation()],
  serviceController.deleteService
);

router.put("/service/:id", [], serviceController.updateService);

module.exports = router;
