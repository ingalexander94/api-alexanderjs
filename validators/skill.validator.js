const { check } = require("express-validator");
const endValidation = require("../middlewares/end-validation");

const validateCreateSkill = () => {
  return [
    check("name", "El nombre es obligatorio").not().isEmpty(),
    check("description", "La descripción es obligatoria").isLength({
      max: 100,
    }),
    endValidation,
  ];
};

module.exports = {
  validateCreateSkill,
};
