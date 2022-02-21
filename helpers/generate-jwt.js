const jwt = require("jsonwebtoken");

const generarTOKEN = (uid) => {
  return new Promise((resolve, reject) => {
    const payload = { uid };
    const options = {
      expiresIn: "4h",
    };

    jwt.sign(payload, process.env.SECRETORPRIVATEKEY, options, (err, token) => {
      if (err) {
        console.log(err);
        reject("No se pudo generar el token");
      } else {
        resolve(token);
      }
    });
  });
};

module.exports = {
  generarTOKEN,
};
