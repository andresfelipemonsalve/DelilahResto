/*
    Maestro de rutas
*/
const path = require("path");
const express = require("express");
const router = express.Router();

/* Rutas */
const url_routes_v1 = "/api/v1";
const path_routes_v1 = path.join(__dirname, "api", "v1");

// Rutas de platos
router.use(url_routes_v1 + "/dishes",
    require(path.join(path_routes_v1, "dishes.js")));

// Rutas de login
router.use(url_routes_v1 + "/login",
    require(path.join(path_routes_v1, "login.js")));

// Rutas de ordenes
router.use(url_routes_v1 + "/orders",
    require(path.join(path_routes_v1, "orders.js")));

// Rutas de usuarios
router.use(url_routes_v1 + "/users",
    require(path.join(path_routes_v1, "users.js")));

    
module.exports = router;