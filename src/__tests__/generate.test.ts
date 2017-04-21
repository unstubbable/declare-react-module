import {generateTypings} from '../generate';
import {getModules} from './helper';

getModules().forEach(({name, entry}) => {
  it(`generates typings for module ${name}`, async () => {
    const typings = await generateTypings(name, entry);
    expect(typings).toMatchSnapshot();
  });
});
