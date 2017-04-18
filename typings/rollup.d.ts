/// <reference path="../node_modules/@types/acorn/index.d.ts" />

declare module 'rollup' {
  export type Format = 'amd' | 'cjs' | 'es' | 'iife' | 'umd';

  export interface Warning {
    code: string;
    message: string;
    loc?: {
      file: string;
      line: number;
      column: number;
    };
    frame?: string;
  }

  export interface Plugin {
    /**
     * The name of the plugin, for use in error messages and warnings.
     */
    name?: string;
    /**
     * A function that replaces or manipulates the options object passed
     * to `rollup.rollup`.
     */
    options?(options: RollupOptions): RollupOptions;
    /**
     * A custom `id => code` loader. Returning `null` or `undefined` defers
     * to other load functions (and eventually the default behavior of
     * loading from the file system).
     */
    load?(id: string): string | null | undefined;
    /**
     * A custom `(importee, importer) => id` resolver (useful for e.g.
     * locating third-party dependencies). Returning `null` or `undefined`
     * defers to other `resolveId` functions (and eventually the default
     * resolution behavior); returning any other falsy value signals that
     * `importee` should be treated as an external module and not included
     * in the bundle.
     */
    resolveId?(importee: string, importer: string): string | null;
    /**
     * A module transformer function.
     */
    transform?(source: string, id: string): string | Bundle;
    /**
     * A bundle transformer function.
     */
    transformBundle?(source: string, options: {format: Format}):
      string | Bundle;
    /**
     * Function hook called when `bundle.generate()` is being executed.
     */
    ongenerate?(options: BundleGenerateOptions, bundle: Bundle): void;
    /**
     * Function hook called when `bundle.write()` is being executed, after
     * the file has been written to disk.
     */
    onwrite?(options: BundleWriteOptions, bundle: Bundle): void;
    /**
     * A function for generating intro text.
     */
    intro?(): string;
    /**
     * A function for generating outro text.
     */
    outro?(): string;
    banner?: string | (() => string); // tslint:disable-line member-ordering
    footer?: string | (() => string); // tslint:disable-line member-ordering
  }

  // tslint:disable prefer-method-signature
  export interface RollupOptions {
    /**
     * The bundle's entry point (e.g. your main.js or app.js or index.js)
     */
    entry: string;
    /**
     * A previous bundle. Use it to speed up subsequent bundles.
     */
    cache?: object;
    /**
     * Either...
     * Function that takes an id and returns true (external) or false
     * (not external), or...
     * Array of strings. A list of IDs of modules that should remain
     * external to the bundle. The IDs should be either:
     *   1. the name of an external dependency
     *   2. a resolved ID (like an absolute path to a file)
     */
    external?: ((id: string) => boolean) | string[];
    /**
     * Function that takes an ID and returns a path, or Object of `id: path`
     * pairs. Where supplied, these paths will be used in the generated
     * bundle instead of the module ID.
     */
    paths?: (id: string) => string | {[id: string]: string};
    /**
     * Function that will intercept warning messages. If not supplied,
     * warnings will be deduplicated and printed to the console.
     */
    onwarn?: (warning: Warning) => void;
    /**
     * Array of plugin objects (or a single plugin object).
     */
    plugins?: Plugin[] | Plugin;
    /**
     * Whether or not to apply tree-shaking.
     */
    treeshake?: boolean;
    /**
     * Any options that should be passed through to Acorn.
     */
    acorn?: acorn.Options;
    /**
     * By default, the context of a module – i.e., the value of this
     * at the top level – is undefined. In rare cases you might need
     * to change this to something else, like 'window'.
     */
    context?: any; // tslint:disable-line no-any
    /**
     * Same as options.context, but per-module – can either be an object
     * of `id: context` pairs, or an `id => context` function.
     */
     // tslint:disable-next-line no-any
    moduleContext?: {[id: string]: any} | ((id: string) => any);
    /**
     * Adds support for very old environments like IE8, at the cost of
     * some extra code.
     */
    legacy?: boolean;
  }

