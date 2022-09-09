/* eslint-disable */
module.exports = {
  plugins: [
    {
      plugin: require('craco-alias'),
      options: {
        source: 'tsconfig',
        baseUrl: '.',
        tsConfigPath: './tsconfig.paths.json',
      },
    },
  ],
};
