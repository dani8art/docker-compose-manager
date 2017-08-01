'use strict';

process.env.NODE_ENV = "development";

var expect = require('chai').expect;
var module = require('../../src/docker-compose-manager'),
    fs = require('fs');

describe('docker-compose start tests', function () {
    this.timeout(30000);

    var file = __dirname + '/../docker-compose.yaml';
    it('Execute command start', done => {

        var expected = fs.readFileSync('./tests/00-module/expected/dc-start.expected.txt', 'utf-8').trim();
        module.dockerComposeStart(file).then(out => {
            expect(out.trim()).to.equal(expected);
            done();
        }, done);

    });

});