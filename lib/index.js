'use strict';

// Load modules

const Hoek = require('hoek');

// Declare internals

const internals = {};

internals.defaults = {};

exports = module.exports = internals.Connection = function () {

    Hoek.assert(this.constructor === internals.Connection, 'Fake Engine client must be instantiated using new');
    
    this.ready = false;
    this.shouldThrowError = false;
    this.shouldTimeout = 0;

    return this;
};

internals.Connection.prototype.start = async function () {

    this.ready = true;
};


internals.Connection.prototype.stop = async function () {

    this.ready = false;
};


internals.Connection.prototype.isReady = function () {

    return this.ready;
};

internals.Connection.prototype.validateSegmentName = function (name) {
    /* $lab:coverage:off$ */
    return null;
    /* $lab:coverage:on$ */
};

internals.Connection.prototype.get = async function (key) {

    this._throwIfNeeded();
    await this._waitIfNeeded();
    return { item: 'fake-engine', ttl: 9999, stored: (new Date().getTime() - 100) };
};

internals.Connection.prototype.set = async function (key, value, ttl) {

    this._throwIfNeeded();
    return await this._waitIfNeeded();
};

internals.Connection.prototype.drop = async function (key) {

    this._throwIfNeeded();
    return await this._waitIfNeeded();
};

/**
 * Throw an error if it is supposed to
 *
 * @private
 */
internals.Connection.prototype._throwIfNeeded = function () {

    if (this.shouldThrowError) {
        throw new Error('Catbox Fake Error');
    }
};

/**
 * Wait 'shouldTimeout' milliseconds if needed
 *
 * @private
 */
internals.Connection.prototype._waitIfNeeded = async function () {

    return this.shouldTimeout ?
        new Promise(r => setTimeout(r, this.shouldTimeout)) :
        Promise.resolve();
};

/**
 * Define if the client should always throw an error
 *
 * @param {boolean} enable
 */
internals.Connection.prototype.throw = function (enable) {

    this.shouldThrowError = enable;
};

/**
 * Define if the client should always timeout
 *
 * @param {Number} value
 */
internals.Connection.prototype.timeout = function (value) {

    this.shouldTimeout = value;
};

/**
 * Define if the client should be ready
 *
 * @param {boolean} enable
 */
internals.Connection.prototype.ready = function (enable) {

    this.ready = enable;
};
