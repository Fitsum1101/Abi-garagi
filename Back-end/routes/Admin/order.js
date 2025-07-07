const router = require("express").Router();

const orderController = require("../../controllers/Admin/order");
const { authenticateToken } = require("../../middleware/authenticateToken");

router.post("/order", authenticateToken, orderController.postOrder);

router.get("/order/:id", authenticateToken, orderController.getOrder);

router.get("/orders", authenticateToken, orderController.getAllOrders);

module.exports = router;
