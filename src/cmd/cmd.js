'use strict';

/**
 * Command line interface 
 * @module docker-compose-manager/cmd
 */

var spawn = require('child_process').spawn,
    Promise = require('bluebird');

module.exports = {
    /**
     * Method for execute command
     * @param {string} command - The command to be executed.
     * @param {object} options - Options object.
     * @return {Promise} A promise.
     */
    execCommand: (command, options) => {
        return new Promise((resolve, reject) => {
            var cmd;
            try {
                cmd = spawn(command, options);
                resolve(cmd);
            } catch (e) {
                reject(e);
            }
        });
    }
};