const express = require('express')
const router = express.Router();
const inventario = require('../controllers/inventarioController')

router.get('/', inventario.obtenerInventario)
router.post('/', inventario.crearInventario)
router.get('/:id', inventario.obtenerInventarioPorID)
router.delete('/:id', inventario.eliminarInventario)
router.put('/:id', inventario.actualizarInventario)
module.exports = router

