const { response, request } = require("express");
const Service = require("../database/models/Service.model");
const { sendEmailWithText } = require("../emails/sendEmail");
const { sendError, sendSuccess } = require("../helpers/response");

const createService = async (req = request, res = response) => {
  const { name } = req.body;
  try {
    let service = await Service.findOne({ name });
    if (service) {
      return res.status(400).json(sendError("Servicio ya existe"));
    }
    service = new Service(req.body);
    service = await service.save();
    return res.status(200).json({
      ...sendSuccess("Servicio creado"),
      service,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json(sendError());
  }
};

const listService = async (req = request, res = response) => {
  try {
    const services = await Service.find();
    return res.status(200).json({
      ...sendSuccess(),
      services,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json(sendError());
  }
};

const deleteService = async (req = request, res = response) => {
  const { id } = req.params;
  try {
    const service = await Service.findById(id);
    if (!service) {
      return res.status(400).json(sendError("Servicio no existe"));
    }
    await Service.findByIdAndDelete(id);
    return res.status(200).json(sendSuccess("Servicio eliminado"));
  } catch (error) {
    console.error(error);
    return res.status(500).json(sendError("", id));
  }
};

const sendEmailFromContact = async (req = request, res = response) => {
  const { name, from, subject, message } = req.body;
  try {
    await sendEmailWithText(
      '"Mensaje de cliente 👻" <alexandev94@gmail.com>',
      "alexandev94@gmail.com",
      subject,
      `${name} te ha escrito: ${message} 
      Correo cliente: ${from}`
    );
    res.status(200).json(sendSuccess("Correo enviado"));
  } catch (error) {
    console.error(error);
    res.status(500).json(sendError());
  }
};

module.exports = {
  createService,
  listService,
  deleteService,
  sendEmailFromContact,
};
