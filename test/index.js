'use strict';

// Load modules

const Catbox = require('catbox');
const Code = require('code');
const Lab = require('lab');
const CatboxFake = require('../lib');

// Test shortcuts

const { describe, it } = exports.lab = Lab.script();
const { expect, fail } = Code;

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

    it('should not be ready if ready is false', async (done) => {

        let trojan = {};
        const client = new Catbox.Client(CatboxFake, {
            trojan: (m) => {

                trojan = m;
            }
        });

        await client.start();
        trojan.ready(false);

        expect(client.isReady()).to.equal(false);
    });

    it('should be ready if ready is true', async (done) => {

        let trojan = {};
        const client = new Catbox.Client(CatboxFake, {
            trojan: (m) => {

                trojan = m;
            }
        });

        await client.start();
        await client.stop();
        trojan.ready(true);

        expect(client.isReady()).to.equal(true);
    });

    it('should fail if trojan is not a function', (done) => {

        let client;
        try {
            client = new Catbox.Client(CatboxFake, { trojan: 'nothing' });
        }
        catch (err) {
            expect(err.message).to.equal('Trojan must be a function');
        }

        expect(client).to.equal(undefined);
    });

    it('should get fake item', async (done) => {

        const client = new Catbox.Client(CatboxFake);

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

        const client = new Catbox.Client(CatboxFake);

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

        const client = new Catbox.Client(CatboxFake);

        await client.start();

        const key = {
            id: 'any_key',
            segment: 'any_segment'
        };

        await client.drop(key);
    });

    it('should throw an error if throw is enabled', async (done) => {

        let trojan = {};
        const client = new Catbox.Client(CatboxFake, {
            trojan: (m) => {

                trojan = m;
            }
        });

        const key = {
            id: 'any_key',
            segment: 'any_segment'
        };
        const value = 'value';
        const _ttl = 9999;

        trojan.throw(true);

        try {
            await client.start();
            fail('Should fail before this');
        }
        catch (err) {
            expect(err.message).to.equal('Catbox Fake Error');
        }

        try {
            await client.set(key, value, _ttl);
            fail('Should fail before this');
        }
        catch (err) {
            expect(err.message).to.equal('Catbox Fake Error');
        }

        try {
            await client.get(key);
            fail('Should fail before this');
        }
        catch (err) {
            expect(err.message).to.equal('Catbox Fake Error');
        }

        try {
            await client.drop(key);
            fail('Should fail before this');
        }
        catch (err) {
            expect(err.message).to.equal('Catbox Fake Error');
        }

        try {
            client.isReady();
            fail('Should fail before this');
        }
        catch (err) {
            expect(err.message).to.equal('Catbox Fake Error');
        }

        try {
            await client.stop();
            fail('Should fail before this');
        }
        catch (err) {
            expect(err.message).to.equal('Catbox Fake Error');
        }
    });

    it('should not throw an error if throw is enabled then disabled', async (done) => {

        let trojan = {};
        const client = new Catbox.Client(CatboxFake, {
            trojan: (m) => {

                trojan = m;
            }
        });

        trojan.throw(true);
        trojan.throw(false);

        try {
            await client.start();
            expect(true).to.be.true();
        }
        catch (err) {
            fail('Should not fail');
        }
    });

    it('should delay response if a delay is given', async (done) => {

        let trojan = {};
        const client = new Catbox.Client(CatboxFake, {
            trojan: (m) => {

                trojan = m;
            }
        });

        const key = {
            id: 'any_key',
            segment: 'any_segment'
        };
        const value = 'value';
        const _ttl = 9999;

        const delay = 50;
        let start;
        trojan.delay(delay + 1);

        start = Date.now();
        await client.start();
        expect(Date.now() - start).to.least(delay);

        start = Date.now();
        await client.get(key);
        expect(Date.now() - start).to.least(delay);

        start = Date.now();
        await client.set(key, value, _ttl);
        expect(Date.now() - start).to.least(delay);

        start = Date.now();
        await client.drop(key);
        expect(Date.now() - start).to.least(delay);

        start = Date.now();
        await client.stop();
        expect(Date.now() - start).to.least(delay);

    });

    it('should not delay response if a delay is given and then removed', async (done) => {

        let trojan = {};
        const client = new Catbox.Client(CatboxFake, {
            trojan: (m) => {

                trojan = m;
            }
        });

        const delay = 50;
        let start;
        trojan.delay(delay + 1);
        trojan.delay(0);

        start = Date.now();
        await client.start();
        expect(Date.now() - start).to.most(delay);

    });
});
