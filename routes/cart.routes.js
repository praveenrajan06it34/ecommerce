const authJwt = require("../middlewares/authjwt")
module.exports = app => {
    const cart = require('../controller/cart.controller');

    var router = require('express').Router();

    router.get("/", [authJwt.verifyToken], cart.showAll);
    router.post("/createCart", cart.insertProductIntoCart);
    router.put("/updateCart/:id/:quantity", cart.updateCart);
    router.delete("/deleteCart/:id", cart.deleteCartById);
    router.delete("/deleteAllCart", cart.deleteAllCarts);

    app.use("/api/cart", router);
}