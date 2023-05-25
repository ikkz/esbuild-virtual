# Esbuild virtual plugin

Load module from memory

## Install

```bash
pnpm install -D esbuild-virtual
yarn add -D esbuild-virtual
npm install -D esbuild-virtual
```

## Import

```js
// esm
import virtual from 'esbuild-virtual';
// commonjs
const { default: virtual } = require('esbuild-virtual');
```

## Usage

```js
// simple
virtual({
  modules: [
    {
      filter: /^MODULE_NAME$/,
      result: `export default {};`,
    },
  ]
})

// specify loader
virtual({
  modules: [
    {
      filter: /^MODULE_NAME$/,
      result: () => ({
        contents: `export default {};`,
        loader: 'ts'
      }),
    },
  ]
})
```

## Options

```ts
interface Options {
  modules: Module[];
}

interface Module {
  // match import
  filter: RegExp;
  // see https://esbuild.github.io/plugins/#on-load-results
  result: string | (() => Promise<Partial<OnLoadResult>>);
}
```
