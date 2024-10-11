const express = require('express');
const cors = require('cors');
const inventarioR = require('./src/routes/inventarioRoute');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: true}))

app.use('/api/inventario', inventarioR); 

app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
