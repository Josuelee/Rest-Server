const { Router } = require("express");
const router = Router();
const {
  getUsers,
  postUsers,
  patchUsers,
  putUsers,
  deleteUsers,
} = require("../controllers/users");

router.get("/", getUsers);

router.post("/", postUsers);

router.patch("/", patchUsers);

router.put("/:id", putUsers);

router.delete("/", deleteUsers);

module.exports = router;
