/*!
docker-composer-manager 0.0.3, built on: 2017-03-30
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

var cmd = require('./cmd/cmd');

module.exports = {
    dockerComposeUp: dockerComposeUp,
    dockerComposeDown: dockerComposeDown,
    dockerComposeStop: dockerComposeStop,
    dockerComposeStart: dockerComposeStart,
    dockerExec: dockerExec,
    dockerInspectIPAddressOfContainer: dockerInspectIPAddressOfContainer,
    dockerInspectPortOfContainer: dockerInspectPortOfContainer
};

function dockerComposeUp(file, options) {
    return new Promise((resolve, reject) => {
        options = options ? options : [];
        var command = 'docker-compose';
        var arg = ['-f', file, 'up', '-d'].concat(options);

        cmd.execCommand(command, arg).then(child => {
            child.stdout.on('data', data => console.log(data.toString()));
            child.stderr.on('data', data => console.log(data.toString()));
            child.stdout.on('close', code => { if (!code) resolve(); else reject(code); });
        });
    });
}

function dockerComposeDown(file, options) {
    return new Promise((resolve, reject) => {
        options = options ? options : [];
        var command = 'docker-compose';
        var arg = ['-f', file, 'down'].concat(options);

        cmd.execCommand(command, arg).then(child => {
            child.stdout.on('data', data => console.log(data.toString()));
            child.stderr.on('data', data => console.log(data.toString()));
            child.stdout.on('close', code => { if (!code) resolve(); else reject(code); });
        });
    });
}

function dockerComposeStop(file, options) {
    return new Promise((resolve, reject) => {
        options = options ? options : [];
        var command = 'docker-compose';
        var arg = ['-f', file, 'stop'].concat(options);

        cmd.execCommand(command, arg).then(child => {
            child.stdout.on('data', data => console.log(data.toString()));
            child.stderr.on('data', data => console.log(data.toString()));
            child.stdout.on('close', code => { if (!code) resolve(); else reject(code); });
        });
    });
}

function dockerComposeStart(file, options) {
    return new Promise((resolve, reject) => {
        options = options ? options : [];
        var command = 'docker-compose';
        var arg = ['-f', file, 'start'].concat(options);

        cmd.execCommand(command, arg).then(child => {
            child.stdout.on('data', data => console.log(data.toString()));
            child.stderr.on('data', data => console.log(data.toString()));
            child.stdout.on('close', code => { if (!code) resolve(); else reject(code); });
        });
    });
}

function dockerExec(container, exec_command, options) {
    return new Promise((resolve, reject) => {
        options = options ? options : [];
        var command = 'docker';
        var arg = ['exec'].concat(options).concat(container).concat(exec_command);

        cmd.execCommand(command, arg).then(child => {
            child.stdout.on('data', data => console.log(data.toString()));
            child.stderr.on('data', data => console.log(data.toString()));
            child.stdout.on('close', code => { if (!code) resolve(); else reject(code); });
        });
    });
}

function dockerInspectIPAddressOfContainer(container, options) {
    return new Promise((resolve, reject) => {
        options = options ? options : [];
        var command = 'docker';
        var arg = ['inspect', '--format', "'{{.NetworkSettings.Networks." + options.network + ".IPAddress}}'", container];

        var ip;
        cmd.execCommand(command, arg).then(child => {
            child.stdout.on('data', data => ip = data.toString('utf-8').replace(/(?:\r\n|\r|\n)/g, '').replace(/'/ig, ''));
            child.stderr.on('data', data => console.log(data.toString()));
            child.stdout.on('close', code => { if (!code) resolve(ip); else reject(code); });
        });
    });
}

function dockerInspectPortOfContainer(container) {
    return new Promise((resolve, reject) => {
        // options = options ? options : [];
        var command = 'docker';
        var arg = ['inspect', '--format', "'{{.NetworkSettings.Ports}}'", container];

        var port;
        cmd.execCommand(command, arg).then(child => {
            child.stdout.on('data', data => port = data.toString('utf-8').replace(/(?:\r\n|\r|\n)/g, '').split("[")[1].split("/")[0].replace(/'/ig, ''));
            child.stderr.on('data', data => console.log(data.toString()));
            child.stdout.on('close', code => { if (!code) resolve(port); else reject(code); });
        });
    });
}
