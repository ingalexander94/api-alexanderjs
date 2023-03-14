const { Router } = require("express");
const {
  listFilters,
  createFilter,
  updateFilter,
  deleteFilter,
  createApp,
  updateApp,
  deleteApp,
  listApps,
  getApp,
  updatePhoto,
} = require("../controllers/apps..controller");
const validateToken = require("../middlewares/validate-token");
const { validateCreateFilter } = require("../validators/filter.validator");
const { validateCreateApp } = require("../validators/apps.validator");

const router = Router();

//Apps
router.get("/apps", listApps);
router.get("/apps/:id", getApp);
router.post("/apps", [validateToken, validateCreateApp()], createApp);
router.put("/apps/:id", [validateToken, validateCreateApp()], updateApp);
router.put("/apps/photo/update", validateToken, updatePhoto);
router.delete("/apps/:id", validateToken, deleteApp);

// Filters
router.get("/filters", listFilters);
router.post("/filters", [validateToken, validateCreateFilter()], createFilter);
router.put(
  "/filters/:id",
  [validateToken, validateCreateFilter()],
  updateFilter
);
router.delete("/filters/:id", validateToken, deleteFilter);

module.exports = router;
