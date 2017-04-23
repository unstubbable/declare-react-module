import {generateFromSource} from 'react-to-typescript-definitions';
import {rollup} from 'rollup';
import jsx = require('rollup-plugin-jsx');
import resolve = require('rollup-plugin-node-resolve');
import {
  replaceWithEmptyModule
} from './rollup-plugin-replace-with-empty-module';

export interface BundleOptions {
  external?: ((id: string) => boolean) | string[];
  replaceWithEmptyModulePatterns?: string[];
}

const defaultBundleOptions = {
  replaceWithEmptyModulePatterns: ['**/*.css']
};

async function generateBundleCode(
  entry: string,
  options?: BundleOptions
): Promise<string> {
  options = {...defaultBundleOptions, ...options};

  const bundle = await rollup({
    entry,
    external: options.external,
    plugins: [
      replaceWithEmptyModule(options.replaceWithEmptyModulePatterns),
      resolve({extensions: ['.js', '.jsx']}),
      jsx({factory: 'React.createElement'})
    ]
  });

  return bundle.generate({format: 'es'}).code;
}

export async function generateTypings(
  moduleName: string,
  entry: string,
  options?: BundleOptions
): Promise<string> {
  const code = await generateBundleCode(entry, options);
  return generateFromSource(moduleName, code);
}
