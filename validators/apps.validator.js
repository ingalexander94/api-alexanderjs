const { check } = require("express-validator");
const endValidation = require("../middlewares/end-validation");
const dayjs = require("dayjs");

const validateCreateApp = () => {
  return [
    check("name", "El nombre es obligatorio").not().isEmpty(),
    check("date", "La fecha es obligatoria").custom(isDate),
    check("nameClient", "El nombre del cliente es obligatorio").not().isEmpty(),
    check("tools", "Las herramientas son obligatorias").not().isEmpty(),
    check(
      "description",
      "La descripción es debe contener máximo 400 caracteres"
    ).isLength({
      min: 1,
      max: 400,
    }),
    check("role", "El rol es obligatorio").not().isEmpty(),
    check("category", "La categoría es obligatoria").not().isEmpty(),
    endValidation,
  ];
};

const isDate = (value) => {
  if (!value) return value;
  const date = dayjs(value);
  return date.isValid();
};

module.exports = {
  validateCreateApp,
};
