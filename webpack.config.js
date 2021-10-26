const path = require("path");

// ==== SERVE DEPENDENCES ====
const BrowserSyncPlugin = require("browser-sync-webpack-plugin");
var serveStatic = require("serve-static");
const proxy = require("proxy-middleware");
const url = require("url");
const {
  setCompression,
  setHeaders,
  setHost,
  setBody,
} = require("./proxy.middleware.js");

// ==== SERVER CONFIG ====
const pkg = require("./package.json");
const $_HOST = `${pkg.accountName}.vtexcommercestable.com.br`;
const $_PROXY_CONFIG = url.parse(`https://${$_HOST}/`);
$_PROXY_CONFIG.preserveHost = true;
$_PROXY_CONFIG.cookieRewrite = `${pkg.accountName}.vtexlocal.com.br`;

module.exports = {
  mode: "production",
  entry: [
    // __dirname + "/src/js/ag-default.js",
    // __dirname + "/src/js/global.js",
    // __dirname + "/src/js/home.js",
    // __dirname + "/src/js/nb-home.js",
    __dirname + "/src/js/new-functions.js",
    // __dirname + "/src/js/admake-mini-cart.js",
    // __dirname + "/src/js/ag-instagram.js",
    // __dirname + "/src/js/nb-instagram.js",
    // __dirname + "/src/js/nb-default.js",
    __dirname + "/src/scss/ag-style.scss",
    __dirname + "/src/scss/global.scss",
    __dirname + "/src/scss/home.scss",
    __dirname + "/src/scss/newbeach-default.scss",
    __dirname + "/src/scss/newbeach-global.scss",
    __dirname + "/src/scss/newbeach-extra.scss",
  ],
  output: {
    path: path.resolve(__dirname, "build/arquivos"),
    // filename: "ag-default.js",
    // filename: "global.js",
    // filename: "home.js",
    // filename: "nb-home.js",
    filename: "new-functions.js",
    // filename: "ag-default.min.js",
    // filename: "global.min.js",
    // filename: "home.min.js",
    // filename: "nb-home.min.js",
    // filename: "new-functions.min.js",
    // filename: "admake-mini-cart.js",
    // filename: "ag-instagram.min.js",
    // filename: "nb-instagram.min.js",
    // filename: "nb-default.js",
  },
  plugins: [
    new BrowserSyncPlugin({
      host: `${pkg.accountName}.vtexlocal.com.br`,
      port: 443,
      https: true,
      server: "./src",
      watch: true,
      open: "external",
      middleware: [
        setCompression,
        setHeaders,
        setHost,
        setBody,
        serveStatic("./build"),
        proxy($_PROXY_CONFIG),
      ],
    }),
  ],
  module: {
    rules: [
      {
        test: /\.js$/,
        loader: "babel-loader",
        exclude: /node_modules/,
      },
      {
        test: /\.scss$/,
        exclude: /node_modules/,
        use: [
          {
            loader: "file-loader",
            options: {
              outputPath: "/",
              name: "[name].min.css",
              // name: "[name].css",
            },
          },
          "sass-loader",
        ],
      },
    ],
  },
};
