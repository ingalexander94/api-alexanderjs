const { request, response } = require("express");
const Filter = require("../database/models/Filter.model");
const App = require("../database/models/App.model");
const { sendError, sendSuccess } = require("../helpers/response");
const { uploadPhoto, deletePhoto } = require("../images/storage");

// Apps
const listApps = async (req = request, res = response) => {
  let { limit = 5, page = 1, category = "todos" } = req.query;
  limit = parseInt(limit, 10);
  page = parseInt(page, 10);
  try {
    const filter = category === "todos" ? {} : { category };
    const apps = await App.paginate(filter, {
      limit,
      page,
      populate: { path: "category", select: "name" },
    });
    return res.status(200).json({
      ...sendSuccess(),
      apps,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json(sendError());
  }
};

const getApp = async (req = request, res = response) => {
  const { id } = req.params;
  try {
    const app = await App.findById(id).populate("category", "name");
    if (!app) {
      return res.status(400).json(sendError("Aplicación no existe"));
    }
    return res.status(200).json({
      ...sendSuccess(),
      app,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json(sendError("", id));
  }
};

const createApp = async (req = request, res = response) => {
  const { name } = req.body;
  try {
    let app = await App.findOne({ name });
    if (app) {
      return res.status(400).json(sendError("Aplicación ya existe"));
    }
    const { path } = req.file;
    const { photo, public_id } = await uploadPhoto(path);

    const newApp = {
      ...req.body,
      photo,
      public_id,
    };

    app = new App(newApp);
    app = await app.save();

    return res.status(200).json({
      ...sendSuccess("Aplicación creada"),
      app,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json(sendError());
  }
};

const deleteApp = async (req = request, res = response) => {
  const { id } = req.params;
  try {
    const app = await App.findById(id);
    if (!app) {
      return res.status(400).json(sendError("Aplicación no existe"));
    }
    await deletePhoto(app.public_id);
    await App.findByIdAndDelete(id);
    return res.status(200).json(sendSuccess("Aplicación eliminada"));
  } catch (error) {
    console.error(error);
    return res.status(500).json(sendError("", id));
  }
};

const updateApp = async (req = request, res = response) => {
  const { id } = req.params;
  const { name } = req.body;
  try {
    let app = await App.findById(id);
    if (!app) {
      return res.status(400).json(sendError("Aplicación no existe"));
    }
    if (app.name !== name) {
      app = await App.findOne({ name });
      if (app) {
        return res.status(400).json(sendError("Aplicación ya existe"));
      }
    }
    app = await App.findByIdAndUpdate(id, req.body, { new: true }).populate(
      "category",
      "name"
    );
    return res.status(200).json({
      ...sendSuccess("Aplicación actualizada"),
      app,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json(sendError("", id));
  }
};

const updatePhoto = async (req = request, res = response) => {
  const { id } = req.body;
  try {
    let app = await App.findById(id);
    if (!app) {
      return res.status(400).json(sendError("La aplicación no existe"));
    }
    await deletePhoto(app.public_id);
    const { path } = req.file;
    const { photo, public_id } = await uploadPhoto(path);
    app = await App.findByIdAndUpdate(
      id,
      { photo, public_id },
      { new: true }
    ).populate("category", "name");
    return res.status(200).json({
      ...sendSuccess("Imagen actualizada"),
      app,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json(sendError("", id));
  }
};

// Filters
const createFilter = async (req = request, res = response) => {
  const { name } = req.body;
  try {
    let filter = await Filter.findOne({ name });
    if (filter) {
      return res.status(400).json(sendError("Filtro ya existe"));
    }
    filter = new Filter(req.body);
    filter = await filter.save();
    return res.status(200).json({
      ...sendSuccess("Filtro creado"),
      filter,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json(sendError());
  }
};

const listFilters = async (req = request, res = response) => {
  try {
    const filters = await Filter.find();
    return res.status(200).json({
      ...sendSuccess(),
      filters,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json(sendError());
  }
};

const updateFilter = async (req = request, res = response) => {
  const { id } = req.params;
  try {
    let filter = await Filter.findById(id);
    if (!filter) {
      return res.status(400).json(sendError("Filtro no existe"));
    }
    filter = await Filter.findByIdAndUpdate(id, req.body, { new: true });
    return res.status(200).json({
      ...sendSuccess("Filtro actualizado"),
      filter,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json(sendError("", id));
  }
};

const deleteFilter = async (req = request, res = response) => {
  const { id } = req.params;
  try {
    const filter = await Filter.findById(id);
    if (!filter) {
      return res.status(400).json(sendError("Filtro no existe"));
    }
    await Filter.findByIdAndDelete(id);
    return res.status(200).json(sendSuccess("Filtro eliminado"));
  } catch (error) {
    console.error(error);
    return res.status(500).json(sendError("", id));
  }
};

module.exports = {
  listApps,
  getApp,
  createApp,
  deleteApp,
  updateApp,
  updatePhoto,
  createFilter,
  listFilters,
  deleteFilter,
  updateFilter,
};
