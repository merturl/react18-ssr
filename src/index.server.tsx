import webpack from "webpack";
import express from "express";
import ssrMiddleware from "./server/ssrMiddleware";
import webpackConfig from "../webpack/webpack.client";
import devMiddleware from "webpack-dev-middleware";
import hotMiddleware from "webpack-hot-middleware";

const app = express();
const port = process.env.PORT || 4000;

const compiler = webpack({ ...webpackConfig, mode: "development" });
app.use(express.static("build", { index: false }));
app.use(
  devMiddleware(compiler, {
    serverSideRender: true,
    index: false,
    publicPath: webpackConfig.output.publicPath,
  })
);

app.use(
  hotMiddleware(compiler, {
    path: `/__webpack_hmr`,
    log: false,
    heartbeat: 10 * 1000,
  })
);
app.use(ssrMiddleware);

app.listen({ port }, () => {
  console.log(`${port} is ready for listen`);
});
