//const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const CompressionPlugin = require("compression-webpack-plugin");

module.exports = {
  publicPath: process.env.NODE_ENV === 'production' ? '/' : '',
  pwa: {
    workboxPluginMode: 'InjectManifest',
    workboxOptions: {
        swSrc: 'public/service-worker.js'
    }
  },
  configureWebpack: () => {
    if(process.env.NODE_ENV === 'production'){
      return {
        plugins: [
          //new BundleAnalyzerPlugin(),
          new CompressionPlugin({
            test:/\.js$|\.html$|.\css/,
            threshold: 10240,
            deleteOriginalAssets: false
          })
        ]
      }
    }
  },
}