import { defineConfig } from '@rslib/core';

export default defineConfig({
  source: {
    tsconfigPath: './tsconfig.lib.json',
  },
  lib: [
    {
      format: 'esm',
      syntax: 'es2021',
      bundle: false,
      dts: {
        bundle: false,
        build: false,
        distPath: './dist',
      },
      source: {
        entry: {
          index: ['src/**/*.ts'],
        },
      },
    },
    {
      format: 'cjs',
      syntax: 'es2021',
      dts: false,
      bundle: false,
      source: {
        entry: {
          index: ['src/**/*.ts'],
        },
      },
    },
  ],
  output: {
    target: 'web',
  },
});
