const express = require("express");
const path = require("path");
const webpack = require("webpack");
const routes = require("./routes/routes");
const app = express();

const isProd = process.env.NODE_ENV === "production";
if (!isProd) {
  const config = require("../config/webpack.config.dev")(process.env);
  const compiler = webpack(config);
  const webpackDevMiddleWare = require("webpack-dev-middleware");
  const webpackHotMiddleWare = require("webpack-hot-middleware");

  const devMiddleWare = webpackDevMiddleWare(compiler, config.devServer);
  const hotMiddleWare = webpackHotMiddleWare(compiler);
  app.use(devMiddleWare);
  app.use(hotMiddleWare);
}

const PORT = process.env.PORT || 3000;

app.use("/", express.static(path.join(__dirname, "..", "dist")));
app.use("/", routes);
app.listen(PORT, () => console.log(`server listening on PORT ${PORT}`));
