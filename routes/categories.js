const { Router } = require("express");
const { body, check } = require("express-validator");
const {
  createCategory,
  getCategories,
  getCategory,
  updateCategory,
  deleteCategory,
} = require("../controllers/categories");

const { existCategoryById } = require("../helpers/db-validators");
const { fieldsValidate } = require("../middlewares/validate-fields");
const { validateJWT, isAdmin } = require("../middlewares/");

const router = Router();

// Obtener categorias - publico
router.get("/", getCategories);

// Obtener una categoria por id - publico
router.get(
  "/:id",
  [
    check("id", "No es un id valido de MONGO").isMongoId(),
    check("id").custom(existCategoryById),
    fieldsValidate,
  ],
  getCategory
);

// Guardar una categoria - Privado: solo personas con token valido
router.post(
  "/",
  [
    validateJWT,
    body("nombre", "El nombre es requerido").not().isEmpty(),
    fieldsValidate,
  ],
  createCategory
);

// Actualizar categoria - Privado: Solo personas con token valido
router.put(
  "/:id",
  [
    validateJWT,
    body("nombre", "Tiene que ingresar su nuevo nombre").not().isEmpty(),
    check("id", "No es un id valido de MONGO").isMongoId(),
    check("id").custom(existCategoryById),
    fieldsValidate,
  ],
  updateCategory
);

// Eliminar catetegoria - Privado: Solo administrador
router.delete(
  "/:id",
  [
    validateJWT,
    isAdmin,
    check("id", "No es un id valido de MONGO").isMongoId(),
    check("id").custom(existCategoryById),
    fieldsValidate,
  ],
  deleteCategory
);

module.exports = router;
