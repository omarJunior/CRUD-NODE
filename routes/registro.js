const { Router } = require("express");

const { getRegistro, insertarRegistros } = require("../controllers/registro");

const router = Router();

router.get("/", getRegistro);

router.post("/", insertarRegistros)

module.exports = router;