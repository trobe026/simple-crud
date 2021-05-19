const jwt = require('jsonwebtoken');
const User = require('mongoose').model('User');
const config = require('../config/config.json');

/**
 *  The Auth Checker middleware function.
 */
module.exports = (req, res, next) => {
    if (!req.headers.authorization) {
        return res.status(401).end();
    }
    console.log(req.headers);

    // get the token-value
    const token = req.headers.authorization.split(' ')[1];

    // decode the token using a secret key-phrase
    return jwt.verify(token, config.jwtSecret, (err, decoded) => {
        console.log(token);
        // the 401 code is for unauthorized status
        if (err) { return res.status(401).end(); }

        const userId = decoded.sub;

        // check if a user exists
        return User.findById(userId, (userErr, user) => {
            if (userErr || !user) {
                return res.status(401).end();
            }
            // pass user details onto next route
            req.user = user;
            // console.log(req.user.type)
            return next();
        });
    });
};