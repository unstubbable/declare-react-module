# declare-react-module

[![npm][npm-badge]][npm]
[![build][travis-ci-badge]][travis-ci]
[![codecov](https://codecov.io/gh/KingHenne/declare-react-module/branch/master/graph/badge.svg)](https://codecov.io/gh/KingHenne/declare-react-module)
[![semantic-release][semantic-release-badge]][semantic-release]

Create TypeScript declaration files for React modules written in ES6.

## Usage

### Locally

1. Install `declare-react-module` as a dev dependency:

    ```sh
    npm install --save-dev declare-react-module
    ```

2. Add a new entry to `"scripts"` in your `package.json`:

    ```json
    {
      "prepublish": "declare-react-module"
    }
    ```

This will create an `index.d.ts` file in your project root before publishing to npm.

### As a Global Script

1. Install `declare-react-module` as a global dependency:

    ```sh
    npm install --global declare-react-module
    ```

2. Run `declare-react-module` from the command line:

    ```sh
    declare-react-module packages/my-package
    ```

[npm]: https://www.npmjs.com/package/declare-react-module
[npm-badge]: https://img.shields.io/npm/v/declare-react-module.svg?maxAge=3600
[semantic-release]: https://github.com/semantic-release/semantic-release
[semantic-release-badge]: https://img.shields.io/badge/%20%20%F0%9F%93%A6%F0%9F%9A%80-semantic--release-e10079.svg
[travis-ci]: https://travis-ci.org/KingHenne/declare-react-module
[travis-ci-badge]: https://travis-ci.org/KingHenne/declare-react-module.svg?branch=master
