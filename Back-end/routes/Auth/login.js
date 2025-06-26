const router = require("express").Router();

const db = require("../../util/db");

const loginController = require("../../controllers/Auth/login");

router.post("/login", loginController.postLogin);
