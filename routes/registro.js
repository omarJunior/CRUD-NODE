const { Router } = require("express");

const { getRegistro, insertarRegistros, obtenerUsuariosById, actualizarDatos, deleteUsuarios } = require("../controllers/registro");

const router = Router();

router.get("/", getRegistro);

router.get("/:id", obtenerUsuariosById);

router.post("/", insertarRegistros)

router.put("/:id", actualizarDatos);

router.delete("/:id", deleteUsuarios);

module.exports = router;