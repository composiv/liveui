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
 * generators/index.js
 *
 * Exports the generators so plop knows them
 */

const react = require('./react/index.js');
const reactNative = require('./react-native/index.js');

// TODO plop files should be parametirezed

module.exports = plop => {
  plop.setWelcomeMessage('Please choose a project type.');
  plop.setGenerator('react', react(plop));
  plop.setGenerator('react-native', reactNative(plop));
};
