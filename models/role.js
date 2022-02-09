const { Schema, model } = require("mongoose");

const roleSchema = Schema({
  rol: {
    type: String,
    required: [true, "Tiene que ingresar el rol"],
  },
});

module.exports = model("Role", roleSchema);
