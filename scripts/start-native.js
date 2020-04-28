const webpack = require('webpack');
const WebpackDevServer = require('webpack-dev-server');

const config = require('../config/webpack.config.js');
const { liveuiConfig, generateRewrites, generateInfoPage } = require('../utils/dev-utils');

const { exposes } = liveuiConfig;
const infoPage = generateInfoPage(liveuiConfig);
const rewrites = generateRewrites(exposes);
const contentBase = '../docker/dist';
const compress = liveuiConfig.compress || true;
const hot = liveuiConfig.hot || true;
const port = liveuiConfig.microPort || 5001;
const quiet = liveuiConfig.quiet || false;
const noInfo = liveuiConfig.noInfo || false;

config.mode = 'development';
config.devtool = 'eval-source-map';

const liveServer = new WebpackDevServer(webpack(config), {
  https: false,
  disableHostCheck: true,
  contentBase,
  compress,
  hot,
  inline: false,
  port,
  quiet,
  noInfo,
  historyApiFallback: {
    rewrites: [
      ...rewrites,
      { from: /\//, to: '/' }
    ]
  },
  after(app) {
    app.get("/", (req, res) => {
      res.send(infoPage);
    });
  }
});

liveServer.listen(port, 'localhost', function (err) {
  if (err) {
    console.log(err);
  }
  console.log('WebpackDevServer listening at localhost:', port);
});