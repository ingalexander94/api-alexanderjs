const { request, response } = require("express");
const Skill = require("../database/models/Skill.model");
const { sendError, sendSuccess } = require("../helpers/response");
const { uploadPhoto, deletePhoto } = require("../images/storage");

const createSkill = async (req = request, res = response) => {
  const { name } = req.body;
  try {
    let skill = await Skill.findOne({ name });
    if (skill) {
      return res.status(400).json(sendError("Habilidad ya existe"));
    }
    const { path } = req.file;
    const { photo, public_id } = await uploadPhoto(path, "icon");
    skill = new Skill({ ...req.body, photo, public_id });
    skill = await skill.save();
    return res.status(200).json({
      ...sendSuccess("Habilidad creada"),
      skill,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json(sendError());
  }
};

const listSkill = async (req = request, res = response) => {
  try {
    const skills = await Skill.find();
    return res.status(200).json({
      ...sendSuccess(),
      skills,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json(sendError());
  }
};

const deleteSkill = async (req = request, res = response) => {
  const { id } = req.params;
  try {
    const skill = await Skill.findById(id);
    if (!skill) {
      return res.status(400).json(sendError("Habilidad no existe"));
    }
    await deletePhoto(skill.public_id);
    await Skill.findByIdAndDelete(id);
    return res.status(200).json(sendSuccess("Habilidad eliminada"));
  } catch (error) {
    console.error(error);
    return res.status(500).json(sendError("", id));
  }
};

module.exports = {
  createSkill,
  listSkill,
  deleteSkill,
};
