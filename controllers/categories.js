const { response } = require("express");
const { Categories } = require("../models");

const getCategories = async (req, res = response) => {
  let filter = true;

  const { limit = 5, start = 0 } = req.query;

  const [categories, total] = await Promise.all([
    Categories.find({ estado: filter })
      .limit(limit)
      .skip(start)
      .populate("usuario"),
    Categories.countDocuments({ estado: filter }),
  ]);

  res.json({
    total,
    categories,
  });
};

const getCategory = async (req, res = response) => {
  const { id } = req.params;
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
      usuario: req.authUser.id,
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

module.exports = {
  createCategory,
  getCategories,
};
