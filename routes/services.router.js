const { Router } = require("express");
const {
  createService,
  deleteService,
  listService,
  sendEmailFromContact,
} = require("../controllers/services.controller");
const validateToken = require("../middlewares/validate-token");
const { validateCreateService } = require("../validators/services.validator");
const router = Router();

router.post("/", [validateToken, validateCreateService()], createService);
router.post("/contact", sendEmailFromContact);
router.delete("/:id", validateToken, deleteService);
router.get("/", listService);

module.exports = router;
