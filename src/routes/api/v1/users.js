/*
    Esta ruta perteneces a la información de los  /users.
*/
const path = require("path");
const express = require("express");
const router = express.Router();

const { checkErrorMessages, usersCtrl, authCtrl } = require(path.join(__dirname, "controller", "index"));


// Retorna la informacion del usuario
router.get("/",
    authCtrl.validateToken,
    authCtrl.adminAccessOnly,
    usersCtrl.getAllUsers
);

// Crea un nuevo usuario
router.post("/",
    [
        usersCtrl.checkBodyNewUser,
        checkErrorMessages
    ],
    usersCtrl.createNewUser
);

// Retorna informacion de usuario
router.get("/:id",
    authCtrl.validateToken,
    [
        usersCtrl.checkParamIdUser,
        usersCtrl.checkOwnUserData,
        checkErrorMessages
    ],
    usersCtrl.getOneUser
);

// Actualiza usuario
router.put("/:id",
    authCtrl.validateToken,
    [
        usersCtrl.checkParamIdUser,
        usersCtrl.checkOwnUserData,
        usersCtrl.checkBodyUpdateUser,
        checkErrorMessages
    ],
    usersCtrl.updateUser
);

// Elimina usuario
router.delete("/:id",
    authCtrl.validateToken,
    authCtrl.adminAccessOnly,
    [
        usersCtrl.checkParamIdUser,
        checkErrorMessages
    ],
    usersCtrl.deleteUser
);

// Obtiene el plato favorito
router.get("/:id/dishes",
    authCtrl.validateToken,
    [
        usersCtrl.checkParamIdUser,
        usersCtrl.checkOwnUserData,
        checkErrorMessages
    ],
    usersCtrl.getFavouriteDishes
);


module.exports = router;