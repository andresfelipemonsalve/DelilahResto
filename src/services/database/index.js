const path = require('path');
// Comunicación con la DB
const { Sequelize } = require('sequelize');
const conn = require(path.join(__dirname, 'config', 'index'));

const sequelize = new Sequelize({
    database: conn.DATABASE,
    dialect: conn.DIALECT,
    host: conn.HOST,
    password: conn.PASSWORD,
    port: conn.PORT,
    timezone: conn.TIMEZONE, // Hora local para la base de datos
    username: conn.USERNAME,
    logging: false,
    // para leer fechas correctamente de la base de datos
    useUTC: false, //para leer de la base de datos
    dialectOptions: {
        dateStrings: true,
        typeCast: true,
    },
});

// Asegura la sincronizacion entre base de datos y modelo
require('./model/index');

module.exports = { sequelize };