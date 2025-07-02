const db = require("../../util/db");

exports.postVehicle = async (req, res, next) => {
  try {
    const {
      customer_id,
      vehicle_year,
      vehicle_make,
      vehicle_model,
      vehicle_type,
      vehicle_mileage,
      vehicle_tag,
      vehicle_serial,
      vehicle_color,
    } = req.body;

    await prisma.CustomerVehicleInfo.create({
      data: {
        customer_id,
        vehicle_year,
        vehicle_make,
        vehicle_model,
        vehicle_type,
        vehicle_mileage,
        vehicle_tag,
        vehicle_serial,
        vehicle_color,
      },
    });
    res.status(201).json({
      success: "true",
    });
  } catch (error) {
    next(error);
  }
};

exports.getVechleByCustomerId = async (req, res, next) => {
  try {
    const customerId = +req.params.id;
    const vehicles = await db.customerVehicleInfo.findMany({
      where: {
        customerId,
      },
    });

    if (vehicles.length <= 0) {
      return res.json([]);
    }
    const CustomerVehicles = vehicles.map((vehicle) => ({
      vehicle_id: vehicle.id,
      customer_id: vehicle.customerId,
      vehicle_year: vehicle.vehicleYear,
      vehicle_make: vehicle.vehicleMake,
      vehicle_model: vehicle.vehicleMake,
      vehicle_type: vehicle.vehicleType,
      vehicle_mileage: vehicle.vehicleMileage,
      vehicle_tag: vehicle.vehicleTag,
      vehicle_serial: vehicle.vehicleSerial,
      vehicle_color: vehicle.vehicleColor,
    }));

    res.json(CustomerVehicles);
  } catch (error) {
    next(error);
  }
};

exports.getVechleById = async (req, res, next) => {
  try {
    const vehicleId = +req.params.id;

    const vehicle = await db.customerVehicleInfo.findMany({
      where: {
        vehicleId,
      },
    });

    res.json({
      customer_id: vehicle.customerId,
      vehicle_year: vehicle.vehicleYear,
      vehicle_make: vehicle.vehicleMake,
      vehicle_model: vehicle.vehicleMake,
      vehicle_type: vehicle.vehicleType,
      vehicle_mileage: vehicle.vehicleMileage,
      vehicle_tag: vehicle.vehicleTag,
      vehicle_serial: vehicle.vehicleSerial,
      vehicle_color: vehicle.vehicleColor,
    });
  } catch (error) {
    next(error);
  }
};
