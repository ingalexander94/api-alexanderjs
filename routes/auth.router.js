const { Router } = require("express");
const {
  login,
  createUser,
  renewToken,
  forgotPassword,
  newPassword,
} = require("../controllers/auth.controller");
const validateToken = require("../middlewares/validate-token");
const {
  validateLogin,
  validateCreateUser,
  validateForgotPassword,
  validateNewPassword,
} = require("../validators/auth.validator");
const router = Router();

router.get("/renew", validateToken, renewToken);
router.post("/login", validateLogin(), login);
router.post("/register", validateCreateUser(), createUser);
router.put("/forgot-password", validateForgotPassword(), forgotPassword);
router.put(
  "/new-password",
  [validateToken, validateNewPassword()],
  newPassword
);

module.exports = router;
