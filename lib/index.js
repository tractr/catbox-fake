'use strict';

// Load modules

const Hoek = require('hoek');

// Declare internals

const internals = {};

internals.defaults = {};

exports = module.exports = internals.Connection = function () {

    Hoek.assert(this.constructor === internals.Connection, 'Fake Engine client must be instantiated using new');
    
    this._ready = false;
    this._shouldThrowError = false;
    this._shouldDelay = 0;

    return this;
};

internals.Connection.prototype.start = async function () {

    this._throwIfNeeded();
    this._ready = true;
};


internals.Connection.prototype.stop = async function () {

    this._throwIfNeeded();
    this._ready = false;
};


internals.Connection.prototype.isReady = function () {

    this._throwIfNeeded();
    return this._ready;
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

    if (this._shouldThrowError) {
        throw new Error('Catbox Fake Error');
    }
};

/**
 * Wait '_shouldDelay' milliseconds if needed
 * 
 * @private
 */
internals.Connection.prototype._waitIfNeeded = async function () {

    return this._shouldDelay ?
        new Promise(r => setTimeout(r, this._shouldDelay)) :
        Promise.resolve();
};

/**
 * Define if the client should always throw an error
 *
 * @param {boolean} enable
 */
internals.Connection.prototype.throw = function (enable) {

    this._shouldThrowError = enable;
};

/**
 * Define if the client should always timeout
 *
 * @param {Number} value
 */
internals.Connection.prototype.delay = function (value) {

    this._shouldDelay = value;
};

/**
 * Define if the client should be ready
 *
 * @param {boolean} enable
 */
internals.Connection.prototype.ready = function (enable) {

    this._ready = enable;
};
