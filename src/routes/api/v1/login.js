/*
    Este archivo contiene todas las rutas que pertenecen a /login
*/
const path = require("path");
const express = require("express");
const router = express.Router();

const { authCtrl, checkErrorMessages } = require(path.join(__dirname, 'controller', 'index'));

// Obtiene el token que contiene el ID Security Type ID
router.get("/",
    authCtrl.checkQueryParams,
    checkErrorMessages,
    authCtrl.getUser,
    authCtrl.getToken
);

module.exports = router;