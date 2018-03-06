import builtinModules from 'builtin-modules';
import {generateFromSource} from 'react-to-typescript-definitions';
import {rollup} from 'rollup';
import commonjs from 'rollup-plugin-commonjs';
import json from 'rollup-plugin-json';
import resolve from 'rollup-plugin-node-resolve';
import {injectPlugins} from './acorn-plugins';
import {debug} from './debug';
import {replaceWithEmptyModule} from './rollup-plugin-replace-with-empty-module';

export interface BundleOptions {
  external?: ((id: string) => boolean) | string[];
  replaceWithEmptyModulePatterns?: string[];
}

const defaultBundleOptions = {
  external: builtinModules.concat(['react', 'prop-types']),
  replaceWithEmptyModulePatterns: ['**/*.css'],
};

async function generateBundleCode(
  input: string,
  options?: BundleOptions
): Promise<string> {
  options = {...defaultBundleOptions, ...options};

  const bundle = await rollup({
    input,
    external: options.external,
    plugins: [
      replaceWithEmptyModule(options.replaceWithEmptyModulePatterns),
      resolve({
        extensions: ['.js', '.jsx'],
        jsnext: true,
        preferBuiltins: true,
      }),
      json(),
      commonjs(),
    ],
    preserveSymlinks: false,
    acorn: {
      plugins: {
        jsx: true,
        staticClassPropertyInitializer: true,
      },
    },
    acornInjectPlugins: [injectPlugins],
  });

  const {code} = await bundle.generate({format: 'es'});
  debug(code);

  return code;
}

export async function generateTypings(
  moduleName: string,
  input: string,
  options?: BundleOptions
): Promise<string> {
  const code = await generateBundleCode(input, options);
  const typings = generateFromSource(moduleName, code);

  return normalizeLineEndings(typings);
}

function normalizeLineEndings(text: string): string {
  return text.replace(/\r\n/g, '\n');
}
