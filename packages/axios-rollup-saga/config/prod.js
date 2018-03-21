// import uglify from 'rollup-plugin-uglify-es';
import configs from './dev';
import cloneDeep from 'lodash/cloneDeep';

const minifyFilename = filename => filename.replace('.js', '.min.js');
const minifyOutput = output =>
  Object.assign({}, output, { file: minifyFilename(output.file) });

// Use array spread to copy-by-value
let minified = cloneDeep(configs);
minified = minified.map(config => {
  // Inject the production settings.
  if (config.output.constructor === Array) {
    config.output = config.output.map(outputObject =>
      minifyOutput(outputObject)
    );
  } else {
    config.output.file = minifyFilename(config.output.file);
  }

  if (config.plugins) {
    // config.plugins.push(uglify());
  }

  return config;
});

export default [...configs, ...minified];
