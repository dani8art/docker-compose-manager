'use strict';

process.env.NODE_ENV = "test";

var expect = require('chai').expect;
var module = require('../../src/docker-compose-manager'),
    logger = require('../../src/logger/logger');

describe('Docker compose manager Module tests', function () {
    this.timeout(30000);

    it('The module exposes "dockerComposeUp" function', () => {

        var result = module.dockerComposeUp;
        expect(result).to.not.be.equal(undefined);

    });

    it('The module exposes "dockerComposeDown" function', () => {

        var result = module.dockerComposeDown;
        expect(result).to.not.be.equal(undefined);

    });

    it('The module exposes "dockerComposeStop" function', () => {

        var result = module.dockerComposeStop;
        expect(result).to.not.be.equal(undefined);

    });

    it('The module exposes "dockerComposeStart" function', () => {

        var result = module.dockerComposeStart;
        expect(result).to.not.be.equal(undefined);

    });

    it('The module exposes "dockerExec" function', () => {

        var result = module.dockerExec;
        expect(result).to.not.be.equal(undefined);

    });

    it('The module exposes "dockerInspectIPAddressOfContainer" function', () => {

        var result = module.dockerInspectIPAddressOfContainer;
        expect(result).to.not.be.equal(undefined);

    });

    it('The module exposes "dockerInspectPortOfContainer" function', () => {

        var result = module.dockerInspectPortOfContainer;
        expect(result).to.not.be.equal(undefined);

    });

    it('Functions sequence', done => {
        var file = __dirname + '/../docker-compose.yaml';
        module.dockerComposeUp(file).then(() => {
            return module.dockerComposeStop(file);
        }).then(() => {
            return module.dockerComposeStart(file);
        }).then(() => {
            return module.dockerExec('mongo', ['mongo', '--version']);
        }).then(() => {
            return module.dockerInspectIPAddressOfContainer('tests_mongo_1', { network: "tests_default" }).then(ip => {
                expect(ip).to.be.equal('172.18.0.2');
            });
        }).then(() => {
            return module.dockerInspectPortOfContainer('tests_mongo_1').then(port => {
                expect(port).to.be.equal('27017');
            });
        }).then(() => {
            return module.dockerComposeDown(file).then(out => done());
        }).catch(err => done(err));

    });

});