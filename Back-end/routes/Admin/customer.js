const router = require("express").Router();

const { validateResultMiddle } = require("../../middleware/validationResult");
const customerController = require("../../controllers/Admin/customer");
const {
  nameValidation,
  customerEmailValidation,
  customerPhoneNumberValidation,
  customerIdValidation,
} = require("../../util/validation");

router.get("/customer", customerController.getCustomer);

router.put(
  "/customer/:id",
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

router.get(
  "/customer/:id",
  // customerIdValidation(),
  customerController.getCustomerById
);

router.get("/customer/search", customerController.searchCustomer);

module.exports = router;
