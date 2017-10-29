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

var expect = require('chai').expect;
var module = require('../../src/cmd/cmd');

describe('CMD Module tests', function () {
    this.timeout(30000);

    it('The module exposes "execCommand" function', () => {

        var result = module.execCommand;
        expect(result).to.not.be.equal(undefined);

    });

    it('The "execCommand" function return a child_process object', done => {

        module.execCommand('ls').then(child => {
            expect(child).to.not.be.equal(undefined);
            done();
        }, done);

    });

    it('The "execCommand" function return a error', done => {

        module.execCommand().then(done, err => {
            expect(err).to.not.be.equal(undefined);
            done();
        });

    });

    it('The "execCommand" function with args and env return a child_process object', done => {

        process.env.DIR = '/';

        module.execCommand('ls', ['-la', '$DIR']).then(child => {
            expect(child).to.not.be.equal(undefined);
            done();
        }, done);

    });

});