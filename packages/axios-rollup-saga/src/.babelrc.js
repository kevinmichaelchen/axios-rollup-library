var NODE_ENV = process.env.NODE_ENV;

var modules = NODE_ENV === 'test' ? 'commonjs' : false;

var config = {
  presets: [
    [
      'env',
      {
        loose: true,
        modules: modules,
        forceAllTransforms: NODE_ENV === 'production',
      },
    ],
  ],
  plugins: [
    'external-helpers',
    'transform-regenerator',
    'transform-object-rest-spread',
    [
      'transform-runtime',
      {
        helpers: false,
        polyfill: false,
        regenerator: true,
        moduleName: 'rollup-regenerator-runtime',
      },
    ],
  ],
};

module.exports = config;
