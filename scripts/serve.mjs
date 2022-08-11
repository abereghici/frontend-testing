import esbuild from 'esbuild';
import server from 'live-server';
import {common} from './common.mjs';

await esbuild
  .build({
    ...common,
    incremental: true,
    watch: true,
    logLevel: 'info',
  })
  .then(() => console.log('⚡ Done'))
  .catch(() => process.exit(1));

server.start({
  open: true,
  port: process.env.PORT || 3000,
  root: 'public',
});
