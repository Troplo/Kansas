module.exports = {
  productionSourceMap: true,
  pwa: {
    workboxOptions: {
      skipWaiting: true
    },
    name: "Kansas",
    themeColor: "#181818",
    msTileColor: "#181818",
    appleMobileWebAppCapable: "yes",
    appleMobileWebAppStatusBarStyle: "black",
    mobileWebAppCapable: "yes"
  },
  devServer: {
    proxy: "http://localhost:23996"
  },
  transpileDependencies: ['vuetify']
}
