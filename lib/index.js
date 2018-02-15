'use strict';

// Load modules

const Hoek = require('hoek');

// Declare internals

const internals = {};

internals.defaults = {};

exports = module.exports = internals.Connection = function (options) {

    Hoek.assert(this.constructor === internals.Connection, 'Fake Engine client must be instantiated using new');
    Hoek.assert(!options.trojan || typeof options.trojan === 'function', 'Trojan must be a function');

    this._ready = false;
    this._shouldThrowError = false;
    this._shouldDelay = 0;
    this._value = 'fake-engine'; // The only stored value

    // If a trojan is available, inject the methods
    if (options.trojan) {
        const methods = {
            ready: (enable) => {

                this._ready = enable;
            },
            delay: (value) => {

                this._shouldDelay = value;
            },
            throw: (enable) => {

                this._shouldThrowError = enable;
            }
        };
        options.trojan(methods);
    }

    return this;
};

internals.Connection.prototype.start = async function () {

    this._throwIfNeeded();
    await this._waitIfNeeded();
    this._ready = true;
};


internals.Connection.prototype.stop = async function () {

    this._throwIfNeeded();
    await this._waitIfNeeded();
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
    return { item: this._value, ttl: 9999, stored: (new Date().getTime() - 100) };
};

internals.Connection.prototype.set = async function (key, value, ttl) {

    this._throwIfNeeded();
    this._value = value;
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
internals.Connection.prototype._waitIfNeeded = function () {

    if (this._shouldDelay) {
        return new Promise((r) => {

            setTimeout(r, this._shouldDelay);
        });
    }

    return Promise.resolve();
};
