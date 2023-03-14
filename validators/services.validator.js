const dayjs = require("dayjs");
const { check } = require("express-validator");
const endValidation = require("../middlewares/end-validation");

const validateCreateService = () => {
  return [
    check("name", "El nombre es obligatorio").not().isEmpty(),
    check("description", "La descripción es obligatoria").isLength({
      min: 20,
      max: 100,
    }),
    check("icon", "El ícono es obligatorio").isLength({ min: 8, max: 30 }),
    check("date", "La fecha no es válida").custom(isDate),
    endValidation,
  ];
};

const isDate = (value) => {
  if (!value) return value;
  const date = dayjs(value);
  return date.isValid();
};

module.exports = {
  validateCreateService,
};
