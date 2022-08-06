const fs = require("fs");
const path = require("path");

const appDirectory = fs.realpathSync(process.cwd());
const resolveApp = (relativePath) => path.resolve(appDirectory, relativePath);
const buildPath = process.env.BUILD_PATH || "build";
const moduleRegex = /\.(tsx|ts|js|jsx|mjs)$/;
const styleRegex = /\.(css|less|styl|scss|sass|sss)$/;
const imageRegex = /\.(bmp|gif|jpg|jpeg|png)$/;

module.exports = {
  appPath: resolveApp("."),
  appBuild: resolveApp(buildPath),
  appStaic: resolveApp(`${buildPath}/static`),
  appPublic: resolveApp("public"),
  appHtml: resolveApp("public/index.html"),
  appBabelconfig: resolveApp("babel.config.js"),
  appSrc: resolveApp("src"),
  appFavicon: resolveApp("public/favicon.ico"),
  moduleRegex,
  styleRegex,
  imageRegex,
};
