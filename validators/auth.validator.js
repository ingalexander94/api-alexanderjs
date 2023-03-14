const { check } = require("express-validator");
const endValidation = require("../middlewares/end-validation");

const validateCreateUser = () => {
  return [
    check("name", "El nombre es obligatorio").not().isEmpty(),
    check("email", "El correo es obligatorio").isEmail(),
    check("password", "La clave debe tener mínimo 6 caracteres").isLength({
      min: 6,
    }),
    endValidation,
  ];
};

const validateLogin = () => {
  return [
    check("email", "El correo es obligatorio").isEmail(),
    check("password", "La clave debe tener mínimo 6 caracteres").isLength({
      min: 6,
    }),
    endValidation,
  ];
};

const validateForgotPassword = () => {
  return [check("email", "El correo es obligatorio").isEmail(), endValidation];
};

const validateNewPassword = () => {
  return [
    check("password", "La clave debe tener mínimo 6 caracteres").isLength({
      min: 6,
    }),
    endValidation,
  ];
};

module.exports = {
  validateCreateUser,
  validateLogin,
  validateForgotPassword,
  validateNewPassword,
};
