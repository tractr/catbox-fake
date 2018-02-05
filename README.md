# Catbox Fake

Fake catbox is a mock engine used to test catbox-fallback. It can be used to test other things.

Lead maintainer: [Simon Lévesque](https://github.com/simlevesque)

Current version: [![Current Version](https://img.shields.io/npm/v/catbox-fake.svg)](https://www.npmjs.com/package/catbox-fake) [![Build Status](https://travis-ci.org/Tractr/catbox-fake.svg?branch=master)](https://travis-ci.org/Tractr/catbox-fake)

### Options

- `alwaysReady` - tells the engine to always be ready, even before starting it or after it was stopped.
- `alwaysNotReady` - tells the engine to always be not ready, even after starting.

You cannot set both options to true as it would create a conflict.