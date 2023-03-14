const { Router } = require("express");
const {
  createSkill,
  listSkill,
  deleteSkill,
} = require("../controllers/skills.controller");
const validateToken = require("../middlewares/validate-token");
const { validateCreateSkill } = require("../validators/skill.validator");
const router = Router();

router.post("/", [validateToken, validateCreateSkill()], createSkill);
router.get("/", listSkill);
router.delete("/:id", validateToken, deleteSkill);

module.exports = router;
