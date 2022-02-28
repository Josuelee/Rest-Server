const { Router } = require("express");
const { body } = require("express-validator");
const { fieldsValidate } = require("../middlewares/validate-fields");
const { login, googleSignIn } = require("../controllers/auth");
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

router.post(
  "/google",
  [
    body("id_token", "El id_token es requerido").not().isEmpty(),
    fieldsValidate,
  ],
  googleSignIn
);
module.exports = router;
