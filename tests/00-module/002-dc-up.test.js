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

process.env.NODE_ENV = "development";

var expect = require('chai').expect;
var module = require('../../src/docker-compose-manager'),
    fs = require('fs');

describe('docker-compose up tests', function () {
    this.timeout(120000);

    var file = __dirname + '/../without-environment/docker-compose.yaml';
    var fileEnv = __dirname + '/../with-environment/docker-compose.yaml';
    it('Execute command up', done => {

        module.dockerComposeUp(file).then(out => {
            expect(out.indexOf('Creating network "withoutenvironment_default" with the default driver')).to.not.equal(-1);
            expect(out.indexOf('Creating withoutenvironment_mongo_1')).to.not.equal(-1);
            expect(out.indexOf('done')).to.not.equal(-1);
            done();
        }).catch(err => done(err));

    });

    it('Execute command up with env', done => {

        process.env.MONGO_VERSION = '3.0.15';

        module.dockerComposeUp(fileEnv).then(() => {
            return module.dockerExec('withenvironment_mongo_1', ['mongo', '--version']);
        }).then((out) => {
            return Promise.resolve(expect(out.indexOf('3.0.15')).to.not.be.equal(-1));
        }).then(() => {
            return module.dockerComposeDown(fileEnv);
        }).then(() => done()).catch(err => done(err));

    });

});