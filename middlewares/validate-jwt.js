const jwt = require("jsonwebtoken");
const { request, response } = require("express");
const User = require("../models/user");

const validateJWT = async (req = request, res = response, next) => {
  const token = req.header("x-token");

  if (!token) {
    return res.status(401).json({
      msg: "No hay token en la peticion",
    });
  }

  try {
    // Verificar si el token es valido, sin alteraciones o algo asi - devolvera el uid del usuario autenticado correctamente
    const { uid } = jwt.verify(token, process.env.SECRETORPRIVATEKEY);

    // obtener informacion usuario autenticado
    const authUser = await User.findById(uid);

    if (!authUser) {
      return res.status(401).json({
        msg: "Token no válido - Usuario no existe en DB",
      });
    }

    // Verificar si el uid tiene estado true

    if (!authUser.estado) {
      return res.status(401).json({
        msg: "Token no válido - Usuario con estado: false",
      });
    }

    req.authUser = authUser;

    next();
  } catch (error) {
    console.log(error);
    res.status(401).json({
      msg: "Token no válido",
    });
  }
};

module.exports = {
  validateJWT,
};
