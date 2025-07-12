const router = require("express").Router();

const { validateResultMiddle } = require("../../middleware/validationResult");
const { authenticateToken } = require("../../middleware/authenticateToken");
const authroizeRole = require("../../middleware/authroizeRole");

const employeeController = require("../../controllers/Admin/employee");

const {
  employeeIdValidation,
  employeeEmailValidation,
  employeePasswordValidation,
  nameValidation,
  employeePhoneNumberValidation,
  empolyRoleValidation,
} = require("../../util/validation");

router.get(
  "/employees/",
  authenticateToken,
  authroizeRole("MANAGER"),
  employeeController.getEmployee
);
router.get(
  "/employees/role/:role",
  // authenticateToken,
  // authroizeRole("MANAGER"),
  employeeController.getEmployeeByRole
);

router.get(
  "/employee/:id",
  authenticateToken,
  // [employeeIdValidation()],
  authroizeRole("MANAGER"),
  employeeController.getEmployeeById
);

router.post(
  "/employee/",
  authenticateToken,
  authroizeRole("MANAGER"),
  (req, res, next) => {
    console.log(req.body);
    next();
  },
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
  authenticateToken,
  authroizeRole("MANAGER"),
  [
    nameValidation("employee_first_name", "First name is required"),
    nameValidation("employee_last_name", "Last name is required"),
    employeePhoneNumberValidation(),
    empolyRoleValidation(),
  ],
  employeeController.updateEmployee
);

module.exports = router;
