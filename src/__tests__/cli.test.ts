import * as fs from 'fs-promise';
import * as path from 'path';
import {writeDeclarationFile} from '../';

describe('writeDeclarationFile()', () => {
  it('writes a declaration file to the given package dir', async () => {
    const pkgDir = path.join(__dirname, '__fixtures__', 'export-from-js');
    const filename = path.join(pkgDir, 'index.d.ts');
    await fs.remove(filename);

    await writeDeclarationFile(pkgDir);

    const fileContents = await fs.readFile(filename);
    expect(fileContents.toString()).toMatchSnapshot();
  });

  it('throws if no package.json can be found', async () => {
    const pkgDir = path.join(__dirname, '__fixtures__', 'export-from-jsx');

    let error;

    try {
      await writeDeclarationFile(pkgDir);
    } catch (err) {
      error = err;
    }

    expect(error).toBeDefined();
  });
});
