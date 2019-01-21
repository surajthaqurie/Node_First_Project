const jwt = require('jsonwebtoken');
const path = require('path');
const fs = require('fs');

function auth(req, res, next) {
    const token = req.header('x-auth-token');
    var publicKeyPath = path.join(__dirname, '../config/public.key');
    var publicKey = fs.readFileSync(publicKeyPath, 'utf8');
    // console.log('public key:' +publicKey);

    var i = 'Mysoft corp';
    var s = 'some@user.com';
    var a = 'http://mysoftcorp.in';

    var verifyOption = {
        issuer: i,
        subject: s,
        audience: a,
        expiresIn: "12h",
        algorithm: ["RS256"]
    };
    if (!token) return res.status(401).send('Access denied. No token Provided..');

    try {
        const legit = jwt.verify(token, publicKey, verifyOption);
        req.user = legit;
        console.log(req.user.isAdmin);
        next();
    } catch (ex) {
        res.status(400).send('Invalid user');
    }
};

module.exports = auth;