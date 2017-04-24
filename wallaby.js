'use strict';

module.exports = function (wallaby) {
  return {
    env: {
      type: 'node'
    },
    files: [
      'src/**/*.{ts,tsx}',
      '!src/**/__tests__/**/*.test.{ts,tsx}',
      {
        pattern: 'src/**/__tests__/**/*.{js,jsx,json}',
        load: false,
        instrument: false
      },
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
