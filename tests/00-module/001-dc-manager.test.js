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

process.env.NODE_ENV = "test";

var chai = require('chai');
chai.use(require('chai-match'));
var expect = require('chai').expect;

var module = require('../../src/docker-compose-manager'),
    logger = require('../../src/logger/logger');

describe('Docker compose manager Module tests', function () {
    this.timeout(120000);

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
        var file = __dirname + '/../without-environment/docker-compose.yaml';

        module.dockerComposeUp(file).then(() => {
            return module.dockerComposeStop(file);
        }).then(() => {
            return module.dockerComposeStart(file);
        }).then(() => {
            return module.dockerExec('withoutenvironment_mongo_1', ['mongo', '--version']);
        }).then(() => {
            return module.dockerInspectIPAddressOfContainer('withoutenvironment_mongo_1', { network: "withoutenvironment_default" }).then(ip => {
                expect(ip).to.match(/\b\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}\b/);
            });
        }).then(() => {
            return module.dockerInspectPortOfContainer('withoutenvironment_mongo_1').then(port => {
                expect(port).to.be.equal('27017');
            });
        }).then(() => {
            return module.dockerComposeDown(file).then(out => done());
        }).catch(err => done(err));

    });

});