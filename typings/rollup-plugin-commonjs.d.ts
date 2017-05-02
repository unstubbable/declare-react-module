/// <reference path="../typings/rollup.d.ts" />

declare module 'rollup-plugin-commonjs' {
  import {Plugin} from 'rollup';

  namespace commonjs {
    interface Options {
      /**
       * A minimatch pattern, or an array of minimatch patterns,
       * relative to `process.cwd()`. (Default: undefined)
       */
      include?: string | string[];
      /**
       * A minimatch pattern, or an array of minimatch patterns,
       * relative to `process.cwd()`. (Default: undefined)
       */
      exclude?: string | string[];
      /**
       * Search for files other than .js files (must already be transpiled
       * by a previous plugin!). (Default: `['.js']`)
       */
      extensions?: string[];
      /**
       * If true then uses of `global` won't be dealt with by this plugin.
       * (Default: false)
       */
      ignoreGlobal?: boolean;
      /**
       * If false then skip sourceMap generation for CommonJS modules.
       */
      sourceMap?: boolean;
      /**
       * Explicitly specify unresolvable named exports.
       * Left-hand side can be an absolute path, a path relative to the
       * current directory, or the name of a module in node_modules.
       */
      namedExports?: {[id: string]: string[]};
      /**
       * Sometimes you have to leave require statements unconverted.
       * Pass an array containing the IDs or a `id => boolean` function.
       * Only use this option if you know what you're doing!
       */
      ignore?: string[];
    }
  }
  function commonjs(options?: commonjs.Options): Plugin;

  export = commonjs;
}
