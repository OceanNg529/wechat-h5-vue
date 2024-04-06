'use strict'
const path = require('path')
const defaultSettings = require('./src/settings.js')

//用于生产环境去除多余的css
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')

//代码打包zip
const CompressionWebpackPlugin = require("compression-webpack-plugin");
const productionGzipExtensions = /\.(js|css|json|txt|html|ico|svg)(\?.*)?$/i;

//css分离
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

function resolve(dir) {
    return path.join(__dirname, dir)
}

const name = defaultSettings.title || 'wechatH5' // page title

const port = process.env.port || process.env.npm_config_port || 8888 // dev port


const { VantResolver } = require('unplugin-vue-components/resolvers');
const ComponentsPlugin = require('unplugin-vue-components/webpack');



module.exports = {

    publicPath: process.env.NODE_ENV === 'production' ?
        '/' : '/',
    outputDir: 'backend',
    assetsDir: 'static',
    indexPath: 'index.html',
    filenameHashing: true,
    lintOnSave: process.env.NODE_ENV === 'development',
    productionSourceMap: false,
    //webpack 配置
    configureWebpack: {
        name: name,
        resolve: {
            alias: {
                '@': resolve('src'),
                '@public': resolve('public'),
            }
        },
        externals: {
            'vue': 'Vue',
            'vuex': 'Vuex',
            'vue-router': 'VueRouter',
            'Axios': 'axios',
            'echarts': 'echarts',
            'core-js': 'core-js',
            'element': 'ElementUI',
            'element-ui': 'ELEMENT',
            'js-cookie': 'Cookies',
            'weixin-js-sdk': 'wx'
        },
        performance: { hints: false },
        module: {
            // rules: [{
            //     test: /\.css$/,
            //     use: [MiniCssExtractPlugin.loader, "css-loader"]
            // }, {
            //     test: /\.less$/,
            //     use: [
            //         MiniCssExtractPlugin.loader,
            //         { loader: "css-loader" },
            //         { loader: "less-loader" }
            //     ]
            // }]
        },
        plugins: [
            // new UglifyJsPlugin({
            //     uglifyOptions: {
            //         output: {
            //             comments: false
            //         },
            //         compress: {
            //             drop_console: true, //console
            //             drop_debugger: false,
            //             pure_funcs: ['console.log'] //移除console
            //         },
            //         warnings: false
            //     }
            // }),
            // new CompressionWebpackPlugin({
            //     filename: "[path].gz[query]",
            //     algorithm: "gzip",
            //     test: productionGzipExtensions,
            //     threshold: 10240,
            //     minRatio: 0.8
            // }),
            // new MiniCssExtractPlugin({
            //     filename: "css/common.css"
            // }),
            ComponentsPlugin({
                resolvers: [VantResolver()],
            }),
        ]
    },
    //服务和代理配置
    devServer: {
        port: port,
        open: false,
        overlay: {
            warnings: false,
            errors: true
        },
        proxy: {
            // 解決跨域问题
            // detail: https://cli.vuejs.org/config/#devserver-proxy
            [process.env.VUE_APP_BASE_API]: {
                target: `http://8.129.170.32:8888/index.php`,
                changeOrigin: true,
                pathRewrite: {
                    ['^' + process.env.VUE_APP_BASE_API]: ''
                }
            }
        }
    },
    //webpack 链式配置
    //允许对内部的 webpack 配置进行更细粒度的修改
    chainWebpack: config => {
        config.module
            .rule('vue')
            .use('vue-loader')
            .loader('vue-loader')
            .tap(options => {
                options.compilerOptions.preserveWhitespace = true
                return options
            })
            .end()

        // set svg-sprite-loader
        config.module
            .rule('svg')
            .exclude.add(resolve('src/icons'))
            .end()
        config.module
            .rule('icons')
            .test(/\.svg$/)
            .include.add(resolve('src/icons'))
            .end()
            .use('svg-sprite-loader')
            .loader('svg-sprite-loader')
            .options({
                symbolId: 'icon-[name]'
            })
            .end()
        config
            .optimization.splitChunks({
                chunks: 'all',
                cacheGroups: {
                    libs: {
                        name: 'chunk-libs',
                        test: /[\\/]node_modules[\\/]/,
                        priority: 10,
                        chunks: 'initial' // only package third parties that are initially dependent
                    },
                    // elementUI: {
                    //     name: 'chunk-elementUI', // split elementUI into a single package
                    //     priority: 20, // the weight needs to be larger than libs and app or it will be packaged into libs or app
                    //     test: /[\\/]node_modules[\\/]_?element-ui(.*)/ // in order to adapt to cnpm
                    // },
                    // commons: {
                    //     name: 'chunk-commons',
                    //     test: resolve('src/components'), // can customize your rules
                    //     minChunks: 3, //  minimum common number
                    //     priority: 5,
                    //     reuseExistingChunk: true
                    // }
                }
            })
        config.optimization.runtimeChunk('single')

    }

}