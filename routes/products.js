const { Router } = require("express");
const { check, body } = require("express-validator");

const { validateJWT, fieldsValidate, isAdmin } = require("../middlewares");
const {
  existProductById,
  existCategoryById,
} = require("../helpers/db-validators");

const {
  saveProduct,
  getProduct,
  getOneProduct,
  updateProduct,
  deleteProduct,
} = require("../controllers/products");

const router = Router();

// Obtener categorias - publico

router.get("/", getProduct);

// Obtener una categoria por id - publico
router.get(
  "/:id",
  [
    check("id").isMongoId(),
    check("id").custom(existProductById),
    fieldsValidate,
  ],
  getOneProduct
);

// Guardar una categoria - Privado: solo personas con token valido
router.post(
  "/",
  [
    validateJWT,
    check("nombre").notEmpty(),
    body("categoria").isMongoId(),
    body("categoria").custom(existCategoryById),
    fieldsValidate,
  ],
  saveProduct
);

// Actualizar categoria - Privado: Solo personas con token valido

router.put(
  "/",
  [
    validateJWT,
    check("id").isMongoId(),
    check("id").custom(existProductById),
    check("nombre").notEmpty(),
    fieldsValidate,
  ],
  updateProduct
);

// Eliminar catetegoria - Privado: Solo administrador

router.delete(
  "/",
  [
    validateJWT,
    isAdmin,
    check("id").isMongoId(),
    check("id").custom(existProductById),
    fieldsValidate,
  ],
  deleteProduct
);

module.exports = router;
