import * as fs from 'fs-extra';
import * as os from 'os';
import * as path from 'path';
import stripAnsi = require('strip-ansi');
import {cli, writeDeclarationFile} from '../';
import {getModuleDirname} from './helper';

describe('writeDeclarationFile()', () => {
  let pkgDir: string;

  const writesDeclarationFile = () => {
    it('writes a declaration file to the given package dir', async () => {
      const expectedFilename = path.resolve(pkgDir, 'index.d.ts');
      await fs.remove(expectedFilename);

      const actualFilename = await writeDeclarationFile(pkgDir);
      expect(actualFilename).toBe(expectedFilename);

      const fileContents = await fs.readFile(actualFilename);
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

  describe('with module export-from-js and a custom outDir', () => {
    beforeEach(() => {
      pkgDir = getModuleDirname('export-from-js');
    });

    it('writes the declaration file export-from-js.d.ts into the given directory', async () => {
      const outDir = await fs.mkdtemp(path.join(os.tmpdir(), 'drm-test-'));
      const expectedFilename = path.join(outDir, 'export-from-js.d.ts');

      const actualFilename = await writeDeclarationFile(pkgDir, {outDir});
      expect(actualFilename).toBe(expectedFilename);

      const fileContents = await fs.readFile(actualFilename);
      expect(fileContents.toString()).toMatchSnapshot();

      return fs.remove(outDir);
    });
  });
});

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

  describe('with a valid module', () => {
    beforeEach(() => {
      pkgDir = getModuleDirname('export-from-js');
    });

    it('resolves', async () => {
      const promise = cli(pkgDir);
      return expect(promise).resolves.toBeUndefined();
    });
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
      expect(stripAnsi(consoleErrorMock.mock.calls[2][0])).toMatchSnapshot();
    });
  });

  describe('when an import can not be resolved', () => {
    beforeEach(() => {
      pkgDir = getModuleDirname('missing-dependency');
    });

    it('exits and logs an error message with a code frame', async () => {
      await cli(pkgDir);

      expect(processExitMock).toHaveBeenCalledWith(1);
      expect(consoleErrorMock).toHaveBeenCalledTimes(3);
      expect(consoleErrorMock.mock.calls[2][0]).toMatchSnapshot();
    });
  });

  describe('with module export-from-js and a custom outDir', () => {
    beforeEach(() => {
      pkgDir = getModuleDirname('export-from-js');
    });

    it('writes the declaration file export-from-js.d.ts into the given directory', async () => {
      const outDir = await fs.mkdtemp(path.join(os.tmpdir(), 'drm-test-'));
      const filename = path.join(outDir, 'export-from-js.d.ts');

      await cli(pkgDir, {outDir});

      const fileContents = await fs.readFile(filename);
      expect(fileContents.toString()).toMatchSnapshot();

      return fs.remove(outDir);
    });
  });
});
