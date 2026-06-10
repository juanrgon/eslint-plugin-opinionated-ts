import { defineConfig } from 'tsup'

export default defineConfig({
  entry: ['src/index.ts'],
  format: ['esm', 'cjs'],
  cjsInterop: true,
  splitting: false,
  dts: true,
  clean: true,
})
