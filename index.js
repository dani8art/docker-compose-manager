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

    return child_process.execSync(command).toString('utf-8').replace(/(?:\r\n|\r|\n)/g, '');
}

module.exports.dockerInspectPortOfContainer = function (container, options) {
    var command = "docker inspect --format '{{.NetworkSettings.Ports}}' " + container;

    return child_process.execSync(command).toString('utf-8').replace(/(?:\r\n|\r|\n)/g, '').split("[")[1].split("/")[0];
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
