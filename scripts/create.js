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
const chalk = require('chalk');
const { Plop, run } = require('plop');
const args = process.argv.slice(2);
const argv = require('minimist')(args);

console.log(chalk.blue.bold('Create a new liveui project:'));

const config = path.resolve(__dirname, '..', 'generators/index.js');

Plop.launch({
	cwd: argv.cwd,
	configPath: config,
	require: argv.require,
	completion: argv.completion
}, run);