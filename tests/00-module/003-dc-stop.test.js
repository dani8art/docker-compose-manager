'use strict';

process.env.NODE_ENV = "development";

var expect = require('chai').expect;
var module = require('../../src/docker-compose-manager'),
    fs = require('fs');

describe('docker-compose stop tests', function () {
    this.timeout(30000);

    var file = __dirname + '/../docker-compose.yaml';
    it('Execute command stop', done => {

        var expected = fs.readFileSync('./tests/00-module/expected/dc-stop.expected.txt', 'utf-8').replace('\n', '').replace('\r', '');
        module.dockerComposeStop(file).then(out => {
            expect(out.replace('\n', '').replace('\r', '')).to.equal(expected);
            done();
        }, done);

    });

});