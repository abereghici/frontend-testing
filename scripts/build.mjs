import {build} from 'esbuild';
import {common} from './common.mjs';

// https://github.com/eslint/eslint/discussions/15305
// import pkg from '../package.json' assert {type: 'json'};
import {readFileSync} from 'fs';
const pkg = JSON.parse(readFileSync('./package.json'));

build({
  ...common,
  minify: true,
  external: Object.keys(pkg.dependencies),
})
  .then(() => console.log('⚡ Done'))
  .catch(() => process.exit(1));
