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

});