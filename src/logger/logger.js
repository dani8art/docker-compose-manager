'use strict';

/**
 * Command line interface 
 * @module docker-compose-manager/logger
 */

var winston = require('winston');

/**
 * Configure here your custom levels.
 * */
var customLeves = {
    levels: {
        error: 7,
        warning: 8,
        custom: 9,
        info: 12,
        debug: 13
    },
    colors: {
        error: 'red',
        warning: 'yellow',
        custom: 'magenta',
        info: 'white',
        debug: 'black'
    }
};

winston.emitErrs = true;

var logger = new winston.Logger({
    levels: customLeves.levels,
    colors: customLeves.colors,
    transports: [
        new winston.transports.Console({
            level: 'info',
            handleExceptions: true,
            json: false,
            colorize: true,
            timestamp: true
        })
    ],
    exitOnError: false
});

/*
 * Export functions and Objects
 */
module.exports = logger;