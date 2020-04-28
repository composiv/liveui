/**
 * liveui.config.js
 * 
 * https://liveui.composiv.ai/docs/liveui.config
 */

module.exports = {
    hotReloadContext: 'src',
    devPort: 5000,
    microPort: 5001,
    exposes: {
        'foo': './src/index.js',
    },
    shared: [
        'react',
        'react-dom',
        'react-native',
    ],
    // remotes: {
    //     foo: 'http://localhost:5001/foo',
    //     bar: 'http://localhost:5001/bar',
    // },
    // shares: {
    //     react: require('react'),
    //     'react-dom': require('react-dom'),
    //     'react-native': require('react-native'),
    // },
}
