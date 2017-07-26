'use strict';

var dcManager = require('../src/docker-compose-manager');

dcManager.dockerExec('mongo', ['mongo', '--version']).then(() => {
    console.log("command executed in mongo container");
}, code => {
    console.log(code);
});