const fs = require('fs').promises

const obtenerInventario = async (req, res) => {
    try {

        const data = await fs.readFile('datos.json', 'utf-8')
        console.log('contenido del archivo:', data);
        res.json(JSON.parse(data));

    } catch (error) {

        res.status(500).json({ message: 'Error al obtener inventario', error })

    }
}

const obtenerInventarioPorID = async (req, res) => {
    try {
        const data = await fs.readFile('datos.json', 'utf-8');
        const parsedData = JSON.parse(data);

        const { id } = req.params;

        const invent = parsedData.inventario.find(
            (invent) => invent.id === parseInt(id)
        );

        if (!invent) {
            return res.status(404).json({ message: "Producto no encontrado" });
        }

        res.json(invent);

    } catch (error) {
        res.status(500).json({ message: "Error al obtener el producto", error });
    }
};

const crearInventario = async (req, res) => {
    const { categoria, nombre, cantidad, tipo, precio } = req.body;
    try {
        const data = await fs.readFile('datos.json', 'utf-8');

        const inv = JSON.parse(data);

        const nuevoInventario = {
            id: inv.inventario.length + 1,
            categoria,
            nombre,
            cantidad,
            tipo,
            precio
        };

        inv.inventario.push(nuevoInventario);
        console.log(nuevoInventario)
        await fs.writeFile('datos.json', JSON.stringify(inv, null, 2), 'utf-8');

        res.status(201).json(nuevoInventario);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error al crear inventario', error });
    }
};

const eliminarInventario = async (req, res) => {
    const { id } = req.params;

    try {
        const data = await fs.readFile('datos.json', 'utf-8');
        const inv = JSON.parse(data);

        const index = inv.inventario.findIndex(i => i.id === parseInt(id, 10));

        if (index === -1) {
            return res.status(404).json({ message: 'Producto no encontrado' });
        }

        inv.inventario.splice(index, 1);

        await fs.writeFile('datos.json', JSON.stringify(inv, null, 2), 'utf-8');
        
        res.status(204).send('Eliminado con exito');
    } catch (error) {
        console.error(error); 
        res.status(500).json({ message: 'Error al eliminar el producto', error });
    }
};



const actualizarInventario = async (req, res) => {
    try {
        const data = await fs.readFile('datos.json', 'utf-8');
        const inv = JSON.parse(data);

        const {id} = req.params
        const { categoria, nombre, cantidad, tipo, precio} = req.body;
        const inventarioIndex = inv.inventario.findIndex(
            (inventario) => inventario.id === parseInt(id)
        )
        if (categoria) {
            inv.inventario[inventarioIndex].categoria = categoria
        }
        if (nombre) {
            inv.inventario[inventarioIndex].nombre = nombre
        }
        if (cantidad) {
            inv.inventario[inventarioIndex].cantidad = cantidad
        }
        if (tipo) {
            inv.inventario[inventarioIndex].tipo = tipo
        }
        if (precio) {
            inv.inventario[inventarioIndex].precio = precio
        }

        await fs.writeFile('datos.json', JSON.stringify(inv, null, 2), 'utf-8')
        res.status(200).json({message: "producto actualizado correctamente"})
    } catch (error) {
        console.error("Error al actualizar producto")
        res.status(500).json({message: "error interno del servidor"})
    }
}


module.exports = {
    obtenerInventario,
    obtenerInventarioPorID,
    crearInventario,
    eliminarInventario,
    actualizarInventario
}
