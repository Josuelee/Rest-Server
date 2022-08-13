const { response } = require("express");
const { Categories } = require("../models");

const getCategories = async (req, res = response) => {
  try {
    const { limit = 5, start = 0 } = req.query;
    let filter = true;

    const [categories, total] = await Promise.all([
      Categories.find({ estado: filter })
        .limit(limit)
        .skip(start)
        .populate("usuario", "nombre"),
      Categories.countDocuments({ estado: filter }),
    ]);

    res.json({
      total,
      categories,
    });
  } catch (error) {
    res
      .status(500)
      .json({ error: true, msg: "Ocurrio un error, hable con administrador" });
  }
};

const getCategory = async (req, res = response) => {
  try {
    const { id } = req.params;

    const category = await Categories.findById(id).populate(
      "usuario",
      "nombre"
    );

    res.json({
      category,
    });
  } catch (error) {
    res
      .status(500)
      .json({ error: true, msg: "Ocurrio un error, hable con administrador" });
  }
};

const createCategory = async (req, res = response) => {
  try {
    const nombre = req.body.nombre.toUpperCase();

    const existCategories = await Categories.findOne({ nombre });

    if (existCategories) {
      return res.status(400).json({
        msg: `La categoria ${existCategories.nombre} ya existe`,
      });
    }

    const data = {
      nombre,
      usuario: req.authUser._id,
    };

    const category = new Categories(data);
    await category.save();

    res.status(201).json({
      category,
    });
  } catch (error) {
    res
      .status(500)
      .json({ error: true, msg: "Ocurrio un error, hable con administrador" });
  }
};

const updateCategory = async (req, res = response) => {
  try {
    const { id } = req.params;
    const { estado, usuario, ...data } = req.body;

    data.nombre = data.nombre.toUpperCase();
    data.usuario = req.authUser.id;

    const existName = await Categories.findOne({ nombre: data.nombre });

    if (existName) {
      return res
        .status(400)
        .json({ msg: `El nombre ${data.nombre} ya existe` });
    }

    const category = await Categories.findByIdAndUpdate(id, data, {
      new: true,
    });

    res.json({ msg: "Actualizado correctamente", category });
  } catch (error) {
    res.status(500).json({
      error: true,
      msg: "Error del servidor, hable con administrador!",
    });
  }
};

const deleteCategory = async (req, res = response) => {
  try {
    const { id } = req.params;

    const category = await Categories.findByIdAndUpdate(
      id,
      { estado: false },
      { new: true }
    );
    res.json({ msg: "Eliminado correctamente", category });
  } catch (error) {
    res.status(500).json({
      error: true,
      msg: "Error del servidor, hable con administrador!",
    });
  }
};

module.exports = {
  createCategory,
  getCategories,
  getCategory,
  updateCategory,
  deleteCategory,
};
