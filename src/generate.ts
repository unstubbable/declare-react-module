import {generateFromSource} from 'react-to-typescript-definitions';
import {rollup} from 'rollup';
import jsx = require('rollup-plugin-jsx');
import resolve = require('rollup-plugin-node-resolve');
import {
  replaceWithEmptyModule
} from './rollup-plugin-replace-with-empty-module';

async function generateBundleCode(entry: string): Promise<string> {
  const bundle = await rollup({
    entry,
    plugins: [
      replaceWithEmptyModule(['**/*.css']),
      resolve({
        extensions: ['.js', '.jsx']
      }),
      jsx({factory: 'React.createElement'})
    ]
  });
  return bundle.generate({format: 'es'}).code;
}

export async function generateTypings(
  moduleName: string,
  entry: string
): Promise<string> {
  const code = await generateBundleCode(entry);
  return generateFromSource(moduleName, code);
}
