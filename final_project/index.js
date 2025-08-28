const express = require('express');
const jwt = require('jsonwebtoken');
const session = require('express-session')
const customer_routes = require('./router/auth_users.js').authenticated;
const general_routes = require('./router/general.js').general;

const app = express();
app.set('etag', false);
const jwt_secret = 'SuperSecretK3y123@!$';

app.use(express.json());

app.use("/customer", session({ secret: "fingerprint_customer", resave: true, saveUninitialized: true }))

app.use("/customer/auth/*", function auth(req, res, next) {
    // if (typeof req.session.authorization !== 'undefined') {
    //     jwt.verify(req.session.authorization['accessToken'],
    //         jwt_secret,
    //         (err, user) => {
    //             if (err) return res.status(401).json({ message: "You are not authenticated!" })
    //             req.user = user
    //             next()
    //         })
    // }

    // return res.status(401).json({ message: "You are not authenticated!2" })
    next()
});

const PORT = 5000;

app.use("/customer", customer_routes);
app.use("/", general_routes);

app.listen(PORT, () => console.log("Server is running"));
