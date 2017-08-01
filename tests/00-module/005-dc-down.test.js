'use strict';

process.env.NODE_ENV = "development";

var expect = require('chai').expect;
var module = require('../../src/docker-compose-manager'),
    fs = require('fs');

describe('docker-compose down tests', function () {
    this.timeout(30000);

    var file = __dirname + '/../docker-compose.yaml';
    it('Execute command down', done => {

        var expected = fs.readFileSync('./tests/00-module/expected/dc-down.expected.txt', 'utf-8');
        module.dockerComposeDown(file).then(out => {
            expect(out.replace(/^\s+|\s+$/gm, '')).to.equal(expected.replace(/^\s+|\s+$/gm, ''));
            done();
        }, done);

    });

});