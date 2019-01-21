const mongoose = require('mongoose');

module.exports = function () {
    mongoose.connect('mongodb://localhost/newApi', {
        useCreateIndex: true,
        useNewUrlParser: true
    })
        .then(() => console.log('Db Connected'))
        .catch(err => console.log('Dont Connected', err));
}