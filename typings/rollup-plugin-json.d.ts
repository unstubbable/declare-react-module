/// <reference types="rollup" />

declare module 'rollup-plugin-json' {
  import {Plugin} from 'rollup';

  namespace json {
    export interface Options {
      include?: string | string[];
      exclude?: string | string[];
      preferConst?: boolean;
      indent?: string;
    }
  }
  function json(options?: json.Options): Plugin;

  export = json;
}
