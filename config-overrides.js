const { useBabelRc, addLessLoader, addDecoratorsLegacy, addWebpackAlias, override }  = require('customize-cra')
const path = require('path')
module.exports = override(
  addLessLoader({
    javascriptEnabled: true
  }),
  useBabelRc(),
  addDecoratorsLegacy(),
  addWebpackAlias({
    img: path.resolve(__dirname, "src/img"),
    component: path.resolve(__dirname, "src/component"),
    service: path.resolve(__dirname, "src/service"),
    util: path.resolve(__dirname, "src/util"),
  }),
);