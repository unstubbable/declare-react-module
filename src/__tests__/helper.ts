import * as fs from 'fs-promise';
import * as path from 'path';

function getDirectories(dirname: string): string[] {
  return fs
    .readdirSync(dirname)
    .filter(file => fs.statSync(path.join(dirname, file)).isDirectory());
}

export interface TestModule {
  name: string;
  entry: string;
}

export function getModules(): TestModule[] {
  const fixturesDirname = path.join(__dirname, '__fixtures__');

  return getDirectories(fixturesDirname).map(moduleName => ({
    name: moduleName,
    entry: path.join(fixturesDirname, moduleName, 'index.js'),
  }));
}
