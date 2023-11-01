const express = require('express')
const cors = require('cors')

const app = express();
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
//access API URL
app.get("/", (req, res) => {
    res.json({message:"Welcome"})
});
require("./routes/product.routes.js")(app);
require("./routes/cart.routes.js")(app);
console.log(process.env.PORT)
const PORT = 8084;
app.listen(PORT, ()=>{
    console.log(`Server is runnig on port ${PORT}`);
})



