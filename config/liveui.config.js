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
