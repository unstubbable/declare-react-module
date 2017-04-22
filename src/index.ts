import * as fs from 'fs-promise';
import * as path from 'path';
import {generateTypings} from './generate';

export function cli(): void {
  const pkgDir = process.cwd();
  const {name, main} = require(path.join(pkgDir, 'package.json'));
  const entry = path.join(pkgDir, main);

  // tslint:disable-next-line no-floating-promises
  generateTypings(name, entry).then(async typings => {
    const typingsFilename = path.join(pkgDir, 'index.d.ts');
    return fs.writeFile(typingsFilename, typings);
  }).catch(reason => {
    console.log(
      `Error while generating declaration file for ${name}.`,
      reason.message
    );
    process.exit(1);
  });
}
