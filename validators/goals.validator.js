const dayjs = require("dayjs");
const { check } = require("express-validator");
const endValidation = require("../middlewares/end-validation");

const validateCreateGoal = () => {
  return [
    check("role", "El rol es obligatorio").not().isEmpty(),
    check("startDate", "La fecha de inicio es obligatoria").custom(isDate),
    check("endDate", "La fecha final no es válida").custom(isDate),
    check("institution", "La institución es obligatoria").not().isEmpty(),
    check("description", "La descripción es obligatoria").isLength({
      max: 100,
    }),
    check("type", "El tipo no es válido").isIn(["experience", "education"]),
    endValidation,
  ];
};

const isDate = (value) => {
  if (value === null) return true;
  if (!value) return value;
  const date = dayjs(value);
  return date.isValid();
};

module.exports = {
  validateCreateGoal,
};
