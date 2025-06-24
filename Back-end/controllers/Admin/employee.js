const bcrypt = require("bcrypt");

const db = require("../../util/db");

exports.getEmployee = async (req, res, next) => {
  try {
    let employee = await db.employee.findMany({
      take: 10,
      select: {
        employeeEmail: true,
        employeeId: true,
        addedDate: true,
        activeEmployee: true,
      },
    });
    employee = await Promise.all(
      employee.map(async (emp) => {
        const info = await db.employeeInfo.findUnique({
          where: { id: emp.employeeId },
          select: {
            employeePhone: true,
            employeeFirstName: true,
            employeeLastName: true,
          },
        });
        return {
          employee_id: emp.employeeId,
          employee_email: emp.employeeEmail,
          active_employee: emp.activeEmployee,
          added_date: emp.addedDate,
          employee_phone: info?.employeePhone,
          employee_first_name: info?.employeeFirstName,
          employee_last_name: info?.employeeLastName,
        };
      })
    );
    res.json({
      limit: 10,
      contacts: employee,
    });
  } catch (error) {
    next(error);
  }
};

exports.getEmployeeById = async (req, res, next) => {
  try {
    const id = +req.params.id;
    const employeeIdentifier = await db.employee.findUnique({
      where: { employeeId: id },
    });
    console.log(employeeIdentifier);
    if (!employeeIdentifier) {
      return res.status(404).json({ error: "Employee not found" });
    }

    const employeeInfo = await db.employeeInfo.findUnique({
      where: { employeeId: employeeIdentifier.employeeId },
    });

    if (!employeeInfo) {
      return res.status(404).json({ error: "Employee info not found" });
    }
    res.status(200).json({
      employee: {
        employee_id: employeeIdentifier.employeeId,
        employee_email: employeeIdentifier.employeeEmail,
        employee_phone_number: employeeInfo.employeePhone,
        employee_first_name: employeeInfo.employeeFirstName,
        employee_last_name: employeeInfo.employeeLastName,
        active_employee_status: employeeIdentifier.activeEmployee,
        added_date: employeeIdentifier.addedDate,
      },
    });
  } catch (error) {
    next(error);
  }
};

exports.postEmployee = async (req, res, next) => {
  try {
    const hashedPassword = await bcrypt.hash(req.body.employee_password, 5);
    const employee = await db.employee.create({
      data: {
        employeeEmail: req.body.employee_email,
        activeEmployee: 1,
        addedDate: new Date().toISOString(),
        role: req.body.role || "EMPLOYEE", // Default to 'employee' if not provided
      },
    });

    await db.employeePass.create({
      data: {
        employeeId: employee.employeeId,
        employeePasswordHashed: hashedPassword,
      },
    });

    await db.employeeInfo.create({
      data: {
        employeeId: employee.employeeId,
        employeePhone: req.body.employee_phone_number,
        employeeFirstName: req.body.employee_first_name,
        employeeLastName: req.body.employee_last_name,
      },
    });
    res.status(201).json({
      success: true,
    });
  } catch (error) {
    next(error);
  }
};

exports.updateEmployee = async (req, res, next) => {
  try {
    const id = +req.params.id;

    const employeeIdentifier = await db.employee.findUnique({
      where: { employeeId: id },
    });

    if (!employeeIdentifier) {
      return res.status(404).json({ error: "Employee not found" });
    }

    await db.employee.update({
      where: { employeeId: id },
      data: {
        activeEmployee: req.body.active_employee_status,
      },
    });

    await db.employeeInfo.update({
      where: { employeeId: id },
      data: {
        employeePhone: req.body.employee_phone_number,
        employeeFirstName: req.body.employee_first_name,
        employeeLastName: req.body.employee_last_name,
      },
    });

    res.status(201).json({
      success: true,
    });
  } catch (error) {
    next(error);
  }
};
