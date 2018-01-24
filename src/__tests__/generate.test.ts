import {generateTypings} from '../generate';
import {getInputFileName} from './helper';

function itGeneratesTypingsForModule(name: string): void {
  it(`generates typings for module ${name}`, async () => {
    const input = getInputFileName(name);
    const typings = await generateTypings(name, input);

    expect(typings).not.toMatch('\r\n');
    expect(typings).toMatchSnapshot();
  });
}

itGeneratesTypingsForModule('export-from-js');
itGeneratesTypingsForModule('export-from-jsx');
itGeneratesTypingsForModule('stage-2-syntax');
itGeneratesTypingsForModule('with-css-modules');
itGeneratesTypingsForModule('with-dependency');
itGeneratesTypingsForModule('with-es5-dependency');
itGeneratesTypingsForModule('with-json-dependency');
itGeneratesTypingsForModule('with-node-builtin-dependency');
