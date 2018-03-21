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
  ],
};

module.exports = config;
