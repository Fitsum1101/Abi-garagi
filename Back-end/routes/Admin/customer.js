const router = require("express").Router();

const { validateResultMiddle } = require("../../middleware/validationResult");
const { authenticateToken } = require("../../middleware/authenticateToken");
const authroizeRole = require("../../middleware/authroizeRole");

const customerController = require("../../controllers/Admin/customer");

const {
  nameValidation,
  customerEmailValidation,
  customerPhoneNumberValidation,
} = require("../../util/validation");

router.get(
  "/customer",
  authenticateToken,
  authroizeRole("EMPLOYEE"),
  customerController.getCustomer
);

router.get(
  "/customer/search",
  authenticateToken,
  customerController.searchCustomer
);

router.get(
  "/customer/:id",
  authenticateToken,
  authroizeRole("MANAGER"),
  customerController.getCustomerById
);

router.put(
  "/customer/:id",
  authenticateToken,
  authroizeRole("MANAGER"),
  [
    // customerIdValidation(),
    nameValidation("customer_firstName", "Customer first name is required"),
    nameValidation("customer_lastName", "Customer last name is required"),
    customerPhoneNumberValidation(),
  ],
  customerController.updateCustomer
);

router.post(
  "/customer",
  authenticateToken,
  authroizeRole("MANAGER"),
  [
    customerEmailValidation(
      "customer_email",
      "Please enter a valid email address (e.g., example@domain.com)."
    ),
    nameValidation(
      "customer_first_name",
      "First name is required and should only contain letters."
    ),
    nameValidation(
      "customer_last_name",
      "last name is required and should only contain letters."
    ),
    customerPhoneNumberValidation(),
  ],

  validateResultMiddle,
  customerController.postCustomer
);

module.exports = router;
