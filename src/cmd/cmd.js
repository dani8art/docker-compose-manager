/*!
docker-composer-manager 0.1.3, built on: 2017-10-30
Copyright (C) 2017 Daniel Arteaga
http://darteaga.com
https://github.com/dani8art/docker-compose-manager

This program is free software: you can redistribute it and/or modify
it under the terms of the GNU General Public License as published by
the Free Software Foundation, either version 3 of the License, or
(at your option) any later version.

This program is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
GNU General Public License for more details.

You should have received a copy of the GNU General Public License
along with this program.  If not, see <http://www.gnu.org/licenses/>.*/


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