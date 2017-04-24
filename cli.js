#!/usr/bin/env node
'use strict';
const meow = require('meow');

const cli = meow(`
  Usage
    $ declare-react-module [<pkgDir>]

  Examples
    $ declare-react-module
    $ declare-react-module packages/my-package
`);

require('./dist/index').cli(cli.input[0]);
