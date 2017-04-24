import * as fs from 'fs-promise';
import * as path from 'path';
import {generateTypings} from './generate';

async function writeDeclarationFile(pkgDir: string): Promise<void> {
  const {name, main} = require(path.join(pkgDir, 'package.json'));
  const entry = path.join(pkgDir, main);

  const typings = await generateTypings(name, entry);

  const typingsFilename = path.join(pkgDir, 'index.d.ts');
  return fs.writeFile(typingsFilename, typings);
}

export async function cli(pkgDir: string = process.cwd()): Promise<void> {
  try {
    const dirname = path.isAbsolute(pkgDir)
      ? pkgDir
      : path.resolve(process.cwd(), pkgDir);
    await writeDeclarationFile(dirname);
  } catch (error) {
    throw new Error(`
Cannot generate declaration file for "${pkgDir}".
Reason: ${error.message}
    `);
  }
}
