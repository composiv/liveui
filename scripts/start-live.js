const path = require('path');
const webpack = require('webpack');
const chokidar = require('chokidar');
const WebpackDevServer = require('webpack-dev-server');

const config = require('../config/webpack.config');
const { appDirectory, liveuiConfig, generateRewrites, generateInfoPage } = require('../utils/dev-utils');

const { exposes } = liveuiConfig;
const infoPage = generateInfoPage(liveuiConfig);
const rewrites = generateRewrites(exposes);
const contentBase = '../docker/dist';
const compress = liveuiConfig.compress || true;
const hot = liveuiConfig.hot || true;
const port = liveuiConfig.microPort || 5001;
const quiet = liveuiConfig.quiet || false;
const noInfo = liveuiConfig.noInfo || false;
const hotReloadContext = liveuiConfig.hotReloadContext || 'src';

config.mode = 'development';
config.devtool = 'eval-source-map';

const liveServer = new WebpackDevServer(webpack(config), {
  contentBase,
  compress,
  hot,
  port,
  quiet,
  noInfo,
  headers: {
    "Access-Control-Allow-Origin": "*",
  },
  historyApiFallback: {
    rewrites: [
      ...rewrites,
      { from: /\//, to: '/' }
    ]
  },
  before(app, server) {
    chokidar.watch([path.join(appDirectory, `${hotReloadContext}/**`)]).on('all', () => {
      server.sockWrite(server.sockets, 'content-changed');
    });
  },
  after(app) {
    Object.keys(exposes).forEach(entry => {
      console.log("[liveui]: Live component is running at " + "http://localhost:" + port + "/" + entry);
      app.get(`/${entry}`, (req, res) => {
        fs.readFile(
          path.join(compiler.outputPath, `${entry}.js`),
          (err, file) => {
            if (err) {
              res.sendStatus(404);
            } else {
              res.send(file.toString());
            }
          },
        );
      });
    });
    app.get("/", (req, res) => {
      res.send(infoPage);
    });
  }
});

liveServer.listen(port, 'localhost', function (err) {
  if (err) {
    console.log(err);
  }
  
  console.log('WebpackDevServer listening at localhost for [LIVE COMPONENTS]:', port);
});
