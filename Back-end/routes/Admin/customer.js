const router = require("express").Router();

const db = require("../../util/db");

const bcrypt = require("bcrypt");

router.get("/customer/:id", async (req, res, next) => {
  try {
    const hashedId = req.params.id;

    const customerIdentifier = await db.customerIdentifier.findUnique({
      where: { customerHash: hashedId },
    });

    const customerInfo = await db.customerInfo.findUnique({
      where: { customerId: customerIdentifier.customerId },
    });

    if (!customerIdentifier || !customerInfo) {
      return res.status(404).json({ error: "Customer not found" });
    }
    res.status(200).json({
      customer: {
        customer_id: customerInfo.customerId,
        customer_email: customerIdentifier.customerEmail,
        customer_phone_number: customerIdentifier.customerPhoneNumber,
        customer_first_name: customerInfo.customerFirstName,
        customer_last_name: customerInfo.customerLastName,
        customer_hash: customerIdentifier.customerHash,
        active_customer_status: customerInfo.activeCustomerStatus,
        customer_added_date: customerIdentifier.customerAddedDate,
      },
    });
  } catch (error) {
    console.error("Error fetching customer:", error);
    next(error);
  }
});

router.post("/customer/", async (req, res, next) => {
  try {
    const customerInfo = await db.customerIdentifier.create({
      data: {
        customerEmail: req.body.customer_email,
        customerPhoneNumber: req.body.customer_phone_number,
        customerAddedDate: new Date(req.body.customer_added_date).toISOString(),
      },
    });

    const hashedId = await bcrypt.hash(customerInfo.customerId.toString(), 5);

    await db.customerIdentifier.update({
      where: { customerId: customerInfo.customerId },
      data: { customerHash: hashedId },
    });

    await db.customerInfo.create({
      data: {
        customerId: customerInfo.customerId,
        customerFirstName: req.body.customer_first_name,
        customerLastName: req.body.customer_last_name,
        activeCustomerStatus: 1,
      },
    });
    res.status(201).json({
      success: true,
    });
  } catch (error) {
    console.error("Error creating customer:", error);
    next(error);
  }
});

router.put("/customer/:id", async (req, res, next) => {
  try {
    const hashedId = req.params.id.replaceAll("-", "/").replaceAll("_", "+");
    console.log("Hashed ID:", hashedId);
    const customerIdentifier = await db.customerIdentifier.findFirst({
      where: { customerHash: hashedId },
    });
    if (!customerIdentifier) {
      return res.status(404).json({ error: "Customer not found" });
    }
    const updatedcustomerIdentifier = await db.customerIdentifier.update({
      where: {
        customerHash: hashedId,
        customerId: customerIdentifier.customerId,
      },
      data: {
        customerPhoneNumber: req.body.customer_phone_number,
      },
    });
    const data = {
      customerFirstName: req.body.customer_first_name,
      customerLastName: req.body.customer_last_name,
    };
    if (req.body.active_customer_status) {
      data.activeCustomerStatus = +req.body.active_customer_status;
    }
    await db.customerInfo.update({
      where: { customerId: updatedcustomerIdentifier.customerId },
      data: data,
    });
    res.status(200).json({
      success: true,
    });
  } catch (error) {
    console.error("Error updating customer:", error);
    next(error);
  }
});

module.exports = router;
