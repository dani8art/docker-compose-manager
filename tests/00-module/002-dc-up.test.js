'use strict';

process.env.NODE_ENV = "development";

var expect = require('chai').expect;
var module = require('../../src/docker-compose-manager'),
    fs = require('fs');

describe('docker-compose up tests', function () {
    this.timeout(30000);

    var file = __dirname + '/../docker-compose.yaml';
    it('Execute command up', done => {

        var expected = fs.readFileSync('./tests/00-module/expected/dc-up.expected.txt', 'utf-8');
        module.dockerComposeUp(file).then(out => {
            expect(out).to.equal(expected);
            done();
        }, done);

    });

});