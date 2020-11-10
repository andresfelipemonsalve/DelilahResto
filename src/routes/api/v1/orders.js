/*
    Este archivo contiene las rutas de las ordenes /orders.
*/
const path = require("path");
const express = require("express");
const router = express.Router();

const { checkErrorMessages, ordersCtrl, authCtrl } = require(path.join(__dirname, "controller", "index"));


/* PATHS */

/*
Lista todas las ordenes.
De acuerdo a la documentacion establecida en la fecha, 
AT query param: Filtra las ordenes por fecha especifica
            UNION
BEFORE query param: Filtra las ordenes antes de igualar cierta fecha.
            AND
AFTER query param: Filtra las oredenes despues de igualar cierta fecha.

La fecha deberia cumplir el estandar ISO YYYY-MM-DD
*/
router.get("/",
    authCtrl.validateToken,
    authCtrl.adminAccessOnly,
    [
        ordersCtrl.checkQueryTimeFilters,
        checkErrorMessages
    ],
    ordersCtrl.getOrders
);

// Create a new order
router.post("/",
    authCtrl.validateToken,
    [
        ordersCtrl.checkBodyNewOrder,
        checkErrorMessages
    ],
    ordersCtrl.createNewOrder
);

// Return order status USER
router.get("/:id",
    authCtrl.validateToken,
    [
        ordersCtrl.checkParamOrderId,
        ordersCtrl.checkOwnUserData,
        checkErrorMessages
    ],
    ordersCtrl.getOrder
);

// Update status of the order
router.put("/:id",
    authCtrl.validateToken,
    authCtrl.adminAccessOnly,
    [
        ordersCtrl.checkParamOrderId,
        ordersCtrl.checkQueryState,
        checkErrorMessages
    ],
    ordersCtrl.updateStatus
);

// Delete order
router.delete("/:id",
    authCtrl.validateToken,
    authCtrl.adminAccessOnly,
    [
        ordersCtrl.checkParamOrderId,
        checkErrorMessages
    ],
    ordersCtrl.deleteOrder
);

module.exports = router;