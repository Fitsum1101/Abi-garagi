const router = require("express").Router();

const loginController = require("../../controllers/Auth/login");
const { validateResultMiddle } = require("../../middleware/validationResult");
const {
  employeeEmailValidation,
  employeePasswordValidation,
} = require("../../util/validation");

router.post(
  "/login",
  [
    employeeEmailValidation("employee_email", "Email is required"),
    employeePasswordValidation(),
  ],
  validateResultMiddle,
  loginController.postLogin
);

module.exports = router;
