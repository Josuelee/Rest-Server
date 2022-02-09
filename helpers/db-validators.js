const Role = require("../models/role");
const User = require("../models/user");

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

  if (!existUser) {
    throw new Error(`No existe un usuario con el id ${id}`);
  }
};

module.exports = {
  isValidRole,
  emailExist,
  existUserById,
};
