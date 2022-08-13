const { Role, User, Categories, Product } = require("../models");

/* Usuario */
const isValidRole = async (rol) => {
  const existRol = await Role.findOne({ rol });

  if (!existRol) throw new Error(`El rol ${rol} no existe`);
};

const emailExist = async (correo = "") => {
  const existEmail = await User.findOne({ correo });

  if (existEmail) return Promise.reject("Ese correo ya existe");
};

const existUserById = async (id) => {
  const existUser = await User.findById(id);

  if (!existUser || !existUser.estado) {
    throw new Error(`No existe un usuario con el id ${id}`);
  }
};

/* Categoria */

const existCategoryById = async (id) => {
  const category = await Categories.findById(id);

  if (!category || !category.estado) {
    throw new Error(`No existe una categoria con el id ${id}`);
  }
};

/* Product */

const existProductById = async (id) => {
  const product = await Product.findById(id);

  if (product) {
    throw new Error(`No existe un producto con el id ${id}`);
  }
};

module.exports = {
  isValidRole,
  emailExist,
  existUserById,
  existCategoryById,
  existProductById,
};
