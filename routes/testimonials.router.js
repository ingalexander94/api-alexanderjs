const { Router } = require("express");
const {
  createTestimonials,
  sendInvitation,
  listTestimonials,
  deleteTestimonial,
} = require("../controllers/testimonials.controller");
const validateToken = require("../middlewares/validate-token");
const {
  validateCreateTestimonials,
  validateSendInvitation,
} = require("../validators/testimonials.validator");
const router = Router();

router.get("/", listTestimonials);
router.post(
  "/send-invitation",
  [validateToken, validateSendInvitation()],
  sendInvitation
);
router.post(
  "/",
  [validateToken, validateCreateTestimonials()],
  createTestimonials
);
router.delete("/:id", validateToken, deleteTestimonial);

module.exports = router;
