/// <reference path="../typings/rollup.d.ts" />

declare module 'rollup-plugin-node-resolve' {
  import {Opts as NodeResolveOptions} from 'resolve';
  import {Plugin} from 'rollup';

  namespace resolve {
    interface Options {
      /**
       * Use "module" field for ES6 module if possible (Default: true).
       */
      module?: boolean;
      /**
       * Use "jsnext:main" if possible. (Default: false)
       * see https://github.com/rollup/rollup/wiki/jsnext:main
       */
      jsnext?: boolean;
      /**
       * Use "main" field or index.js, even if it's not an ES6 module.
       * (Default: true) Needs to be converted from CommonJS to ES6.
       * see https://github.com/rollup/rollup-plugin-commonjs
       */
      main?: boolean;
      /**
       * Some package.json files have a `browser` field which specifies
       * alternative files to load for people bundling for the browser.
       * If that's you, use this option, otherwise `pkg.browser` will be
       * ignored. (Default: false)
       */
      browser?: boolean;
      /**
       * Not all files you want to resolve are .js files. (Default: ['.js'])
       */
      extensions?: string[];
      /**
       * Whether to prefer built-in modules (e.g. `fs`, `path`) or local ones
       * with the same names. (Default: true)
       */
      preferBuiltins?: boolean;
      /**
       * Lock the module search in this path (like a chroot). Modules defined
       * outside this path will be marked has external. (Default: '/')
       */
      jail?: string;
      /**
       * If true, inspect resolved files to check that they are ES2015 modules.
       * (Default: false)
       */
      modulesOnly?: boolean;
      /**
       * Any additional options that should be passed through to `node-resolve`.
       */
      customResolveOptions?: NodeResolveOptions;
    }
  }
  function resolve(options?: resolve.Options): Plugin;

  export = resolve;
}
