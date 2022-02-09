const { Schema, model } = require("mongoose");

const UserSchema = Schema({
  nombre: {
    type: String,
    required: [true, "El nombre es obligatorio"],
  },
  correo: {
    type: String,
    required: [true, "El correo es obligatorio"],
    unique: true,
  },
  pass: {
    type: String,
    required: [true, "La contraseña es obligatoria "],
  },
  img: String,
  rol: {
    type: String,
    required: true,
    emun: ["ADMIN_ROLE", "USER_ROLE"],
  },
  estado: {
    type: Boolean,
    default: true,
  },
  google: {
    type: Boolean,
    default: false,
  },
});

// Re escribir un metodo de mongoose - toJSON se ejecuta cuando alguna funcion javascript es ejecutada

UserSchema.methods.toJSON = function () {
  const { __v, pass, ...remainingUser } = this.toObject();

  return remainingUser;
};

module.exports = model("User", UserSchema);
