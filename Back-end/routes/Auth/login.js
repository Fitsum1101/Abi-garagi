const router = require("express").Router();

const loginController = require("../../controllers/Auth/login");

router.post("/login", loginController.postLogin);

module.exports = router;
