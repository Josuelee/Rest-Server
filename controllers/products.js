const { response } = require("express");
const { Product } = require("../models");

const saveProduct = async (req, res = response) => {
  try {
    const { estado, usuario, nombre, ...data } = req.body;

    data.nombre = nombre.toUpperCase();

    const validateProduct = await Product.findOne({ nombre: data.nombre });

    if (validateProduct) {
      return res.json({
        msg: "Ya existe ese producto",
      });
    }

    data.usuario = req.authUser.id;
    console.log("Quiero ver la data", data);

    const product = new Product(data);
    await product.save();

    res.json({
      msg: "Guardado correctamente",
      product,
    });
  } catch (err) {
    res.json({
      errors: err,
    });
  }
};

const getProduct = async (req, res = response) => {};
const getOneProduct = async (req, res = response) => {};
const updateProduct = async (req, res = response) => {};
const deleteProduct = async (req, res = response) => {};

module.exports = {
  saveProduct,
  getProduct,
  getOneProduct,
  updateProduct,
  deleteProduct,
};
