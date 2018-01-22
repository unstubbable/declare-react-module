#!/usr/bin/env node
'use strict';
const meow = require('meow');

const cli = meow(
  `
  Usage
    $ declare-react-module [<pkgDir>]

  Options
    --outDir, -o  Output directory

  Examples
    $ declare-react-module
    $ declare-react-module --outDir=./typings
    $ declare-react-module packages/my-package
`,
  {
    flags: {
      outDir: {
        type: 'string',
        alias: 'o',
      },
    },
  }
);

require('./dist/index').cli(cli.input[0], cli.flags);
