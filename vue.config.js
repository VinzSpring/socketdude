module.exports = {
    publicPath: process.env.NODE_ENV === 'production' ? `${process.cwd()}/build/` : '/',
    outputDir: 'build',
    configureWebpack: config => {
      config.target = 'electron-renderer'
    }
}
