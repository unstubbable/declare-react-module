import * as fs from 'fs-promise';
import * as path from 'path';
import {cli} from '../';

describe('cli()', () => {
  let pkgDir: string;

  describe('with an absolute package dir', () => {
    beforeEach(() => {
      pkgDir = path.join(__dirname, '__fixtures__', 'export-from-js');
    });

    it('writes a declaration file to the given package dir', async () => {
      const filename = path.join(pkgDir, 'index.d.ts');
      await fs.remove(filename);

      await cli(pkgDir);

      const fileContents = await fs.readFile(filename);
      expect(fileContents.toString()).toMatchSnapshot();
    });
  });

  describe('with a relative package dir', () => {
    beforeEach(() => {
      pkgDir = path.join('src', '__tests__', '__fixtures__', 'export-from-js');
    });

    it('writes a declaration file to the given package dir', async () => {
      const filename = path.join(pkgDir, 'index.d.ts');
      await fs.remove(filename);

      await cli(pkgDir);

      const fileContents = await fs.readFile(filename);
      expect(fileContents.toString()).toMatchSnapshot();
    });
  });

  it('throws if no package.json can be found', async () => {
    pkgDir = path.join(__dirname, '__fixtures__', 'export-from-jsx');

    let error;

    try {
      await cli(pkgDir);
    } catch (err) {
      error = err;
    }

    expect(error).toBeDefined();
  });
});
