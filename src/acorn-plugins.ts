import * as acorn from 'acorn';

const plugins = [
  require('acorn-jsx/inject'),
  require('acorn-stage3/inject'),
  require('acorn-object-rest-spread/inject'),
  require('acorn-static-class-property-initializer/inject'),
  require('acorn-es7'),
];

export function injectPlugins(): typeof acorn {
  return plugins.reduce((currentAcorn, inject) => inject(currentAcorn), acorn);
}
