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