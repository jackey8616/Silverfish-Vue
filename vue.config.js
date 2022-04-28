const { defineConfig } = require('@vue/cli-service');

module.exports = defineConfig({
  transpileDependencies: true,
  chainWebpack: config => {
    config.module
      .rule('vue')
      .use('vue-loader')
      .tap(options => ({
        ...options,
        compilerOptions: {
          isCustomElement: tag => ['center', 'big'].includes(tag),
        },
      }));
  },
  pwa: {
    name: "書蠹付梓 | 無縫閱讀",
    themeColor: "#4DBA87",
    msTileColor: "#000000",
    manifestOptions: {
      short_name: "書蠹付梓",
      start_url: "./index.html",
      icons: [
        {
          src: "./img/icons/android-chrome-192x192.png",
          sizes: "192x192",
          type: "image/png",
        },
        {
          src: "./img/icons/android-chrome-512x512.png",
          sizes: "512x512",
          type: "image/png",
        },
      ],
      description: "提供流暢、無廣告的小說/漫畫閱覽，支援各平台裝置使用，無需下載任何App。",
      display: "standalone",
      background_color: "#000000",
    },
    appleMobileWebAppCapable: "yes",
    appleMobileWebAppStatusBarStyle: "black",

    workboxPluginMode: 'GenerateSW',
    workboxOptions: {
      skipWaiting: true,
      clientsClaim: true,
    },
  },
});
