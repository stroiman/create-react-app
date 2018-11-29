'use strict';

process.env.BABEL_ENV = 'test';
process.env.NODE_ENV = 'test';
process.env.PUBLIC_URL = '';

const path = require('path');
process.argv.push("--require");
process.argv.push(path.join(__dirname, "utils/mochaInitialization"));

require('mocha/bin/mocha');
