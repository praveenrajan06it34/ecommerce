const jwt = require('jsonwebtoken');
const config = require("../config/auth.config");

exports.verifyToken = (req, res, next) => {
    let token = req.headers['x-access-token']; // for bearer token we need to use bearer-token

    if(!token) {
        return res.status(403)
        .send({message: "No token provide!"});
    }

    jwt.verify(token, config.secret, (err, decoded)=>{
        if(err) {
            console.error("Invalid Token")
            return res.status(401).send({
                message: "Unauthorized"
            });
        }
        console.log("Decoded: "+decoded);
        next();
    });
    
}