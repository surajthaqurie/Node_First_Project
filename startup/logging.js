const { transports, createLogger } = require('winston');
require('winston-mongodb');
require('express-async-errors');

module.exports = function () {
    process.on('unhandledRejection', (ex) => {
        throw ex;
    });
    const logger = createLogger({
        level: 'error',
        transports: [
            new transports.File({ filename: 'error.log', level: 'error' }),
            new transports.MongoDB({ db: 'mongodb://localhost/newApi' })
        ],
        exceptionHandlers: [
            new transports.File({ filename: 'uncaughtExeption.log', }),
            new transports.Console({ colorize: true, prettyPrint: true })
        ],
        exitOnError: false
    });
    module.exports.logger = logger;
}