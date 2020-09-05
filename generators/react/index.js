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
 * Container Generator
 */
const fs = require('fs-extra');
const spawn = require('cross-spawn');
const chalk = require('chalk');
const path = require('path');
const projectExists = require('../utils/projectExists');

module.exports = plop => ({
  description: 'Create a liveui react project',
  prompts: [
    {
      type: 'input',
      name: 'name',
      message: 'Project name:',
      default: 'liveui-react-app',
      validate: value => {
        if (/.+/.test(value)) {
          return projectExists(value)
            ? `${chalk.red('A project with this name already exists:')} \n`
            + `${chalk.green(value)} \n`
            + 'Either try using a new directory name, or remove the folder listed above.'
            : true;
        }

        return 'The name is required';
      },
    },
  ],
  actions: data => {
    const appPath = path.resolve(process.cwd(), data.name);
    console.log(`Creating a new liveui React app in ${chalk.green(appPath)}.`);

    const actions = [
      {
        type: 'add',
        path: path.resolve(appPath, 'package.json'),
        templateFile: './react/package.json.hbs',
        abortOnFail: true,
      },
      {
        type: 'add',
        path: path.resolve(appPath, '.gitignore'),
        templateFile: './react/.gitignore.hbs',
        abortOnFail: true,
      },
      function copyStaticFiles() {
        const source = path.resolve(__dirname, 'static');

        if (!fs.existsSync(appPath)) {
          fs.mkdirSync(appPath);
        }

        fs.copySync(source, appPath);
        return plop.renderString('Copying static files complete!')
      },
      function installDependenciesAndFinish() {
        console.log('Installing packages. This might take a couple of minutes.')

        const proc = spawn.sync('npm', ['install'], { cwd: appPath, stdio: 'inherit' });

        if (proc.status !== 0) {
          console.error('');
          return 'npm install failed';
        }

        console.log();
        console.log(`${chalk.green.bold('Success!')} Created ${data.name} at ${chalk.cyan.bold(appPath)}`);
        console.log('Inside that directory, you can run several commands:');
        console.log();
        console.log(chalk.blue.bold('npm start'));
        console.log('    Starts the development server.');
        console.log(chalk.blue.bold('npm run build'));
        console.log('    Bundles the components into static files for production.');
        console.log();
        console.log('We suggest that you begin by typing:');
        console.log();
        console.log(chalk.blue.bold('  cd'), data.name);
        console.log(`  ${chalk.blue.bold('npm start')}`);  
        console.log();

        return chalk.green('Project creation complete!');
      },
      chalk.blue('Happy coding!')
    ];

    return actions;
  },
});
