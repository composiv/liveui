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
