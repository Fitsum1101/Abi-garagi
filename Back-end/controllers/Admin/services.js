const db = require("../../util/db");

exports.postService = async (req, res, next) => {
  try {
    const { service_name, service_description } = req.body;

    await db.commonServices.create({
      data: {
        serviceName: service_name,
        serviceDescription: service_description,
      },
    });

    res.status(201).json({
      success: true,
    });
  } catch (error) {
    next(error);
  }
};

exports.getServices = async (req, res, next) => {
  try {
    const services = await db.commonServices.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });
    res.status(200).json({
      services: services.map((service) => ({
        service_id: service.serviceId,
        service_name: service.serviceName,
        service_description: service.serviceDescription,
      })),
    });
  } catch (error) {
    next(error);
  }
};

exports.getServicesById = async (req, res, next) => {
  try {
    const { id } = req.params;

    const service = await db.commonServices.findUnique({
      where: {
        serviceId: Number(id),
      },
    });

    if (!service) {
      return res.status(404).json({
        success: false,
        message: "Service not found",
      });
    }

    res.status(200).json({
      success: true,
      service: {
        service_id: service.serviceId,
        service_name: service.serviceName,
        service_description: service.serviceDescription,
      },
    });
  } catch (error) {
    next(error);
  }
};

exports.deleteService = async (req, res, next) => {
  try {
    const { id } = req.params;

    const service = await db.commonServices.findUnique({
      where: {
        serviceId: Number(id),
      },
    });

    if (!service) {
      return res.status(404).json({
        success: false,
        message: "Service not found",
      });
    }

    await db.commonServices.update({
      where: {
        serviceId: Number(id),
      },
      data: {
        activeService: 0,
      },
    });

    res.status(200).json({
      success: true,
      message: "Service deleted successfully",
    });
  } catch (error) {
    next(error);
  }
};

exports.updateService = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { service_name, service_description } = req.body;

    const service = await db.commonServices.findUnique({
      where: {
        serviceId: Number(id),
      },
    });

    if (!service) {
      return res.status(404).json({
        success: false,
        message: "Service not found",
      });
    }

    await db.commonServices.update({
      where: {
        serviceId: Number(id),
      },
      data: {
        serviceName: service_name,
        serviceDescription: service_description,
      },
    });

    res.status(200).json({
      success: true,
    });
  } catch (error) {
    next(error);
  }
};
