const router = require("express").Router();

const employeeController = require("../../controllers/Admin/employee");

const {
  employeeIdValidation,
  employeeEmailValidation,
  employeePasswordValidation,
  nameValidation,
  employeePhoneNumberValidation,
} = require("../../util/validation");

router.get("/employee/", employeeController.getEmployee);

router.get(
  "/employee/:id",
  [employeeIdValidation()],
  employeeController.getEmployeeById
);

router.post(
  "/employee/",
  [
    employeeEmailValidation("employee_email", "Email is required"),
    nameValidation("employee_first_name", "First name is required"),
    nameValidation("employee_last_name", "Last name is required"),
    employeePhoneNumberValidation(),
    employeePasswordValidation(),
  ],
  employeeController.postEmployee
);

router.put(
  "/employee/:id",
  [employeeIdValidation()],
  employeeController.updateEmployee
);

module.exports = router;
