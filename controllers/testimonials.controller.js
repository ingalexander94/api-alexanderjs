const { request, response } = require("express");
const { getProfilePicture } = require("../images/scraping");
const Testimonial = require("../database/models/Testimonial.model");
const generateToken = require("../helpers/jwt");
const { sendEmailWithHTML } = require("../emails/sendEmail");
const { sendError, sendSuccess } = require("../helpers/response");
const { uploadPhoto, deletePhoto } = require("../images/storage");

const sendInvitation = async (req = request, res = response) => {
  const { name, email } = req.body;
  try {
    const testimonial = await Testimonial.findOne({ email });
    if (testimonial) {
      return res.status(401).json(sendError("Ya invito a esta persona"));
    }

    // Generar token
    const token = await generateToken(email, name);

    // Enviar invitación
    const invitationLink = `${process.env.URL_FRONTEND}/add-review/${token}`;
    await sendEmailWithHTML(
      '"Invitación de Alexander Peñaloza 🤙" <alexandev94@gmail.com>',
      email,
      "Ha recibido una invitación para realizar un comentario en el portafolio de Alexander",
      `
    <p>Hola ${name}, es muy importante para mi vida profesional recolectar feedback de mis clientes y de personas capacitadas para opinar de mi desempeño profesional, por favor haga click en el enlace para publicar un comentario de máximo 230 caracteres en mi portafolio web <b>Alexander.js</b></p>
    <a href="${invitationLink}">${invitationLink}</a>
  `
    );
    return res.status(200).json({
      ...sendSuccess("Invitación enviada"),
      token,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json(sendError());
  }
};

const createTestimonials = async (req = request, res = response) => {
  const { socialNetwork, username } = req.body;
  const { uid } = req;
  let state = {
    ...req.body,
    email: uid,
  };
  try {
    let testimonial = await Testimonial.findOne({ email: uid });
    if (testimonial) {
      return res
        .status(401)
        .json(sendError("Ya ha realizado un comentario con anterioridad"));
    }
    if (socialNetwork !== "sinFoto") {
      const src = await getProfilePicture(socialNetwork, username);
      if (src) {
        const { photo, public_id } = await uploadPhoto(src, "testimonials");
        state = {
          ...state,
          photo,
          public_id,
        };
      } else {
        return res
          .status(400)
          .json(sendError("El nombre de usuario no es correcto"));
      }
    } else {
      state = {
        ...state,
        photo: process.env.URL_DEFAULT_PHOTO,
      };
    }
    testimonial = new Testimonial(state);
    testimonial = await testimonial.save();
    return res.status(200).json({
      ...sendSuccess("Comentario publicado"),
      testimonial,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json(sendError());
  }
};

const listTestimonials = async (req = request, res = response) => {
  try {
    const testimonials = await Testimonial.find();
    return res.status(200).json({
      ...sendSuccess(),
      testimonials,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json(sendError());
  }
};

const deleteTestimonial = async (req = request, res = response) => {
  const { id } = req.params;
  try {
    const testimonial = await Testimonial.findById(id);
    if (!testimonial) {
      return res.status(400).json(sendError("Testimonio no existe"));
    }
    testimonial.socialNetwork !== "sinFoto" &&
      (await deletePhoto(testimonial.public_id));
    await Testimonial.findByIdAndDelete(id);
    return res.status(200).json(sendSuccess("Testimonio eliminado"));
  } catch (error) {
    console.error(error);
    return res.status(500).json(sendError("", id));
  }
};

module.exports = {
  createTestimonials,
  sendInvitation,
  listTestimonials,
  deleteTestimonial,
};
