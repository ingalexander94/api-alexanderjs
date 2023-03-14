const jwt = require("jsonwebtoken");
const { request, response } = require("express");
const { sendError } = require("../helpers/response");

const validateToken = (req = request, res = response, next) => {
  const token = req.header("x-token");
  if (!token) {
    res.status(401).json(sendError("No tiene un token"));
  }
  try {
    const { uid, name } = jwt.verify(token, process.env.SECRET_JWT_AUTH);
    req.uid = uid;
    req.name = name;
  } catch (error) {
    console.error(error);
    return res.status(401).json(sendError("El token no es valido"));
  }
  next();
};

module.exports = validateToken;
