const db = require("./db");

const { body, param } = require("express-validator");
const bcrypt = require("bcrypt");

const allowedRoles = ["admin", "employee", "manager"];

exports.nameValidation = (name, message) =>
  body(name).notEmpty().withMessage(message);

exports.customerEmailValidation = (name, message) =>
  body(name)
    .trim()
    .notEmpty()
    .withMessage(message)
    .normalizeEmail()
    .custom(async (value) => {
      const existingCustomer = await db.customerIdentifier.findFirst({
        where: {
          customerEmail: value,
        },
      });
      if (existingCustomer) {
        throw new Error("Email already exists");
      }
      return true;
    });

exports.customerPhoneNumberValidation = () =>
  body("customer_phone_number")
    .trim()
    .custom((value) => {
      if (/[a-zA-Z]/.test(value) === true) {
        throw new Error("Please enter valid phone number (e.g., 0927263385).");
      }
      return true;
    })
    .custom((value) => {
      if (value.trim().length !== 10) {
        throw new Error(
          "Phone number must be exactly 10 digits (e.g., 0927263385)"
        );
      }
      return true;
    })
    .custom((value) => {
      if (value.slice(0, 2) !== "09") {
        throw new Error("phone number needs to start with 09");
      }
      return true;
    })
    .custom(async (value, { req }) => {
      let whereCondition = {
        customerPhoneNumber: value,
      };
      if (req.params.id) {
        whereCondition.customerId = req.params.id;
      }
      const customer = await db.customerIdentifier.findFirst({
        where: whereCondition,
      });
      if (customer) {
        throw new Error("Phone number already exists");
      }
      return true;
    });

// exports.customerIdValidation = () =>
//   param("id").custom(async (value) => {
//     const customer = await db.customerIdentifier.findUnique({
//       where: {
//         customerHash: value,
//       },
//     });
//     if (!customer) {
//       throw new Error("Customer not found");
//     }
//     return true;
//   });

exports.employeeEmailValidation = (name, message) =>
  body(name)
    .trim()
    .notEmpty()
    .withMessage(message)
    .custom(async (value, { req }) => {
      const isLoginUrl = req.originalUrl === "/login";
      const existingEmployee = await db.employee.findFirst({
        where: { employeeEmail: value },
      });

      console.log(existingEmployee);

      if (isLoginUrl && !existingEmployee) throw new Error("Email not exists");

      if (!isLoginUrl && existingEmployee) {
        throw new Error("Email already exists");
      }
      return true;
    });

exports.employeePasswordValidation = () =>
  body("employee_password")
    .trim()
    .custom(async (value, req) => {
      const isLoginUrl = req.originalUrl === "/admin/login";
      if (value.length < 6) {
        throw new Error("Password must be at least 6 characters long");
      }
      console.log(req.body);
      if (isLoginUrl) {
        const employee = await db.employee.findFirst({
          where: {
            employeeEmail: req.body.employeeEmail,
          },
          include: {
            employeePass: {
              select: {
                employeePasswordHashed: true,
              },
            },
          },
        });
        const isCorrectPassword = bcrypt.compare(
          value,
          employee.employeePass.employeePasswordHashed
        );
        if (!isCorrectPassword) {
          throw new Error("password does't match please try again!");
        }
      }
      return true;
    });

exports.empolyRoleValidation = () =>
  body("employee_role")
    .notEmpty()
    .withMessage("Role is required")
    .isIn(allowedRoles)
    .withMessage(`Role must be one of: ${allowedRoles.join(", ")}`);
exports.employeeIdValidation = () =>
  param("id")
    .exists()
    .withMessage("URL ID is required")
    .isInt()
    .withMessage("URL ID must be an integer")
    .custom(async (value) => {
      const employee = await db.employee.findUnique({
        where: { employeeId: value },
      });
      if (!employee) {
        throw new Error("Employee not found");
      }
      return true;
    });

exports.employeePhoneNumberValidation = () =>
  body("employee_phone")
    .trim()
    .custom((value) => {
      if (/[a-zA-Z]/.test(value) === true) {
        throw new Error("Please enter valid phone number (e.g., 0927263385).");
      }
      return true;
    })
    .custom((value) => {
      if (value.trim().length !== 10) {
        throw new Error(
          "Phone number must be exactly 10 digits (e.g., 0927263385)"
        );
      }
      return true;
    })
    .custom((value) => {
      if (value.slice(0, 2) !== "09") {
        throw new Error("phone number needs to start with 09");
      }
      return true;
    })
    .custom(async (value, { req }) => {
      let whereCondition = {
        employeePhone: value.trim(),
      };
      if (req.params.id) {
        whereCondition.employeeId = req.params.id;
      }
      const employee = await db.employeeInfo.findFirst({
        where: whereCondition,
      });
      console.log(employee);
      if (employee) {
        throw new Error("Phone number already exists");
      }
      return true;
    });

exports.postServiceValidation = () =>
  body("service_name")
    .trim()
    .isLength({ min: 2 })
    .withMessage("Service name must be at least 2 characters long");

exports.serviceIdValidation = () =>
  param("id")
    .isInt()
    .withMessage("ID must be an integer")
    .custom(async (value) => {
      const service = await db.commonServices.findUnique({
        where: { serviceId: value },
      });
      if (!service) {
        throw new Error("Service not found");
      }
    });

exports.vehicleYearValidation = () =>
  body("vehicle_year")
    .isInt({ min: 1886, max: new Date().getFullYear() + 1 })
    .withMessage("Vehicle year must be a valid year");
exports.vehcileMakeValidation = () =>
  body("vehicle_make")
    .isString()
    .withMessage("Vehicle make must be a string")
    .notEmpty()
    .withMessage("Vehicle make is required");
exports.vehicleModelValidation = () =>
  body("vehicle_model")
    .isString()
    .withMessage("Vehicle model must be a string")
    .notEmpty()
    .withMessage("Vehicle model is required");

exports.vehicleTypeValidation = () =>
  body("vehicle_type")
    .isString()
    .withMessage("Vehicle type must be a string")
    .notEmpty()
    .withMessage("Vehicle type is required");
exports.vehicleMilageValidation = () =>
  body("vehicle_mileage")
    .isInt({ min: 0 })
    .withMessage("Vehicle mileage must be a non-negative integer");
exports.vehicleColorValidation = () =>
  body("vehicle_color")
    .isString()
    .withMessage("Vehicle color must be a string")
    .notEmpty()
    .withMessage("Vehicle color is required");

exports.vehicleSerialValidation = () =>
  body("vehicle_serial")
    .isString()
    .withMessage("Vehicle serial must be a string")
    .notEmpty()
    .withMessage("Vehicle serial is required");

exports.vehicleTagValidation = () =>
  body("vehicle_tag")
    .isString()
    .withMessage("Vehicle tag must be a string")
    .notEmpty()
    .withMessage("Vehicle tag is required");
