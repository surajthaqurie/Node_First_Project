const UserService = require('../services/users.service');
const { validate } = require('../models/user');
const _ = require('lodash');
const bcrypt = require('bcrypt');

module.exports.getUser = async (req, res) => {
    UserService.getUser()
        .then(user => user ? res.send(user) : res.status(404).send('record not found'))
        .catch(err => console.log('error occured', err));
}
module.exports.postUser = async (req, res) => {
    const { error } = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);
    UserService.createUser(req.body)
        .then(user => user ? res.send(user) : res.status(404).send('Record cannot created'))
        .catch(err => console.log('Error Occured', err));
}
module.exports.putUser = async (req, res) => {
    const { error } = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);
    let user = _.pick(req.body, ['fullName', 'userName', 'email', 'address', 'password']);

    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(user.password, salt);
    let userId = req.params.id;

    UserService.updateUser(userId, user)
        .then(userObje => userObje ? res.json(userObje) : res.status(400).send('the given id is not found'))
        .catch(err => console.log('error occured', err));

}
module.exports.deleteUser = async (req, res) => {
    let userId = req.params.id;
    UserService.deleteUser(userId)
        .then(user => user ? res.json(user) : res.status(400).send('this user is not found..'))
        .catch(err => console.log('Error Occured', err));
}
module.exports.getUserById = async (req, res) => {
    let userId = req.params.id;
    UserService.getOneUser(userId)
        .then(user => user ? res.send(user) : res.status(400).send('the give user is not found..'))
        .catch(err => console.log('error occured', err));
}