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
 * @module docker-compose-manager/docker-compose-manager
 */

var cmd = require('./cmd/cmd');

module.exports = {
    /**
     * Docker compose up command. This up a docker-compose.yaml given
     * @param {string} file - The file with docker-componse that will be upped.
     * @param {object} options - Options object.
     * @return {Promise} A promise.
     */
    dockerComposeUp: dockerComposeUp,

    /**
     * Docker compose down command. This down a docker-compose.yaml given
     * @param {string} file - The file with docker-componse that will be down.
     * @param {object} options - Options object.
     * @return {Promise} A promise.
     */
    dockerComposeDown: dockerComposeDown,

    /**
     * Docker compose stop command. This stop a docker-compose.yaml given
     * @param {string} file - The file with docker-componse that will be stopped.
     * @param {object} options - Options object.
     * @return {Promise} A promise.
     */
    dockerComposeStop: dockerComposeStop,

    /**
     * Docker compose start command. This start a docker-compose.yaml given
     * @param {string} file - The file with docker-componse that will be started.
     * @param {object} options - Options object.
     * @return {Promise} A promise.
     */
    dockerComposeStart: dockerComposeStart,

    /**
     * Docker exec command. This execute a command on the container given
     * @param {string} container - The container where the command will be executed.
     * @param {object} exec_command - The command will be executed
     * @param {string} options - Options object.
     * @return {Promise} A promise.
     */
    dockerExec: dockerExec,

    /**
     * This method return the IP of a container given
     * @param {string} container - The container that will be inspected.
     * @param {string} options - Options object. options.network
     * @return {Promise} A promise.
     */
    dockerInspectIPAddressOfContainer: dockerInspectIPAddressOfContainer,

    /**
     * This method return the PORT of a container given
     * @param {string} container - The container that will be inspected.
     * @param {string} options - Options object. options.network
     * @return {Promise} A promise.
     */
    dockerInspectPortOfContainer: dockerInspectPortOfContainer
};

function dockerComposeUp(file, options) {
    return new Promise((resolve, reject) => {
        options = options ? options : [];
        var command = 'docker-compose';

        var defaultOptions = ['-f', file, 'up', '-d'];
        if (options.indexOf('--abort-on-container-exit') > -1) {
            defaultOptions = ['-f', file, 'up'];
        }

        var arg = defaultOptions.concat(options);

        var out = "";
        cmd.execCommand(command, arg).then(child => {
            child.stdout.on('data', data => out += data.toString());
            child.stderr.on('data', data => out += data.toString());
            child.on('close', code => {
                if (!code) resolve(out);
                else reject({ code: code, err: out });
            });
        });
    });
}

function dockerComposeDown(file, options) {
    return new Promise((resolve, reject) => {
        options = options ? options : [];
        var command = 'docker-compose';
        var arg = ['-f', file, 'down'].concat(options);

        var out = "";
        cmd.execCommand(command, arg).then(child => {
            child.stdout.on('data', data => out += data.toString());
            child.stderr.on('data', data => out += data.toString());
            child.on('close', code => {
                if (!code) resolve(out);
                else reject({ code: code, err: out });
            });
        });
    });
}

function dockerComposeStop(file, options) {
    return new Promise((resolve, reject) => {
        options = options ? options : [];
        var command = 'docker-compose';
        var arg = ['-f', file, 'stop'].concat(options);

        var out = "";
        cmd.execCommand(command, arg).then(child => {
            child.stdout.on('data', data => out += data.toString());
            child.stderr.on('data', data => out += data.toString());
            child.on('close', code => {
                if (!code) resolve(out);
                else reject({ code: code, err: out });
            });
        });
    });
}

function dockerComposeStart(file, options) {
    return new Promise((resolve, reject) => {
        options = options ? options : [];
        var command = 'docker-compose';
        var arg = ['-f', file, 'start'].concat(options);

        var out = "";
        cmd.execCommand(command, arg).then(child => {
            child.stdout.on('data', data => out += data.toString());
            child.stderr.on('data', data => out += data.toString());
            child.on('close', code => {
                if (!code) resolve(out);
                else reject({ code: code, err: out });
            });
        });
    });
}

function dockerExec(container, exec_command, options) {
    return new Promise((resolve, reject) => {
        options = options ? options : [];
        var command = 'docker';
        var arg = ['exec'].concat(options).concat(container).concat(exec_command);

        var out = "";
        cmd.execCommand(command, arg).then(child => {
            child.stdout.on('data', data => out += data.toString());
            child.stderr.on('data', data => out += data.toString());
            child.on('close', code => {
                if (!code) resolve(out);
                else reject({ code: code, err: out });
            });
        });
    });
}

function dockerInspectIPAddressOfContainer(container, options) {
    return new Promise((resolve, reject) => {
        options = options ? options : {};
        if (!options.network) options.network = 'bridge';
        var command = 'docker';
        var arg = ['inspect', '--format', "'{{.NetworkSettings.Networks." + options.network + ".IPAddress}}'", container];

        var out = "";
        cmd.execCommand(command, arg).then(child => {
            child.stdout.on('data', data => out += data.toString());
            child.stderr.on('data', data => out += data.toString());
            child.on('close', code => {
                if (!code) resolve(out.toString('utf-8').replace(/(?:\r\n|\r|\n)/g, '').replace(/'/ig, ''));
                else reject({ code: code, err: out });
            });
        });
    });
}

function dockerInspectPortOfContainer(container) {
    return new Promise((resolve, reject) => {
        // options = options ? options : [];
        var command = 'docker';
        var arg = ['inspect', '--format', "'{{.NetworkSettings.Ports}}'", container];

        var out = "";
        cmd.execCommand(command, arg).then(child => {
            child.stdout.on('data', data => out += data.toString());
            child.stderr.on('data', data => out += data.toString());
            child.on('close', code => {
                if (!code) resolve(out.toString('utf-8').replace(/(?:\r\n|\r|\n)/g, '').split("[")[1].split("/")[0].replace(/'/ig, ''));
                else reject({ code: code, err: out });
            });
        });
    });
}
