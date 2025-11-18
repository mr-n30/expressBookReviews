const express = require('express');
const jwt = require('jsonwebtoken');
const session = require('express-session')
const customer_routes = require('./router/auth_users.js').authenticated;
const genl_routes = require('./router/general.js').general;
const jwt_secret = 'SuperSecretK3y123@!$';

const app = express();

app.use(express.json());

app.use("/customer",session({secret:"fingerprint_customer",resave: true, saveUninitialized: true}))

app.use("/customer/auth/*", function auth(req,res,next){
    const auth = req.session && req.session.authorization
    if(!auth || !auth.accessToken) {
        return res.status(401).json({message: "Not logged in!"})
    }
    
    try {
        jwt.verify(auth.accessToken, jwt_secret)
        next()
    } catch (err) {
        return res.status(400).json({message: err})
    }
});
 
const PORT = 1337;

app.use("/customer", customer_routes);
app.use("/", genl_routes);

app.listen(PORT,()=>console.log("Server is running"));
