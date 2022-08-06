import React from "react";
import path from "path";
import { readFileSync } from "fs";
import { renderToPipeableStream } from "react-dom/server";
import { NextFunction, Request, Response } from "express";
import { StaticRouter } from "react-router-dom/server";
import Html from "./Html";
import App from "../components/App";

const ssrMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const manifest = readFileSync(
    path.join(process.cwd(), "build", "manifest.json"),
    { encoding: "utf-8" }
  );
  const assets = JSON.parse(manifest);
  const entryPoint = assets[Object.keys(assets)[0]];
  const { pipe, abort: _abort } = renderToPipeableStream(
    <StaticRouter location={req.url}>
      <Html title="Hello world">
        <App />
      </Html>
    </StaticRouter>,
    {
      bootstrapScripts: [entryPoint],
      onShellReady() {
        res.status(200);
        res.setHeader("Content-type", "text/html");
        pipe(res);
      },
      onShellError() {
        res.status(500);
        res.send("<!doctype html><p>Loading...</p>");
      },
    }
  );
};

export default ssrMiddleware;
