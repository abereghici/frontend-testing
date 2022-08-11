import {build} from 'esbuild';
import pkg from '../package.json' assert {type: 'json'};
import {common} from './common.mjs';

build({
  ...common,
  minify: true,
  external: Object.keys(pkg.dependencies),
})
  .then(() => console.log('⚡ Done'))
  .catch(() => process.exit(1));
