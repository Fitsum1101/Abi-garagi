const db = require("../../util/db");
const jwt = require("jsonwebtoken");

const bcrypt = require("bcrypt");

exports.postLogin = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    console.log(email, password);
    const employee = await db.employee.findUnique({
      where: {
        employeeEmail: email,
      },
      include: {
        employeePass: {
          select: {
            employeePasswordHashed: true,
          },
        },
      },
    });

    const isPasswordValid = await bcrypt.compare(
      password,
      employee.employeePass.employeePasswordHashed
    );

    if (!isPasswordValid) {
      return res.status(401).json({
        success: false,
        message: "Invalid email or password",
      });
    }

    const updatedEmployee = {
      employee_id: employee.employeeId,
      employee_email: employee.employeeEmail,
      role: employee.role,
    };

    const token = jwt.sign(employee, process.env.JWT_SECRET_KEY, {
      expiresIn: "1h",
    });

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
