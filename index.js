/*
    INICIO
*/
require('dotenv').config();                 // Se activa la frase

// Construyen librerias nodejs
const path = require("path");

/* Configuracion servidor*/
// inicializando...
const express = require("express");
const app = express();
const PORT = process.env.PORT || 3000;      // en caso que el puerto se pierda lo reemplaza el 3000.

/* Middlewares */
// Middleware - Body parser
app.use(express.json());
// Middleware - Console logger
app.use(require(path.join(__dirname, "src", "middlewares", "logger.js")));

/* Routes */
// Master route
app.use(require(path.join(__dirname, "src", "routes", "routes.js")));
// cuaquier otra solicitud se responderá con estatus 404
app.all("*", (req, res) => res.sendStatus(404));

// Error generico
app.use((err, req, res, next) => {
    if (!err) return next();
    console.log("An error has occurred", err);
    res.status(500).json(err.message);
    throw err;
});

// conexiones a la base de datos
const { sequelize } = require(path.join(__dirname, 'src', 'services', 'database', 'index'));
// Chequea si puede conectar con el servidor
sequelize.authenticate()
    // conexión exitosa
    .then(() => {
        // inicializa el servidor
        app.listen(PORT, () => {
            console.log(`${new Date().toLocaleString()} -- Server is up and listening to port ${PORT}`)
        });
    })
    // error fallo servidor
    .catch(error => {
        console.error("Error authenticating DB", error);
    });