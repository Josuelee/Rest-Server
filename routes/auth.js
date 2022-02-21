const { Router } = require("express");
const { body } = require("express-validator");
const { fieldsValidate } = require("../middlewares/validate-fields");
const { login } = require("../controllers/auth");
const router = Router();

router.post(
  "/login",
  [
    body("correo", "Tiene que enviar un correo valido").isEmail(),
    body("pass", "Contraseña es obligatoria").not().isEmpty(),
    fieldsValidate,
  ],
  login
);
module.exports = router;
