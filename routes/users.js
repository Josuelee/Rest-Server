const { Router } = require("express");
const { body, check } = require("express-validator");
const { fieldsValidate } = require("../middlewares/fields-validate");
const {
  isValidRole,
  emailExist,
  existUserById,
} = require("../helpers/db-validators");
const {
  getUsers,
  postUsers,
  patchUsers,
  putUsers,
  deleteUsers,
} = require("../controllers/users");

const router = Router();

router.get("/", getUsers);

router.post(
  "/",
  [
    body("nombre", "Nombre es requerido").not().isEmpty(),
    body("pass", "Contraseña tiene que tener mas de 6 caracteres").isLength({
      min: 6,
    }),
    body("correo", "Correo invalido").isEmail(),
    body("correo").custom(emailExist),
    body("rol").custom(isValidRole),
    fieldsValidate,
  ],
  postUsers
);

router.put(
  "/:id",
  [
    check("id", "No es un ID válido de MONGO").isMongoId(),
    check("id").custom(existUserById),
    body("rol").custom(isValidRole),
    fieldsValidate,
  ],
  putUsers
);

router.patch("/", patchUsers);

router.delete(
  "/:id",
  [
    check("id", "No es un ID valido de MONGO").isMongoId(),
    check("id").custom(existUserById),
    fieldsValidate,
  ],
  deleteUsers
);

module.exports = router;

//cuando quiero usar middlewares en mis rutas, se usa el segundo parametro
// si quiero usar mas de 1 middleware entonces los ejecuto dentro de un arreglo
//  body es un middleware que validara todos los campos del body de la request

// body("rol", "Ese rol no es valido").isIn(["ADMIN_ROL", "USER_ROL"])-para validar roles
