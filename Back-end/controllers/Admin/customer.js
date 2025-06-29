const bcrypt = require("bcrypt");

const db = require("../../util/db");

exports.searchCustomer = async (req, res) => {
  const { query } = req.query;
  try {
    const customerResultId = [];
    let results = await db.customerIdentifier.findMany({
      take: 10,
      include: {
        customerInfo: {
          select: {
            activeCustomerStatus: true,
            customerFirstName: true,
            customerLastName: true,
            customerId: true,
          },
        },
      },
      where: {
        OR: [
          {
            customerEmail: {
              contains: query,
            },
          },
          {
            customerPhoneNumber: {
              contains: query,
            },
          },
        ],
      },
    });

    const resultLength = 10 - results.length;
    if (resultLength < 10) {
      results = results.map((customer) => {
        customerResultId.push(customer.customerId);
        const customerData = {
          customer_email: customer.customerEmail,
          customer_hash: customer.customerHash
            .replaceAll("/", "-")
            .replaceAll("+", "_"),
          customer_added_date: customer.customerAddedDate,
          customer_phone_number: customer.customerPhoneNumber,
          customer_first_name: customer.customerInfo.customerFirstName,
          customer_last_name: customer.customerInfo.customerLastName,
          active_customer_status: customer.customerInfo.activeCustomerStatus,
        };
        return customerData;
      });
    }

    if (!resultLength) {
      return res.status(200).json({ data: results });
    }
    let secoundResult = await db.customerInfo.findMany({
      take: resultLength,
      where: {
        AND: [
          {
            customerId: {
              notIn: customerResultId,
            },
          },
          {
            OR: [
              {
                customerFirstName: {
                  contains: query,
                },
              },
              {
                customerLastName: {
                  contains: query,
                },
              },
            ],
          },
        ],
      },
      include: {
        customer: {
          select: {
            customerAddedDate: true,
            customerEmail: true,
            customerHash: true,
            customerPhoneNumber: true,
          },
        },
      },
    });
    console.log("=========", secoundResult);
    if (secoundResult.length > 0) {
      secoundResult = secoundResult.map((customer) => {
        const customerData = {
          customer_first_name: customer.customerFirstName,
          customer_last_name: customer.customerLastName,
          active_customer_status: customer.activeCustomerStatus,
          customer_email: customer.customer.customerEmail,
          customer_hash: customer.customer.customerHash
            .replaceAll("/", "-")
            .replaceAll("+", "_"),
          customer_added_date: customer.customer.customerAddedDate,
          customer_phone_number: customer.customer.customerPhoneNumber,
        };
        return customerData;
      });
    }
    const newResult = results.concat(secoundResult);
    return res.status(200).json({ data: newResult });
  } catch (error) {
    console.error("Search failed:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};
exports.getCustomerById = async (req, res, next) => {
  try {
    const hashedId = req.params.id;

    const customerIdentifier = await db.customerIdentifier.findUnique({
      where: { customerHash: hashedId },
    });

    const customerInfo = await db.customerInfo.findUnique({
      where: { customerId: customerIdentifier.customerId },
    });

    res.status(200).json({
      customer: {
        customer_email: customerIdentifier.customerEmail,
        customer_phone_number: customerIdentifier.customerPhoneNumber,
        customer_first_name: customerInfo.customerFirstName,
        customer_last_name: customerInfo.customerLastName,
        customer_hash: customerIdentifier.customerHash
          .replaceAll("/", "-")
          .replaceAll("+", "_"),
        active_customer_status: customerInfo.activeCustomerStatus,
        customer_added_date: customerIdentifier.customerAddedDate,
      },
    });
  } catch (error) {
    console.error("Error fetching customer:", error);
    next(error);
  }
};

exports.postCustomer = async (req, res, next) => {
  try {
    const customerInfo = await db.customerIdentifier.create({
      data: {
        customerEmail: req.body.customer_email,
        customerPhoneNumber: req.body.customer_phone_number,
        customerAddedDate: new Date().toISOString(),
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
};
exports.updateCustomer = async (req, res, next) => {
  try {
    const hashedId = req.params.id.replaceAll("-", "/").replaceAll("_", "+");
    const customerIdentifier = await db.customerIdentifier.findFirst({
      where: { customerHash: hashedId },
    });
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
};

exports.getCustomer = async (req, res, next) => {
  try {
    let customer = await db.customerIdentifier.findMany({
      take: 10,
      select: {
        customerId: true,
        customerEmail: true,
        customerPhoneNumber: true,
        customerHash: true,
        customerAddedDate: true,
      },
    });

    customer = await Promise.all(
      customer.map(async (cust) => {
        const info = await db.customerInfo.findUnique({
          where: { customerId: cust.customerId },
          select: {
            activeCustomerStatus: true,
            customerFirstName: true,
            customerLastName: true,
          },
        });
        return {
          customer_id: 1,
          customer_email: cust.customerEmail,
          customer_phone_number: cust.customerPhoneNumber,
          customer_first_name: info?.customerFirstName,
          customer_last_name: info?.customerLastName,
          customer_hash: cust.customerHash,
          active_customer_status: info?.activeCustomerStatus,
          customer_added_date: fullYearTime(cust.customerAddedDate),
        };
      })
    );
    res.json({
      limit: 10,
      contacts: customer,
    });
  } catch (error) {
    next(error);
  }
};

const fullYearTime = (value) => {
  const date = new Date(value);
  return [
    date.getFullYear(),
    "-",
    date.getMonth(),
    "-",
    date.getDay(),
    "|",
    date.getHours(),
    ":",
    date.getMinutes(),
  ].join("");
};
