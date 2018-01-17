/// <reference types="rollup" />
/// <reference types="babel-core" />

declare module 'rollup-plugin-babel' {
  import {TransformOptions} from 'babel-core';
  import {Plugin} from 'rollup';

  namespace babel {
    interface Options extends TransformOptions {
      /**
       * A boolean value indicating whether to bundle in the Babel helpers.
       */
      externalHelpers?: boolean;
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
       * An array which gives explicit control over which babelHelper functions
       * are allowed in the bundle. (by default, every helper is allowed)
       */
      externalHelpersWhitelist?: string[];
    }
  }
  function babel(options?: babel.Options): Plugin;

  export = babel;
}
