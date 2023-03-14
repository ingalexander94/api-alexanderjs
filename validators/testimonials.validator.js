const { check } = require("express-validator");
const endValidation = require("../middlewares/end-validation");

const validateCreateTestimonials = () => {
  return [
    check("name", "El nombre es obligatorio").not().isEmpty(),
    check("socialNetwork", "La red social es obligatoria").isIn([
      "twitter",
      "github",
      "sinFoto",
    ]),
    check("message", "Máximo debe tener 230 caracteres").isLength({
      max: 230,
    }),
    endValidation,
  ];
};

const validateSendInvitation = () => {
  return [
    check("email", "El correo es obligatorio").isEmail(),
    check("name", "El nombre es obligatorio").not().isEmpty(),
    endValidation,
  ];
};

module.exports = {
  validateCreateTestimonials,
  validateSendInvitation,
};
