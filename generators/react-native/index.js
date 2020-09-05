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
  description: 'Create a liveui react-native project',
  prompts: [
    {
      type: 'input',
      name: 'name',
      message: 'Project name:',
      default: 'liveui-react-native-app',
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
    console.log(`Creating a new liveui React Native app in ${chalk.green(appPath)}.`);

    const actions = [
      {
        type: 'add',
        path: path.resolve(appPath, 'package.json'),
        templateFile: './react-native/package.json.hbs',
        abortOnFail: true,
      },
      {
        type: 'add',
        path: path.resolve(appPath, 'app.json'),
        templateFile: './react-native/app.json.hbs',
        abortOnFail: true,
      },
      {
        type: 'add',
        path: path.resolve(appPath, '.gitignore'),
        templateFile: './react-native/.gitignore.hbs',
        abortOnFail: true,
      },
      function copyStaticFiles() {
        const source = path.resolve(__dirname, 'static');

        if (!fs.existsSync(appPath)) {
          fs.mkdirSync(appPath);
        }

        fs.copySync(source, appPath);
        return plop.renderString('Copying static files complete!');
      },
      function installDependenciesAndFinish() {
        console.log('Installing packages. This might take a couple of minutes.')

        const proc = spawn.sync('npm', ['install'], { cwd: appPath, stdio: 'inherit' });

        if (proc.status !== 0) {
          console.error('');
          return 'npm install failed';
        }

        // if (process.platform === 'darwin') {
        //   console.log(`Installing CocoaPods dependencies ${chalk.dim(
        //     '(this may take a few minutes)',
        //   )}`);

        //   const proc = spawn.sync('npx', ['pod-install'], { cwd: appPath, stdio: 'inherit' });

        //   if (proc.status !== 0) {
        //     console.error('');
        //     return 'pod install failed';
        //   }
        // }

        console.log(`
          ${chalk.cyan(`Run instructions for ${chalk.bold('iOS')}`)}:
            • cd "${appPath}" && npx pod-install && npx react-native run-ios
          ${chalk.green(`Run instructions for ${chalk.bold('Android')}`)}:
            • Have an Android emulator running (quickest way to get started), or a device connected.
            • cd "${appPath}" && npx react-native run-android
            
          ${chalk.cyan('Starts the development server')}:
            • npm start
          ${chalk.cyan('Bundles the components into static files for production')}:
            • npm run build
        `);

        return chalk.green('Project creation complete!');
      },
      chalk.blue('Happy coding!')
    ];

    return actions;
  },
});

function validateProjectName(name) {
  if (!String(name).match(/^[$A-Z_][0-9A-Z_$]*$/i)) {
    console.error(
      '"%s" is not a valid name for a project. Please use a valid identifier ' +
      'name (alphanumeric).',
      name,
    );
    process.exit(1);
  }

  if (name === 'React') {
    console.error(
      '"%s" is not a valid name for a project. Please do not use the ' +
      'reserved word "React".',
      name,
    );
    process.exit(1);
  }
}