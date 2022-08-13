const { response } = require("express");

const isAdmin = (req, res = response, next) => {
  if (!req.authUser) {
    return res.status(500).json({
      msg: "no se puede verificar rol sin verificar token primero",
    });
  }

  const { rol, nombre } = req.authUser;
  if (rol !== "ADMIN_ROLE") {
    return res.status(401).json({
      msg: `${nombre} no es administrador - no se puede realizar esta acción`,
    });
  }

  next();
};

// para recibir argumentos en mi middleware, tengo que recibirlos y luego retornar otra funcion con la funcionalidad que quiero que tenga
const useRoles = (...roles) => {
  return (req, res = response, next) => {
    if (!req.authUser) {
      return res.status(500).json({
        msg: "Se quiere verificar rol sin verificar token primero",
      });
    }

    if (!roles.includes(req.authUser.rol)) {
      return res.status(401).json({
        msg: `El servicio requiere uno de estos roles ${roles}`,
      });
    }

    next();
  };
};

module.exports = { isAdmin, useRoles };
