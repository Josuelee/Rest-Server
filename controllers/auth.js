const bcryptjs = require("bcryptjs");
const { response } = require("express");
const { generarTOKEN } = require("../helpers/generate-jwt");
const { googleVerify } = require("../helpers/google-verify");

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

const googleSignIn = async (req, res = response) => {
  const { id_token } = req.body;

  try {
    const { nombre, correo, img } = await googleVerify(id_token);

    let user = await User.findOne({ correo });

    if (!user) {
      // Tengo que crearlo

      const data = {
        nombre,
        rol: "USER_ROLE",
        correo,
        pass: ":P",
        img,
        google: true,
      };

      user = new User(data);
      await user.save();
    }

    if (!user.estado) {
      return res.status(401).json({
        msg: "Hable con el administrador - Usuario bloqueado",
      });
    }

    const token = await generarTOKEN(user.id);

    res.json({
      msg: "Todo salio bien!!",
      user,
      token,
    });
  } catch (error) {
    res.status(400).json({
      msg: "Token de google no valido",
    });
    console.log(error);
  }
};

module.exports = {
  login,
  googleSignIn,
};
