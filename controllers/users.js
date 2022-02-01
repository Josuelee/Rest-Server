const { request, response } = require("express");

const User = require("../models/user");

const getUsers = (req = request, res = response) => {
  const {
    q = "no query",
    name = "no name",
    age = "no age",
    page = 1,
    limit = 10,
  } = req.query;

  res.json({
    msg: "get api/users - controllers",
    q,
    name,
    age,
    page,
    limit,
  });
};

const postUsers = async (req, res = response) => {
  // esto no funciona sin el middleware de express.json() - acceder al body de la peticion
  const body = req.body;

  const user = new User(body);

  await user.save();

  res.json({
    msg: "post api/users - controllers",
    user,
  });
};

const patchUsers = (req, res = response) => {
  res.json({
    msg: "patch api/users - controllers",
  });
};

const putUsers = (req, res = response) => {
  const { id } = req.params;
  res.json({
    msg: "put api/users - controllers",
    id,
  });
};

const deleteUsers = (req, res = response) => {
  res.json({
    msg: "delete api/users - controllers",
  });
};

module.exports = {
  getUsers,
  postUsers,
  patchUsers,
  putUsers,
  deleteUsers,
};
