import cssModulesPlugin from 'esbuild-css-modules-plugin';

export const common = {
  bundle: true,
  sourcemap: true,
  entryPoints: ['src/index.tsx'],
  outfile: 'public/build/index.js',
  plugins: [cssModulesPlugin()],
};
