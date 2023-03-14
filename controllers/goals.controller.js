const { request, response } = require("express");
const Goal = require("../database/models/Goal.model");
const { sendError, sendSuccess } = require("../helpers/response");

const createGoal = async (req = request, res = response) => {
  try {
    let goal = new Goal(req.body);
    goal = await goal.save();
    return res.status(200).json({
      ...sendSuccess("Objetivo creado"),
      goal,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json(sendError());
  }
};

const listGoal = async (req = request, res = response) => {
  try {
    const goals = await Goal.find();
    return res.status(200).json({
      ...sendSuccess(),
      goals,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json(sendError());
  }
};

const deleteGoal = async (req = request, res = response) => {
  const { id } = req.params;
  try {
    const goal = await Goal.findById(id);
    if (!goal) {
      return res.status(400).json(sendError("Objetivo no existe"));
    }
    await Goal.findByIdAndDelete(id);
    return res.status(200).json(sendSuccess("Objetivo eliminado"));
  } catch (error) {
    console.error(error);
    return res.status(500).json(sendError("", id));
  }
};

module.exports = {
  createGoal,
  listGoal,
  deleteGoal,
};
