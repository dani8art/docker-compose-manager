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

var child_process = require('child_process');

module.exports.dockerComposeUp = function (dir, options, success, error) {
    var command = 'docker-compose up';

    if (options) {
        command += ' ' + options;
    }

    _execCommand(command, success, error, {
        cwd: dir
    });
}

module.exports.dockerComposeDown = function (dir, options, success, error) {
    var command = 'docker-compose down';

    if (options) {
        command += ' ' + options;
    }

    _execCommand(command, success, error, {
        cwd: dir
    });

}

module.exports.dockerComposeStop = function (dir, success, error) {
    var command = 'docker-compose stop';

    _execCommand(command, success, error, {
        cwd: dir
    });

}

module.exports.dockerComposeStart = function (dir, success, error) {
    var command = 'docker-compose start';

    _execCommand(command, success, error, {
        cwd: dir
    });

}

module.exports.dockerExec = function (container, exec_command, options, success, error) {
    var command = 'docker exec';

    if (options) {
        for (option in options) {
            command += ' ' + options[option];
        }
    }

    command += ' ' + container;

    command += ' ' + exec_command;

    _execCommand(command, success, error);

}

module.exports.dockerInspectIPAddressOfContainer = function (container, options) {
    var command = "docker inspect --format '{{.NetworkSettings.Networks." + options.network + ".IPAddress}}' " + container;

    return child_process.execSync(command).toString('utf-8').replace(/(?:\r\n|\r|\n)/g, '').replace(/'/ig, '');
}

module.exports.dockerInspectPortOfContainer = function (container, options) {
    var command = "docker inspect --format '{{.NetworkSettings.Ports}}' " + container;

    return child_process.execSync(command).toString('utf-8').replace(/(?:\r\n|\r|\n)/g, '').split("[")[1].split("/")[0].replace(/'/ig, '');
}

function _execCommand(command, success, error, options) {

    child_process.exec(command, options, function (err, stdout, stderr) {
        if (!err) {
            if (success)
                success(stdout, stderr);
        } else {
            if (error)
                error(err, stderr);
        }
    });

}

module.exports.execCommand = _execCommand;