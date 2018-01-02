import path from 'path';
import webpack from 'webpack';

export default {
    devtools: 'inline-source-map',
    debug: true,
    //devtools: "inline-eval-cheap-source-map",
    entry: [
        'webpack-hot-middleware/client?reload=true',
        path.join(__dirname, '/client/index.js'),
    ],
    output: {
        path: '/',
        publicPath: '/'
    },
    plugins:[
        new webpack.NoErrorsPlugin(),
        new webpack.optimize.OccurenceOrderPlugin(),
        new webpack.HotModuleReplacementPlugin()
    ],
    module: {
        loaders: [
            {
                test: /\.js$/,
                include: [
                    path.join(__dirname, 'client'),
                    path.join(__dirname, 'server/shared')
                ],
                loaders: ['babel']
            }
        ],
    },
    resolve: {
        extentions: ['', '.js']
    }
}