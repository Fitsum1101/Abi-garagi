const db = require("../../util/db");
const jwt = require("jsonwebtoken");

const bcrypt = require("bcrypt");

exports.postLogin = async (req, res, next) => {
  try {
    const { employee_email, employee_password } = req.body;
    const employee = await db.employee.findUnique({
      where: {
        employeeEmail: employee_email,
      },
      include: {
        employeePass: {
          select: {
            employeePasswordHashed: true,
          },
        },
      },
    });

    const updatedEmployee = {
      employee_id: employee.employeeId,
      employee_email: employee.employeeEmail,
      role: employee.role,
    };

    const token = jwt.sign(updatedEmployee, process.env.JWT_SECRET_KEY);

    res.status(200).json({
      success: true,
      employee: {
        ...updatedEmployee,
      },
      token,
    });
  } catch (error) {
    next(error);
  }
};
