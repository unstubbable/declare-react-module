'use strict';

module.exports = function (wallaby) {
  return {
    env: {
      type: 'node'
    },
    files: [
      'src/**/*.{js,jsx,ts,tsx}',
      '!**/__tests__/**/*.test.{ts,tsx}',
      'tsconfig.json',
      'node_modules/ts-config/tsconfig.json'
    ],
    testFramework: 'jest',
    tests: [
      '**/__tests__/**/*.test.{ts,tsx}'
    ],
    delays: {
      run: 500
    }
  };
};
