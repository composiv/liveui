const path = require('path');
const webpack = require('webpack');
const chalk = require('chalk');
const CopyPlugin = require('copy-webpack-plugin');

const config = require('../config/webpack.config.js');

config.mode = 'production';
config.plugins = [
    new CopyPlugin([
        {
            from: path.join(__dirname, '..', 'utils/resources/docker'),
            to: path.join(process.cwd(), 'docker/'),
            toType: 'dir'
        },
    ]),
]
const compiler = webpack(config);

compiler.run((err, stats) => { // Stats Object
    if (err) {
        console.log(err);
    }
    else {
        console.log('Creating an optimized production build...');
        console.log(chalk.green('Compiled successfully.'));
        console.log(`You can find your build under the ${chalk.blueBright('docker')} folder.`);
    }
});