  export interface BundleOptions {
    /**
     * The format of the generated bundle.
     */
    format?: Format;
    /**
     * What export mode to use. Defaults to auto, which guesses your
     * intentions based on what the entry module exports.
     */
    exports?: 'default' | 'named' | 'none';
    /**
     * An ID to use for AMD/UMD bundles.
     */
    moduleId?: string;
    /**
     * The name to use for the module for UMD/IIFE bundles
     * (required for bundles with exports).
     */
    moduleName?: string;
    /**
     * Object of `id: name` pairs (e.g. with `import Backbone from 'backbone'`,
     * `backbone` is the `id`, `Backbone` is the global `name`, as in
     * `window.Backbone`), used for UMD/IIFE bundles.
     * Alternatively, supply a function that will turn an external module ID
     * into a global.
     */
    globals?: {[id: string]: string} | ((id: string) => string);
    /**
     * The indent string to use, for formats that require code to be indented
     * (AMD, IIFE, UMD).
     * Can also be false (no indent), or true (the default – auto-indent)
     */
    indent?: string | boolean;
    /**
     * Whether or not to add an 'interop block'. By default (`interop: true`),
     * for safety's sake, Rollup will assign any external dependencies'
     * `default` exports to a separate variable if it's necessary to
     * distinguish between default and named exports. This generally only
     * applies if your external dependencies were transpiled (for example with
     * Babel) – if you're sure you don't need it, you can save a few bytes
     * with `interop: false`.
     */
    interop?: boolean;
    /**
     * A string to prepend to the bundle. (Note: will not break sourcemaps)
     */
    banner?: string;
    /**
     * A string to append to the bundle. (Note: will not break sourcemaps)
     */
    footer?: string;
    /**
     * Similar to banner, except that the code goes inside any format-specific
     * wrapper.
     */
    intro?: string;
    /**
     * Similar to footer, except that the code goes inside any format-specific
     * wrapper.
     */
    outro?: string;
    /**
     * Whether to include the 'use strict' pragma at the top of generated
     * non-ES6 bundles (defaults to `true`).
     * Strictly-speaking, ES6 modules are always in strict mode, so you
     * shouldn't disable this without good reason.
     */
    useStrict?: boolean;
  }

  export interface BundleGenerateOptions extends BundleOptions {
    /**
     * Whether to generate a sourcemap. If `true`, the return value from
     * `bundle.generate(...)` will include a `map` property, which is a
     * sourcemap with two methods:
     *   - `map.toString()` – shorthand for `JSON.stringify(map)`
     *   - `map.toUrl()` – generates a data URI, suitable for appending
     *     to a file
     */
    sourceMap?: boolean;
    /**
     * The location of the generated bundle. If this is an absolute path,
     * all the sources paths in the sourcemap will be relative to it.
     * The `map.file` property is the basename of `sourceMapFile`, as the
     * location of the sourcemap is assumed to be adjacent to the bundle.
     */
    sourceMapFile?: string;
  }

  export interface BundleWriteOptions extends BundleOptions {
    /**
     * The file to write to. If `options.sourceMap === true`, two files
     * will be created – `dest` and `dest + '.map'`.
     */
    dest: string;
    /**
     * If `true`, a separate sourcemap file will be created. If `inline`, the
     * sourcemap will be appended to the resulting `dest` file as a data URI.
     */
    sourceMap?: boolean | 'inline';
  }

  export interface Bundle {
    code: string;
    map?: string;
  }

  export interface BundleFactory {
    /**
     * Returns a `{ code, map }` object, where `map` is a sourcemap, assuming
     * the `sourceMap: true` option is set.
     * No options are required, but `format` is highly recommended.
     */
    generate(options?: BundleGenerateOptions): Bundle;
    /**
     * Similar to `bundle.generate`, except that it writes the file (and
     * accompanying sourcemap file, if appropriate) to the file system.
     */
    write(options: BundleWriteOptions): Promise<void>;
  }

  export function rollup(options: RollupOptions): Promise<BundleFactory>;
}
