const jwt = require('jsonwebtoken');

var config = require('../config/env');


module.exports = (req,res,next) => {
    const authHeaders = req.headers.authorization;
    if(!authHeaders) {
        res.status(401).json({message:"Not Authenticated"})
    }
    const token = req.headers.authorization.split(" ")[1];
    let decodedToken;
    try {
        decodedToken = jwt.verify(token,config.jwtAccessTokenSecret)
    } catch (err) {
       return res.status(401).json({message:err}).send();
    }

    
    if(!decodedToken) {
        res.status(401).json({message:"Not Authenticated"})
    }
    req.userid = decodedToken.userId;
    next();
}