'use strict';

process.env.NODE_ENV = "development";

var expect = require('chai').expect;
var module = require('../../src/docker-compose-manager'),
    fs = require('fs');

describe('docker-compose stop tests', function () {
    this.timeout(30000);

    var file = __dirname + '/../docker-compose.yaml';
    it('Execute command stop', done => {

        module.dockerComposeStop(file).then(out => {
            expect(out.indexOf('Stopping tests_mongo_1')).to.not.equal(-1);
            expect(out.indexOf('done')).to.not.equal(-1);
            done();
        }, done);

    });

});