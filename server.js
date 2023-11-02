const express = require('express')
const cors = require('cors')
const logger  =require('./logger/loggerservice.js')
const product  =require('./routes/product.routes.js')
const app = express();

const swaggerJsdoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");
const bodyParser = require("body-parser");

app.use(bodyParser.json());

/** Swagger Initialization - START */
const swaggerOption = {
  swaggerDefinition: (swaggerJsdoc.Options = {
    info: {
      version : "3.0.0",
      title: "eCommerce",
      description: "API documentation",
      contact: {
        name: "Developer",
      },
      servers: ["http://localhost:8084/"],
    },
  }),
  apis: ["server.js", "./routes/*.js"],
};

const swaggerDocs = swaggerJsdoc(swaggerOption);
app.use("/rest-api", swaggerUi.serve, swaggerUi.setup(swaggerDocs));
/** Swagger Initialization - END */

// Access API URL
const db = require('./model')
app.use(express.json());
db.mongoose.connect(db.url,{
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => {
    console.log("Connected to the DB")
})
.catch(err => {
    console.log("Unable to Connect to the DB")
    process.exit();
})

app.use((req, res, next) => {
    logger.info(`Recieved a ${req.method} request for ${req.url}`);
    next();
})

//access API URL
app.get("/", (req, res) => {
    logger.log("info", "This is an info message");
    res.json({message:"Welcome"})
});

app.use((err, req, res, next) => {
    logger.error(err.message);
    res.status(500).send();
});

require("./routes/product.routes.js")(app);
require("./routes/cart.routes.js")(app);
require("./routes/auth.routes.js")(app);

app.use(function(req, res, next) {
    res.header(
        "Access-Control-Allow-Headers",
        "x-access-token, Origin, Content-Type, Accept"
    );
});



console.log(process.env.PORT)
const PORT = 8084;
app.listen(PORT, ()=>{
    console.log(`Server is runnig on port ${PORT}`);
})



