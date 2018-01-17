import * as path from 'path';

const fixturesDirname = path.join(__dirname, '__fixtures__');

export function getModuleDirname(moduleName: string): string {
  return path.join(fixturesDirname, moduleName);
}

export function getInputFileName(moduleName: string): string {
  return path.join(fixturesDirname, moduleName, 'index.js');
}
