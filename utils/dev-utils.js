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

const fs = require('fs');
const path = require('path');
const chalk = require('chalk');

const args = process.argv.slice(2);
const appDirectory = fs.realpathSync(process.cwd());
const liveuiConfig = resolveLiveuiConfig();

// generates webpack.config.externals
function generateExternals(shared) {
  const externals = {};

  shared.forEach(external => {
    externals[external] = `commonjs ${external}`;
  });

  return externals;
}

// generates webpack.config.entry
function generateEntry(exposes) {
  const entry = {};

  Object.keys(exposes).forEach(module => {
    const modulePath = exposes[module];
    entry[module] = path.join(process.cwd(), modulePath);
  })

  return entry;
}

function resolveLiveuiConfig() {
  const customLiveuiConfigPath = path.resolve(appDirectory, 'liveui.config.js');
  const defaultLiveuiConfig = require('../config/liveui.config.js');

  let customLiveuiConfig;

  if (fs.existsSync(customLiveuiConfigPath)) {
    customLiveuiConfig = require(customLiveuiConfigPath);
  }

  if (args[0]) {
    const configPath = path.resolve(appDirectory, args[1].toString());

    if (fs.existsSync(configPath)) {
      customLiveuiConfig = require(configPath);
    } else {
      throw new Error(`No configuration file found: ${chalk.red(configPath)}`);
    }
  }

  return { ...defaultLiveuiConfig, ...customLiveuiConfig };
}

function generateRewrites(entries) {
  return Object.keys(entries).map(entry => {
    console.log(`[This file will be served] ${entry} -> ${entries[entry]}`);
    return {
      from: new RegExp(`/${entry}`),
      to: `/${entry}.js`,
    };
  });
}



function generateInfoPage(config, libName) {
  const { exposes, microPort } = config;
  let infoPage;
  let remotesArea = '';
  let remoteComponentsArea = '';
  let remoteComponentsAreaAlternative = '';

  Object.keys(exposes).forEach((componentName, index) => {
    remotesArea += `<pre lang="no-highlight"><code><a href="http://localhost:${microPort}/${componentName}">http://localhost:${microPort}/${componentName}</a></code></pre>`;

    remoteComponentsArea += `${index !== 0 ? '\n' : ''}<span class="pl-k">const</span> <span class="pl-v">${componentName[0].toUpperCase() + componentName.slice(1)}</span> <span class="pl-c1">=</span> <span class="pl-s1">props</span> <span class="pl-c1">=&gt;</span> <span class="pl-c1">&lt;</span><span class="pl-ent">RemoteComponent</span> <span class="pl-c1">name</span><span class="pl-c1">=</span><span class="pl-s">"${componentName}"</span> <span class="pl-kos">{</span>...<span class="pl-s1">props</span><span class="pl-kos">}</span> /<span class="pl-c1">&gt;</span>`
    
    remoteComponentsAreaAlternative += `${index !== 0 ? '\n' : ''}<span class="pl-k">const</span> <span class="pl-v">${componentName[0].toUpperCase() + componentName.slice(1)}</span> <span class="pl-c1">=</span> <span class="pl-s1">props</span> <span class="pl-c1">=&gt;</span> <span class="pl-c1">&lt;</span><span class="pl-ent">RemoteComponent</span> <span class="pl-c1">url</span><span class="pl-c1">=</span><span class="pl-s">"http://localhost:${microPort}/${componentName}"</span> <span class="pl-kos">{</span>...<span class="pl-s1">props</span><span class="pl-kos">}</span> /<span class="pl-c1">&gt;</span>`
  });

  infoPage = fs.readFileSync(path.join(__dirname, 'resources/InfoPage', 'index.html'), 'utf8');
  infoPage = infoPage.replace(/XXLIB/g, libName);
  infoPage = infoPage.replace("XXREMOTESAREA", remotesArea);
  infoPage = infoPage.replace("XXREMOTECOMPONENTSAREA", remoteComponentsArea);
  infoPage = infoPage.replace("XXREMOTECOMPONENTSAREAALT", remoteComponentsAreaAlternative);
  infoPage = infoPage.replace("XXHRC", config.hotReloadContext);
  infoPage = infoPage.replace("XXDEVPORT", config.devPort);
  infoPage = infoPage.replace("XXMICROPORT", microPort);
  infoPage = infoPage.replace("XXSHARED", config.shared);

  return infoPage;
}

module.exports = {
  appDirectory,
  liveuiConfig,
  generateExternals,
  generateEntry,
  generateRewrites,
  generateInfoPage,
};
