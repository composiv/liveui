#!/usr/bin/env node

/**
 * Copyright (c) 2015-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

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


// Makes the script crash on unhandled rejections instead of silently
// ignoring them. In the future, promise rejections that are not handled will
// terminate the Node.js process with a non-zero exit code.
process.on('unhandledRejection', err => {
    throw err;
});

const spawn = require('cross-spawn');
const banner = require('../utils/banner');
const args = process.argv.slice(2);

console.log(banner);

const scriptIndex = args.findIndex(
    x => x === 'create' || x === 'build' || x === 'start' || x === 'start-native' || x === 'start-live' || x === 'start-dev' || x === 'init'
);
const script = scriptIndex === -1 ? 'create' : args[scriptIndex];
const nodeArgs = scriptIndex > 0 ? args.slice(0, scriptIndex) : [];

if (['create', 'build', 'start', 'start-native', 'start-live', 'start-dev', 'init'].includes(script)) {
    const result = spawn.sync(
        'node',
        nodeArgs
            .concat(require.resolve('../scripts/' + script))
            .concat(args.slice(scriptIndex + 1)),
        { stdio: 'inherit' }
    );
    if (result.signal) {
        if (result.signal === 'SIGKILL') {
            console.log(
                'The build failed because the process exited too early. ' +
                'This probably means the system ran out of memory or someone called ' +
                '`kill -9` on the process.'
            );
        } else if (result.signal === 'SIGTERM') {
            console.log(
                'The build failed because the process exited too early. ' +
                'Someone might have called `kill` or `killall`, or the system could ' +
                'be shutting down.'
            );
        }
        process.exit(1);
    }
    process.exit(result.status);
} else {
    console.log('Unknown script "' + script + '".');
    console.log('Perhaps you need to update liveui?');
}