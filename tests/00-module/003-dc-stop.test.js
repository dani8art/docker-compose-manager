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

describe('docker-compose stop tests', function () {
    this.timeout(30000);

    var file = __dirname + '/../without-environment/docker-compose.yaml';
    it('Execute command stop', done => {

        module.dockerComposeStop(file).then(out => {
            expect(out.indexOf('Stopping withoutenvironment_mongo_1')).to.not.equal(-1);
            expect(out.indexOf('done')).to.not.equal(-1);
            done();
        }, done);

    });

});