import swc from 'unplugin-swc';
import tsconfigPaths from 'vite-tsconfig-paths';
import { defineConfig } from 'vitest/config';

export default defineConfig({
  cacheDir: '.vitest',
  test: {
    setupFiles: ['tests/init-test.ts'],
    environment: 'happy-dom',
    include: ['tests/**/*.spec.ts'],
    globals: true,
    restoreMocks: true,
    coverage: {
      // you can include other reporters, but 'json-summary' is required, json is recommended
      reporter: ['text', 'json-summary', 'json'],
      // If you want a coverage reports even if your tests are failing, include the reportOnFailure option
      reportOnFailure: true,
      exclude: [
        'vitest.config.ts',
        'rslib.config.ts',
        'scripts/**',
        'examples/**',
        'dist/**',
      ],
    },
  },
  plugins: [
    tsconfigPaths(),
    swc.vite({
      include: /\.[mc]?[jt]sx?$/,
      // for git+ package only
      exclude: [] as any,
      tsconfigFile: './tsconfig.spec.json',
    }),
  ],
});
