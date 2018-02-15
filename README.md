# Catbox Fake

Fake catbox is a mock engine used to test catbox-fallback. It can be used to test other things.

Lead maintainer: [Simon Lévesque](https://github.com/simlevesque)

Current version: [![Current Version](https://img.shields.io/npm/v/catbox-fake.svg)](https://www.npmjs.com/package/catbox-fake) [![Build Status](https://travis-ci.org/Tractr/catbox-fake.svg?branch=master)](https://travis-ci.org/Tractr/catbox-fake)

### Options

- `trojan: function(methods)` - A function that will be called on client initialization. This methods receives as first argument an object containing client's special methods. The object has these properties:
    - `throw: function(enable)` - tells the engine to always throw an error
        - `enable` - A boolean to enable or not this feature
    - `ready: function(enable)` - tells the engine to say if it is ready or not
        - `enable` - A boolean for the ready status
    - `delay: function(value)` - tells the engine to wait a while before returning
        - `value` - A number for milliseconds
