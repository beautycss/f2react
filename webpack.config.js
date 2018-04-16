const webpack = require('atool-build/lib/webpack');

module.exports = function (config) {
  return Object.assign({}, config, {
    externals: {
      f2: {
        root: 'F2',
        commonjs2: 'F2',
        commonjs: 'F2',
        amd: 'F2',
      },
      react: {
        root: 'React',
        commonjs2: 'react',
        commonjs: 'react',
        amd: 'react',
      },
    },
    output: Object.assign({}, config.output, {
      library: 'createF2',
      libraryTarget: 'umd',
    }),
    plugins: config.plugins.filter(i => !(i instanceof webpack.optimize.CommonsChunkPlugin)),
  });
};
