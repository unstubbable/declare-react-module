#!/usr/bin/env node

/// <reference path="../typings/index.d.ts" />

import * as fs from 'fs-promise';
import * as path from 'path';
import {generateFromSource} from 'react-to-typescript-definitions';
import {rollup} from 'rollup';
import jsx = require('rollup-plugin-jsx');
import {
  replaceWithEmptyModule
} from './rollup-plugin-replace-with-empty-module';

const pkgDir = process.cwd();
const {name, main} = require(path.join(pkgDir, 'package.json'));

rollup({
  entry: path.join(pkgDir, main),
  plugins: [
    replaceWithEmptyModule(['**/*.css']),
    jsx({factory: 'React.createElement'})
  ]
}).then(bundle => {
  const {code} = bundle.generate();
  const typings = generateFromSource(name, code);

  return fs.writeFile(path.join(pkgDir, 'index.d.ts'), typings);
}).catch(reason => {
  console.log('Error while generating declaration file for ', name);
  console.log(reason);
  process.exit(1);
});
