const { Router } = require("express");
const { body } = require("express-validator");
const { createCategory, getCategories } = require("../controllers/categories");
const { fieldsValidate } = require("../middlewares/validate-fields");
const { validateJWT } = require("../middlewares/validate-jwt");

const router = Router();

// Obtener categorias - publico
router.get("/", getCategories);

// Obtener una categoria por id - publico
router.get("/:id", (req, res) => {
  res.json("get - id");
});

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
router.put("/:id", (req, res) => {
  res.json("put");
});

// Eliminar catetegoria - Privado: Solo administrador
router.delete("/:id", (req, res) => {
  res.json("delete");
});

module.exports = router;
