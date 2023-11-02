const authJwt = require("../middlewares/authjwt")

module.exports = app => {
    const products = require('../controller/product.controller');

    var router = require('express').Router();

    // Define a route that checks if the URL contains "/api"
    const apiRoute = router.use((req, res, next) => {
        console.log("URL "+req.originalUrl);
        if (req.originalUrl.includes('/api')) {
            console.log('URL contains "/api"');
            // You can perform additional actions here if needed
        } else {
            console.log('URL should contains "/api"')
        }
        // Continue to the next middleware or route
        next();
    });

    

    //router.get("/", [authJwt.verifyToken], products.showAll);
    router.get("/", products.showAll);
    /**
     * @swagger
     * /api/products:
     *   get:
     *      description: Used to get all products
     *      tags:
     *          - Get all products
     *      responses:
     *          '200':
     *              description: Resource added successfully
     *          '500':
     *              description: Internal server error
     *          '400':
     *              description: Bad request
     */
    router.post("/createProduct", products.create);
    router.put("/updateProduct/:id", products.update);
    router.delete("/deleteProduct/:id", products.delete);
    router.delete("/deleteAllProduct", products.deleteAll);

    app.use("/api/products", apiRoute);
}