const router = require("express").Router();
const { validateResultMiddle } = require("../../middleware/validationResult");

const employeeController = require("../../controllers/Admin/employee");

const {
  employeeIdValidation,
  employeeEmailValidation,
  employeePasswordValidation,
  nameValidation,
  employeePhoneNumberValidation,
  empolyRoleValidation,
} = require("../../util/validation");

router.get("/employees/", employeeController.getEmployee);

router.get(
  "/employee/:id",
  // [employeeIdValidation()],
  employeeController.getEmployeeById
);

router.post(
  "/employee/",
  [
    employeeEmailValidation("employee_email", "Email is required"),
    nameValidation("employee_first_name", "First name is required"),
    nameValidation("employee_last_name", "Last name is required"),
    employeePhoneNumberValidation(),
    empolyRoleValidation(),
    employeePasswordValidation(),
  ],
  validateResultMiddle,
  employeeController.postEmployee
);

router.put(
  "/employee/:id",
  [
    nameValidation("employee_first_name", "First name is required"),
    nameValidation("employee_last_name", "Last name is required"),
    employeePhoneNumberValidation(),
    empolyRoleValidation(),
  ],
  employeeController.updateEmployee
);

module.exports = router;
