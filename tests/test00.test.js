'use strict';

var dcManager = require('../src/docker-compose-manager');

dcManager.dockerComposeUp(__dirname + '/docker-compose.yaml').then(() => {
    console.log('docker compose upped');

    dcManager.dockerComposeStop(__dirname + '/docker-compose.yaml').then(() => {
        console.log('docker compose stopped');

        dcManager.dockerComposeStart(__dirname + '/docker-compose.yaml').then(() => {
            console.log('docker compose started');

            dcManager.dockerComposeDown(__dirname + '/docker-compose.yaml').then(() => {
                console.log('docker compose down');
            }, code => {
                console.log(code);
            });

        }, code => {
            console.log(code);
        });

    }, code => {
        console.log(code);
    });

}, code => {
    console.log(code);
});