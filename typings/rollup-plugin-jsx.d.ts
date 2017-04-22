/// <reference path="../typings/rollup.d.ts" />

declare module 'rollup-plugin-jsx' {
  import {Plugin} from 'rollup';

  namespace jsx {
    interface Options {
      /**
       * Factory function name for element creation.
       */
      factory?: string;
    }
  }
  function jsx(options?: jsx.Options): Plugin;

  export = jsx;
}
