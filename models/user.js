
const Joi = require('joi');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const fs = require('fs');
const path = require('path');

const userSchema = new mongoose.Schema({
    fullName: {
        type: String,
        minlength: 5,
        maxlength: 50,
        trim: true,
        required: true
    },
    userName: {
        type: String,
        minlength: 5,
        trim: true,
        maxlength: 50,
        required: true,
        unique: true
    },
    email: {
        type: String,
        minlength: 5,
        trim: true,
        maxlength: 50,
        required: true,
        unique: true
    },
    address: {
        type: String,
        minlength: 5,
        trim: true,
        maxlength: 50,
        required: true
    },
    password: {
        type: String,
        minlength: 6,
        maxlength: 250,
        trim: true,
        required: true
    },
    isAdmin: {
        type: Boolean,
        default: false
    }
});
userSchema.methods.generateAuthToken = function () {
    var payload = { _id: this._id, isAdmin: this.isAdmin };
    var privateKeyPath = path.join(__dirname, '../config/private.key');
    var privateKey = fs.readFileSync(privateKeyPath, 'utf8');
    // console.log('private key:' +privateKey);
    var i = 'Mysoft corp';
    var s = 'some@user.com';
    var a = 'http://mysoftcorp.in';

    var signOption = {
        issuer: i,
        subject: s,
        audience: a,
        expiresIn: "12h",
        algorithm: "RS256"
    };
    var token = jwt.sign(payload, privateKey, signOption);
    console.log('token:' + token);
    return token;
}
const User = mongoose.model('User', userSchema);

function validateUser(user) {
    const schema = {
        fullName: Joi.string().min(5).max(50).required(),
        userName: Joi.string().min(5).max(50).required(),
        email: Joi.string().min(5).max(50).required().email(),
        address: Joi.string().min(5).max(50).required(),
        password: Joi.string().min(5).max(50).required(),
    };
    return Joi.validate(user, schema);
}

exports.validate = validateUser;
exports.User = User;