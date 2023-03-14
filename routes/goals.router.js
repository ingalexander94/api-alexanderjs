const { Router } = require("express");
const {
  deleteGoal,
  listGoal,
  createGoal,
} = require("../controllers/goals.controller");
const validateToken = require("../middlewares/validate-token");
const { validateCreateGoal } = require("../validators/goals.validator");

const router = Router();

router.get("/", listGoal);
router.post("/", [validateToken, validateCreateGoal()], createGoal);
router.delete("/:id", validateToken, deleteGoal);

module.exports = router;
