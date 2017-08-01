'use strict';

process.env.NODE_ENV = "development";

var expect = require('chai').expect;
var module = require('../../src/docker-compose-manager'),
    fs = require('fs');

describe('docker-compose stop tests', function () {
    this.timeout(30000);

    var file = __dirname + '/../docker-compose.yaml';
    it('Execute command stop', done => {

        var expected = fs.readFileSync('./tests/00-module/expected/dc-stop.expected.txt', 'utf-8');
        module.dockerComposeStop(file).then(out => {
            expect(out.replace(/\\n|\\r/gm, '')).to.equal(expected.replace(/\\n|\\r/gm, ''));
            done();
        }, done);

    });

});