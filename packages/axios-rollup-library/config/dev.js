import babel from 'rollup-plugin-babel';
import nodeResolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import json from 'rollup-plugin-json';
import changeCase from 'change-case';
import builtins from 'rollup-plugin-node-builtins';
import globals from 'rollup-plugin-node-globals';

// Require understands JSON files.
import packageJson from '../package.json';

const peerDependencies = Object.keys(packageJson.peerDependencies);

const input = 'src/index.js';
const name = changeCase.camelCase(packageJson.title);

const replaceMinJsExtension = filename => filename.replace('.min.js', '.js');

// External dependencies tell Rollup "it's ok that you can't resolve these modules;
// don't try to bundle them but rather leave their import statements in place"
const external = [
  ...peerDependencies,
  'http', // imported by axios
  'https', // imported by axios
  'url', // imported by follow-redirects
  'assert', // imported by follow-redirects
  'stream', // imported by follow-redirects
  'tty', // imported by follow-redirects
  'util', // imported by follow-redirects
  'zlib', // imported by axios
];

const globalDependencies = {};

const plugins = [
  // Node modules resolution
  nodeResolve({
    extensions: ['.js', '.jsx'],
    browser: true,
  }),

  // Let's transpile our own ES6 code into ES5
  babel({ exclude: 'node_modules/**' }),

  // Most packages in node_modules are legacy CommonJS, so let's convert them to ES
  commonjs(),

  json({
    exclude: 'node_modules/**',
    preferConst: true,
    indent: '  ',
  }),
  globals(),
  builtins(),
];

// browser-friendly UMD build
const configUMD = {
  input,
  sourcemap: true,
  output: {
    file: replaceMinJsExtension(packageJson.browser),
    format: 'umd',
  },
  name,
  plugins,
  external,
  globals: globalDependencies,
};

// CommonJS (for Node) and ES module (for bundlers) build.
// (We could have three entries in the configuration array
// instead of two, but it's quicker to generate multiple
// builds from a single configuration where possible, using
// an array for the `output` option, where we can specify
// `file` and `format` for each target)
const configCjsAndEs = {
  input,
  sourcemap: true,
  output: [
    {
      file: replaceMinJsExtension(packageJson.main),
      format: 'cjs',
    },
    {
      file: replaceMinJsExtension(packageJson.module),
      format: 'es',
    },
  ],
  plugins,
  external,
  globals: globalDependencies,
};

export default [configUMD, configCjsAndEs];
