//Importar Node JS
const express = require('express');
const { dbConnection } = require('./database/config');
const cors = require('cors');
require('dotenv').config();



//console.log(process.env);

//Crear el servidor de express
const app= express();

//Base de Datos
dbConnection();

//CORS
app.use(cors());

//Directorio Publico
app.use(express.static('public'));


//Lectura y Parse de Body
app.use(express.json());

//Rutas
app.use('/api/auth', require('./routes/auth'));
app.use('/api/events', require('./routes/events'));


//Escuchar peticion
app.listen(process.env.PORT, ()=> {
    console.log(`Servidor corriendo en puerto ${process.env.PORT}`);
    
})
