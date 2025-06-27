const { validationResult } = require("express-validator");

exports.validateResultMiddle = (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    const firstError = errors.array()[0];
    console.log(firstError);
    return res.status(400).json({
      error: {
        name: firstError.path,
        msg: firstError.msg,
      },
    });
  }
  next();
};
