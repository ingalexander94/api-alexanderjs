const { validationResult } = require("express-validator");
const { request, response } = require("express");
const { sendError } = require("../helpers/response");

const endValidation = (req = request, res = response, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      ...sendError("Ocurrio un error en la petición"),
      error: errors.mapped(),
    });
  }
  next();
};

module.exports = endValidation;
