import * as fs from 'fs-extra';
import * as path from 'path';
import stripAnsi = require('strip-ansi');
import {cli} from '../';
import {getModuleDirname} from './helper';

describe('cli()', () => {
  let pkgDir: string;
  let processExitMock: jest.SpyInstance<typeof process.exit>;
  let consoleErrorMock: jest.SpyInstance<typeof console.error>;

  beforeAll(() => {
    processExitMock = jest.spyOn(process, 'exit');
    processExitMock.mockImplementation(jest.fn());

    consoleErrorMock = jest.spyOn(console, 'error');
    consoleErrorMock.mockImplementation(jest.fn());
  });

  afterAll(() => {
    processExitMock.mockRestore();
    consoleErrorMock.mockRestore();
  });

  const writesDeclarationFile = () => {
    it('writes a declaration file to the given package dir', async () => {
      const filename = path.join(pkgDir, 'index.d.ts');
      await fs.remove(filename);

      await cli(pkgDir);

      const fileContents = await fs.readFile(filename);
      expect(fileContents.toString()).toMatchSnapshot();
    });
  };

  describe('with an absolute package dir', () => {
    beforeEach(() => {
      pkgDir = getModuleDirname('export-from-js');
    });

    writesDeclarationFile();
  });

  describe('with a relative package dir', () => {
    beforeEach(() => {
      pkgDir = path.join('src', '__tests__', '__fixtures__', 'export-from-js');
    });

    writesDeclarationFile();
  });

  describe('when no package.json can be found', () => {
    beforeEach(() => {
      pkgDir = getModuleDirname('export-from-jsx');
    });

    it('exits and logs an error message', async () => {
      await cli(pkgDir);

      expect(processExitMock).toHaveBeenCalledWith(1);
      expect(consoleErrorMock).toHaveBeenCalledTimes(2);
    });
  });

  describe('when a module has invalid syntax', () => {
    beforeEach(() => {
      pkgDir = getModuleDirname('invalid-syntax');
    });

    it('exits and logs an error message with a code frame', async () => {
      await cli(pkgDir);

      expect(processExitMock).toHaveBeenCalledWith(1);
      expect(consoleErrorMock).toHaveBeenCalledTimes(3);
      expect(stripAnsi(consoleErrorMock.mock.calls[2][0])).toBe(
        `   8 | \n   9 |   render() {
> 10 |     return <div>{this.props.foo,}</div>;
     |                                 ^
  11 |   }
  12 | }
  13 | `
      );
    });
  });
});
