const db = require("../../util/db");
const { encryptOrderId, decryptOrderId } = require("../../util/crypto");

exports.postOrder = async (req, res) => {
  try {
    const { employee_id, customer_id, vehicle_id, order_services, price } =
      req.body;

    let orderServiceId;
    if (order_services && order_services.length > 0) {
      orderServiceId = order_services.map((order) => {
        return { serviceId: order };
      });
    } else {
      orderServiceId = [];
    }

    const customer = await db.customerIdentifier.findFirst({
      where: {
        customerHash: customer_id.replaceAll("-", "/").replaceAll("_", "+"),
      },
    });
    const newOrder = await db.order.create({
      data: {
        employeeId: employee_id,
        customerId: customer.customerId,
        vehicleId: +vehicle_id,
        price,
        activeOrder: 1,
        orderDate: new Date().toISOString(),
        orderServices: {
          createMany: {
            data: orderServiceId,
          },
        },
      },
    });

    await db.order.update({
      where: {
        orderId: newOrder.orderId,
      },
      data: {
        orderHash: encryptOrderId(newOrder.orderId),
      },
    });
    res.status(201).json(newOrder);
  } catch (error) {
    console.error(error);
    res.status(400).json({ error: "Invalid request", details: error });
  }
};

exports.getAllOrders = async (req, res) => {
  try {
    const orders = await db.order.findMany({
      include: {
        orderServices: {
          select: {
            serviceCompleted: true,
          },
        },
        vehicle: {
          select: {
            vehicleId: true,
            vehicleMileage: true,
            vehicleTag: true,
            vehicleYear: true,
            vehicleColor: true,
            vehicleModel: true,
          },
        },
        customer: {
          include: {
            customerInfo: {
              select: {
                customerFirstName: true,
                customerLastName: true,
              },
            },
          },
        },
        employee: {
          include: {
            employeeInfo: {
              select: {
                employeeFirstName: true,
              },
            },
          },
        },
      },
      orderBy: {
        orderDate: "desc",
      },
    });
    const transformedOrders = orders.map((order) => {
      const customer = order.customer || {};
      const vehicle = order.vehicle || {};
      const employee = order.employee || {};

      const serviceStatuses = order.orderServices.map(
        (os) => os.serviceCompleted
      );

      const serviceCompleted = serviceStatuses.includes("Inprogress")
        ? "Inprogress"
        : "Completed";

      return {
        orderDate: order.orderDate,
        price: order.price,
        orderHash: order.orderHash,
        orderId: order.orderId,
        employee_first_name: employee.employeeInfo.employeeFirstName,
        employee_role: employee.role,
        customerEmail: customer.customerEmail,
        customerPhoneNumber: customer.customerPhoneNumber,
        customerAddedDate: customer.customerAddedDate,
        customerFirstName: customer.customerInfo.customerFirstName,
        customerLastName: customer.customerInfo.customerLastName,
        vehicleMileage: vehicle.vehicleMileage,
        vehicleTag: vehicle.vehicleTag,
        vehicleYear: vehicle.vehicleYear,
        vehicleModel: vehicle.vehicleModel,
        serviceCompleted,
      };
    });

    res.status(200).json({ orders: transformedOrders });
  } catch (error) {
    console.error("Failed to fetch all orders:", error);
    res.status(500).json({ error: "Internal Server Error", details: error });
  }
};

exports.getOrder = async (req, res) => {
  try {
    const { id } = req.params;

    const orderId = decryptOrderId(id);

    const order = await db.order.findUnique({
      where: {
        orderId: orderId,
      },
      include: {
        orderServices: {
          include: {
            service: {
              select: {
                serviceDescription: true,
                serviceName: true,
              },
            },
          },
        },
        vehicle: {
          select: {
            vehicleId: true,
            vehicleMileage: true,
            vehicleTag: true,
            vehicleColor: true,
            vehicleModel: true,
          },
        },
        customer: {
          include: {
            customerInfo: {
              select: {
                customerFirstName: true,
                customerLastName: true,
                activeCustomerStatus: true,
              },
            },
          },
        },
      },
    });

    if (!order) {
      return res.status(404).json({ error: "Order not found" });
    }

    const customer = order.customer || {};
    const vehicle = order.vehicle || {};
    const orderServices = order.orderServices || {};

    const serviceStatuses = orderServices.map((os) => os.serviceCompleted);

    const serviceCompleted = serviceStatuses.includes("Inprogress")
      ? "Inprogress"
      : "Completed";

    const service = orderServices.map((service) => {
      return { serviceCompleted: service.serviceCompleted, ...service.service };
    });

    res.status(200).json({
      order: {
        customer_active_status: customer.customerInfo.activeCustomerStatus,
        customerEmail: customer.customerEmail,
        customerPhoneNumber: customer.customerPhoneNumber,
        customerFirstName: customer.customerInfo.customerFirstName,
        customerLastName: customer.customerInfo.customerLastName,
        vehicleMileage: vehicle.vehicleMileage,
        vehicleTag: vehicle.vehicleTag,
        vehicleYear: vehicle.vehicleYear,
        vehicleModel: vehicle.vehicleModel,
        vehicleColor: vehicle.vehicleColor,
        serviceCompleted,
        service,
      },
    });
  } catch (error) {
    console.error("Failed to get order:", error);
    res.status(400).json({ error: "Invalid request", details: error });
  }
};

exports.putOrder = async (req, res, next) => {
  const { customerId, vehicleId, services } = req.body;
  const orderId = decryptOrderId(req.params.id);

  try {
    const updatedOrder = await db.order.update({
      where: {
        orderId,
      },
      data: {
        customerId,
        vehicleId,
      },
    });

    await Promise.all(
      services.map((service) => {
        return db.orderService.update({
          where: {
            orderId: updatedOrder.orderId,
            orderServiceId: service.orderServiceId,
          },
          data: {
            serviceCompleted: service.status,
          },
        });
      })
    );

    res.json(200).json({ message: "success" });
  } catch (error) {
    next(error);
  }
};
