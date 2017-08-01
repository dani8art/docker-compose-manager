'use strict';

process.env.NODE_ENV = "development";

var expect = require('chai').expect;
var module = require('../../src/docker-compose-manager'),
    fs = require('fs');

describe('docker-compose down tests', function () {
    this.timeout(30000);

    var file = __dirname + '/../docker-compose.yaml';
    it('Execute command down', done => {

        module.dockerComposeDown(file).then(out => {
            expect(out.indexOf('Stopping tests_mongo_1')).to.not.equal(-1);
            expect(out.indexOf('Removing tests_mongo_1')).to.not.equal(-1);
            expect(out.indexOf('done')).to.not.equal(-1);
            expect(out.indexOf('Removing network tests_default')).to.not.equal(-1);
            done();
        }, done);

    });

});