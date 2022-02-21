const bcryptjs = require("bcryptjs");
const { response } = require("express");
const { generarTOKEN } = require("../helpers/generate-jwt");

const User = require("../models/user");

const login = async (req, res = response) => {
  const { correo, pass } = req.body;

  try {
    //Verificar si el correo existe en la DB
    const user = await User.findOne({ correo });

    if (!user) {
      return res.status(400).json({
        msg: "Usuario / Password no coinciden - correo",
      });
    }

    //Verificar si el usuario esta activo

    if (!user.estado) {
      return res.status(400).json({
        msg: "Usuario / Password no coinciden - estado:false",
      });
    }

    //Verificar si la contraseña coincide con la del correo

    const validPassword = bcryptjs.compareSync(pass, user.pass);
    if (!validPassword) {
      return res.status(400).json({
        msg: "Usuario / Password no coinciden - password",
      });
    }

    // Generar el JWT

    const token = await generarTOKEN(user._id);

    res.json({
      user,
      token,
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      msg: "Hable con administrador",
    });
  }
};

module.exports = {
  login,
};
