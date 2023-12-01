const jwt = require("jsonwebtoken");
require("dotenv").config();

const createToken = ( id) =>{
    return jwt.sign({id},process.env.JWT_SECRET,{expiresIn: 3*24*60*60})
}

const requireAuth = (req,res,next) => {
    const token = req.cookies.jwt;
    if(token){
        jwt.verify(token, process.env.JWT_SECRET, (error, decodedToken) => {
            if(error){
                console.log(error.message);
                res.redirect('/login');
            } else {
                console.log(decodedToken);
                next();
            }
        })
    } else {
        console.log("token is undefined");
        res.redirect("/login");
    }
}

module.exports = {createToken, requireAuth};