

const port = 3001;
const packageName = require('./package.json').appName

const publicPath = process.env.NODE_ENV === 'production' ? '//qiankun.umijs.org/' : `//localhost:${port}`;
module.exports = {
  // 基本路径
  /* 部署生产环境和开发环境下的URL：可对当前环境进行区分，baseUrl 从 Vue CLI 3.3 起已弃用，要使用publicPath */
  publicPath: publicPath,
  // 将构建好的文件输出到哪里（或者说将编译的文件）
  outputDir: 'dist',
  // 放置静态资源的地方 (js/css/img/font/...)
  assetsDir: 'static',
  // 使用带有浏览器内编译器的完整构建版本
  // 查阅 https://cn.vuejs.org/v2/guide/installation.html#运行时-编译器-vs-只包含运行时
  // runtimeCompiler: true,
  // 是否在保存的时候使用 `eslint-loader` 进行检查。
  // 有效的值：`ture` | `false` | `"error"`
  // 当设置为 `"error"` 时，检查出的错误会触发编译失败。
  lintOnSave: false,
  // babel-loader 默认会跳过 node_modules 依赖。
  // 通过这个选项可以显式转译一个依赖。
  transpileDependencies: [/* string or regex */ ],
  // 是否为生产环境构建生成 source map？
  productionSourceMap: false,
  filenameHashing: true,
  chainWebpack:config=>{
    config.module
      .rule('images')
      .test(/\.(png|jpe?g|gif|webp)$/i)
      .use('url-loader')
      .loader('url-loader')
      .tap(options=>{
        options.limit = 4096;
        options.fallback = {
          loader: 'file-loader',
          options: {
            name: 'static/images/[name].[hash:8].[ext]',
            publicPath,
          },
        };
        return options;
      });
    config.module
      .rule('fonts')
      .test(/\.(woff2?|eot|ttf|otf)$/i)
      .use('url-loader')
      .loader('url-loader')
      .tap(options=>{
        options.fallback = {
          loader: 'file-loader',
          options: {
            name: 'static/fonts/[name].[hash:8].[ext]',
            publicPath,
          },
        };
        return options;
      });
  },
  configureWebpack:{
    name: packageName,
    output: {
      library: `${packageName}-[name]`,
      libraryTarget: 'umd', // 把微应用打包成 umd 库格式
      jsonpFunction: `webpackJsonp_${packageName}`,
    },
    performance:{
      hints: false
    }
  },
  devServer:{
    host: '0.0.0.0',
    port,
    headers: {
      "Access-Control-Allow-Origin": "*"
    },
  }
}
