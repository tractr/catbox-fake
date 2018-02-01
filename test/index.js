'use strict';

// Load modules

const Catbox = require('catbox');
const Code = require('code');
const Lab = require('lab');
const CatboxFake = require('../lib');

// Test shortcuts

const { describe, it } = exports.lab = Lab.script();
const expect = Code.expect;

describe('Fake', () => {

    it('should start', async (done) => {

        const client = new Catbox.Client(CatboxFake);

        await client.start();

        expect(client.isReady()).to.equal(true);
    });

    it('should stop', async (done) => {

        const client = new Catbox.Client(CatboxFake);

        await client.start();

        expect(client.isReady()).to.equal(true);

        await client.stop();

        expect(client.isReady()).to.equal(false);
    });

    it('should restart', async (done) => {

        const client = new Catbox.Client(CatboxFake);

        await client.start();

        expect(client.isReady()).to.equal(true);

        await client.stop();

        expect(client.isReady()).to.equal(false);

        await client.start();

        expect(client.isReady()).to.equal(true);
    });

    it('should not be ready if alwaysNotReady is true', async (done) => {

        const client = new Catbox.Client(CatboxFake, { alwaysNotReady: true });

        await client.start();

        expect(client.isReady()).to.equal(false);
    });

    it('should be ready if alwaysReady is true', async (done) => {

        const client = new Catbox.Client(CatboxFake, { alwaysReady: true });

        await client.start();
        await client.stop();

        expect(client.isReady()).to.equal(true);
    });

    it('should fail if alwaysReady and alwaysNotReady are true', (done) => {

        let client;
        try {
            client = new Catbox.Client(CatboxFake, { alwaysReady: true, alwaysNotReady: true });
        }
        catch (err) {
            expect(err.message).to.equal('Must set either alwaysReady or alwaysNotReady, not both');
        }

        expect(client).to.equal(undefined);
    });

    it('should get fake item', async (done) => {

        const client = new Catbox.Client(CatboxFake, { alwaysReady: true });

        await client.start();

        const key = {
            id: 'any_key',
            segment: 'any_segment'
        };

        const { item, ttl } = await client.get(key);

        expect(ttl).to.most(9999);
        expect(item).to.equal('fake-engine');
    });

    it('should set fake item', async (done) => {

        const client = new Catbox.Client(CatboxFake, { alwaysReady: true });

        await client.start();

        const key = {
            id: 'any_key',
            segment: 'any_segment'
        };
        const value = 'value';
        const _ttl = 9999;

        await client.set(key, value, _ttl);
    });

    it('should drop fake item', async (done) => {

        const client = new Catbox.Client(CatboxFake, { alwaysReady: true });

        await client.start();

        const key = {
            id: 'any_key',
            segment: 'any_segment'
        };

        await client.drop(key);
    });
});
