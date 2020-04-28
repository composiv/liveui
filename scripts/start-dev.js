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