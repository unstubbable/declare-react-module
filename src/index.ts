import * as fs from 'fs-promise';
import * as path from 'path';
import {generateTypings} from './generate';

export async function writeDeclarationFile(pkgDir: string): Promise<void> {
  const {name, main} = require(path.join(pkgDir, 'package.json'));
  const entry = path.join(pkgDir, main);

  const typings = await generateTypings(name, entry);

  const typingsFilename = path.join(pkgDir, 'index.d.ts');
  return fs.writeFile(typingsFilename, typings);
}

export async function cli(pkgDir: string = process.cwd()): Promise<void> {
  try {
    if (!path.isAbsolute(pkgDir)) {
      pkgDir = path.resolve(process.cwd(), pkgDir);
    }
    await writeDeclarationFile(pkgDir);
  } catch (error) {
    console.log(
      `Error while generating declaration file for ${pkgDir}.`,
      error.message
    );
    process.exit(1);
  }
}
