import * as fs from 'fs-extra';
import * as path from 'path';
import {BundleOptions, generateTypings} from './generate';

export interface Options extends BundleOptions {
  outDir?: string;
}

export async function writeDeclarationFile(
  pkgDir: string,
  {outDir, ...bundleOptions}: Options = {}
): Promise<string> {
  const absolutePkgDir = getAbsoluteDirname(pkgDir);
  const {name, main} = require(path.join(absolutePkgDir, 'package.json'));
  const entry = path.resolve(absolutePkgDir, main);

  const typings = await generateTypings(name, entry, bundleOptions);

  const typingsFilename = outDir
    ? path.join(getAbsoluteDirname(outDir), `${name}.d.ts`)
    : path.join(absolutePkgDir, 'index.d.ts');

  await fs.writeFile(typingsFilename, typings);

  return typingsFilename;
}

export async function cli(
  pkgDir: string = process.cwd(),
  options: Options = {}
): Promise<void> {
  try {
    await writeDeclarationFile(pkgDir, options);
  } catch (error) {
    console.error(`Cannot generate declaration file for "${pkgDir}".`);
    console.error(`Reason: ${error.message}`);
    if (error.frame) {
      console.error(error.frame);
    }
    process.exit(1);
  }
}

function getAbsoluteDirname(dirname: string): string {
  return path.resolve(process.cwd(), dirname);
}
