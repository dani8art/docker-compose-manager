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
        options = options ? options : [];
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
