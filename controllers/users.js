const { request, response } = require("express");
const User = require("../models/user");
const bcryptjs = require("bcryptjs");

const getUsers = async (req = request, res = response) => {
  const { limit = 5, start = 0 } = req.query;
  const query = { estado: true };

  const [total, user] = await Promise.all([
    User.countDocuments(query),
    User.find(query).limit(Number(limit)).skip(Number(start)),
  ]);

  res.json({ total, user });
};

const postUsers = async (req, res = response) => {
  const { nombre, pass, correo, rol } = req.body;
  const user = new User({ nombre, pass, correo, rol });

  // Encriptar password
  const salt = bcryptjs.genSaltSync();
  user.pass = bcryptjs.hashSync(pass, salt);

  // guardar
  await user.save();
  res.json({
    user,
  });
};

const putUsers = async (req, res = response) => {
  // edita los datos del id que le enviamos en la request
  const { id } = req.params;
  const { _id, google, pass, correo, ...rest } = req.body;

  if (pass) {
    const salt = bcryptjs.genSaltSync();
    rest.pass = bcryptjs.hashSync(pass, salt);
  }

  const user = await User.findByIdAndUpdate(id, rest, { new: true });

  res.json(user);
};

const patchUsers = (req, res = response) => {
  res.json({
    msg: "patch api/users - controllers",
  });
};

const deleteUsers = async (req, res = response) => {
  const { id } = req.params;

  const usuario = await User.findByIdAndUpdate(id, { estado: false });

  res.json({
    msg: "Eliminado correctamente",
    usuario,
  });
};

module.exports = {
  getUsers,
  postUsers,
  patchUsers,
  putUsers,
  deleteUsers,
};
