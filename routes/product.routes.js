module.exports = app => {
    const products = require('../controller/product.controller');

    var router = require('express').Router();

    router.get("/", products.showAll);
    router.post("/createProduct", products.create);
    router.put("/updateProduct/:id", products.update);
    router.delete("/deleteProduct/:id", products.delete);
    router.delete("/deleteAllProduct", products.deleteAll);

    app.use("/api/products", router);
}