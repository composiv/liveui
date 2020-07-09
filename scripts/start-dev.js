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
const webpack = require('webpack');
const WebpackDevServer = require('webpack-dev-server');

const { appDirectory, liveuiConfig } = require('../utils/dev-utils');
const config = require('../config/webpack.dev-config.js');

const contentBase = path.resolve(appDirectory, 'public');
const compress = liveuiConfig.compress || true;
const hot = liveuiConfig.hot || true;
const port = liveuiConfig.devPort || 5000;
const noInfo = liveuiConfig.noInfo || false;
const quiet = liveuiConfig.quiet || false;

const devServer = new WebpackDevServer(webpack(config), {
  contentBase,
  compress,
  hot,
  port,
  noInfo,
  quiet
});

devServer.listen(port, 'localhost', function (err) {
  if (err) {
    console.log(err);
  }
  console.log('WebpackDevServer listening at localhost:', port);
});