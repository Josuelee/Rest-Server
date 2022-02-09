// los middlewares son funciones que se ejecutan antes de un codigo u otro middleware

// los middlewares pueden recibir de parametro req,res y reciben una funcion como tercer parametro llamado next, este se usa para decir "ahora pasa al siguiente middleware o lee las siguientes lineas de codigo" es decir ejecutamos todo el codigo de nuestro middleware y cuando ya no queremos que se ejecute algo mas se utiliza el next

const { validationResult } = require("express-validator");

const fieldsValidate = (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json(errors);
  }

  next();
};

module.exports = {
  fieldsValidate,
};
