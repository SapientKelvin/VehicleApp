const { authValidationSchema } = require("../validationSchema");

const validateUserAuth = async (req, res, next) => {
  try {
    const { error, value } = await authValidationSchema.validate(req.body);
    if (error) {
      return res.status(400).json({ message: error.message, status: false });
    } else {
      next();
    }
  } catch (err) {
    res.status(500).json({ message: "Something Went Wrong !", status: false });
  }
};

module.exports = validateUserAuth;
