module.exports = {
  "plugins": [
    [
      "module-resolver", {
        "alias": {
          "@config": "./src/config",
          "@constants": "./src/constants",
          "@daos": "./src/daos",
          "@entities": "./src/entities",
          "@middlewares": "./src/middlewares",
          "@models": "./src/models",
          "@modules": "./src/modules",
          "@routes": "./src/routes",
          "@services": "./src/services",
          "@src": "./src",
          "@utils": "./src/utils"
        }
      }
    ],
    // Stage 2
    ["@babel/plugin-proposal-decorators", { "legacy": true }],
    "@babel/plugin-proposal-function-sent",
    "@babel/plugin-proposal-export-namespace-from",
    "@babel/plugin-proposal-numeric-separator",
    "@babel/plugin-proposal-throw-expressions",

    // Stage 3
    "@babel/plugin-syntax-dynamic-import",
    "@babel/plugin-syntax-import-meta",
    ["@babel/plugin-proposal-class-properties", { "loose": false }],
    "@babel/plugin-proposal-json-strings"
  ],
  "presets": [
    [
      "@babel/preset-env",
      {
        "targets": {
          "node": "current",
        }
      }
    ],
    "@babel/preset-typescript",
  ],
}