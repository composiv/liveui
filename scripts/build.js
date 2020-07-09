/**
 * Copyright Composiv Inc and its affiliates
 * 
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 * 
 *   http://www.apache.org/licenses/LICENSE-2.0
 * 
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
*/

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