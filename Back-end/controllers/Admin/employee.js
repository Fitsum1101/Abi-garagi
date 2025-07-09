const bcrypt = require("bcrypt");

const db = require("../../util/db");

exports.getEmployee = async (req, res, next) => {
  try {
    const user = req.employee;
    let employee = await db.employee.findMany({
      take: 10,
      where: {
        AND: [
          {
            employeeId: {
              not: {
                equals: user.employeeId,
              },
            },
          },
          {
            role: {
              not: {
                equals: "ADMIN",
              },
            },
          },
          {
            activeEmployee: 1,
          },
        ],
      },
      select: {
        employeeEmail: true,
        employeeId: true,
        addedDate: true,
        activeEmployee: true,
      },
    });

    console.log(employee);
    employee = await Promise.all(
      employee.map(async (emp) => {
        const info = await db.employeeInfo.findUnique({
          where: { employeeId: emp.employeeId },
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
      where: {
        AND: [
          {
            employeeId: id,
          },
          {
            role: {
              not: {
                equals: "ADMIN",
              },
            },
          },
        ],
      },
    });
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
        role: employeeIdentifier.role,
      },
    });
  } catch (error) {
    next(error);
  }
};

exports.postEmployee = async (req, res, next) => {
  const user = req.user;
  try {
    const hashedPassword = await bcrypt.hash(req.body.employee_password, 5);
    const employee = await db.employee.create({
      data: {
        employeeEmail: req.body.employee_email,
        activeEmployee: 1,
        addedById: user.employeeId,
        addedDate: new Date().toISOString(),
        role: req.body.role || "EMPLOYEE",
      },
    });

    const employeeInfo = await db.employeeInfo.create({
      data: {
        employeeId: employee.employeeId,
        employeePhone: req.body.employee_phone,
        employeeFirstName: req.body.employee_first_name,
        employeeLastName: req.body.employee_last_name,
      },
    });

    const employeePassword = await db.employeePass.create({
      data: {
        employeeId: employee.employeeId,
        employeePasswordHashed: hashedPassword,
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

    await db.employee.update({
      where: { employeeId: id },
      data: {
        activeEmployee: req.body.active_employee_status,
        role: req.body.employee_role,
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
