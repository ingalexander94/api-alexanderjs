const { request, response } = require("express");
const bcryptjs = require("bcryptjs");
const User = require("../database/models/User.model");
const generateToken = require("../helpers/jwt");
const { sendError, sendSuccess } = require("../helpers/response");
const { sendEmailWithHTML } = require("../emails/sendEmail");

const createUser = async (req = request, res = response) => {
  const { email, password } = req.body;
  try {
    // Validar que no exista
    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json(sendError("Usuario ya existe"));
    }

    user = new User(req.body);

    // Encriptar contraseña
    const salt = bcryptjs.genSaltSync();
    user.password = bcryptjs.hashSync(password, salt);

    // Guardar el usuario
    await user.save();

    // Generar el token
    const token = await generateToken(user._id, user.name);
    return res.status(201).json({
      ...sendSuccess("Usuario creado"),
      uid: user._id,
      name: user.name,
      token,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json(sendError());
  }
};

const login = async (req = request, res = response) => {
  const { email, password } = req.body;
  try {
    // Verificar si existe
    let user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json(sendError("Usuario no existe"));
    }
    // Comparar contraseñas
    const validatePassword = bcryptjs.compareSync(password, user.password);
    if (!validatePassword) {
      return res.status(400).json(sendError("Clave incorrecta"));
    }

    // Generar el token
    const token = await generateToken(user._id, user.name);
    return res.status(200).json({
      ...sendSuccess("Autenticado"),
      uid: user._id,
      name: user.name,
      token,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json(sendError());
  }
};

const renewToken = async (req = request, res = response) => {
  const { uid, name } = req;
  // Generar el token
  const token = await generateToken(uid, name);
  return res.json({
    ...sendSuccess("Token renovado"),
    uid,
    name,
    token,
  });
};

const forgotPassword = async (req = request, res = response) => {
  const { email } = req.body;
  try {
    // Verificar si existe
    let user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json(sendError("Usuario no existe"));
    }

    // Generar token
    const token = await generateToken(user._id, user.name);
    user.resetToken = token;
    await user.save();

    // Enviar Correo
    const recoveryLink = `${process.env.URL_FRONTEND}/auth/new-password/${token}`;
    await sendEmailWithHTML(
      '"Recuperar contraseña 👻" <alexandev94@gmail.com>',
      email,
      "Recuperar contraseña de Alexandev.js",
      `
    <b>Por favor haga click en el enlace para completar el proceso de recuperar su contraseña</b>
    <a href="${recoveryLink}">${recoveryLink}</a>
  `
    );

    return res.status(200).json(sendSuccess("Enlace enviado al correo"));
  } catch (error) {
    console.error(error);
    return res.status(500).json(sendError());
  }
};

const newPassword = async (req = request, res = response) => {
  const { uid } = req;
  const { password } = req.body;
  try {
    let user = await User.findById(uid);
    // Desactivar token
    if (user.resetToken === "") {
      return res.status(401).json(sendError("El link ya no es válido"));
    }
    user.resetToken = "";
    // Encriptar contraseña
    const salt = bcryptjs.genSaltSync();
    user.password = bcryptjs.hashSync(password, salt);
    // Guardar el usuario
    await user.save();
    return res.status(200).json(sendSuccess("Contraseña actualizada"));
  } catch (error) {
    console.error(error);
    return res.status(500).json(sendError());
  }
};

module.exports = {
  login,
  createUser,
  renewToken,
  forgotPassword,
  newPassword,
};
