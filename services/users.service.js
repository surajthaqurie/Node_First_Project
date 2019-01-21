const { User } = require('../models/user');
const _ = require('lodash');
const bcrypt = require('bcrypt');

module.exports.getUser = async (data) => {
    const user = await User.find().sort('name');
    return user;
}
module.exports.createUser = async (data) => {
    let user = await User.findOne({ email: data.email });
    if (user) return res.status(400).send('the user is already registerd');
    user = new User(_.pick(data, ['fullName', 'userName', 'email', 'address', 'password']));
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(user.password, salt);
    await user.save();
    const token = user.generateAuthToken();
    return { token, user };
}
module.exports.updateUser = async (id, data) => {
    let user = await User.findOneAndUpdate({ _id: id }, data,
        {
            new: true
        });
    return user;
}
module.exports.deleteUser = async (id) => {
    let user = await User.findOneAndDelete({ _id: id });
    return user;
}
module.exports.getOneUser = async (id) => {
    let user = await User.findOne({ _id: id });
    return user;
}