const chalk = require('chalk');

const banner = [
	' _ _              _',
	'| (_)_ _____ _  _(_)',
	'| | \\ V / -_) || | |',
	'|_|_|\\_/\\___|\\_,_|_|',
	'https://liveui.composiv.ai',
	''
];

module.exports = chalk.blue.bold(banner.join('\n'));