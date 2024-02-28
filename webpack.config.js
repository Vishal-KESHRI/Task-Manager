const path = require('path');               
const HtmlWebpackPlugin = require("html-webpack-plugin");    

module.exports = {

    entry: './src/index.js',                                   
    output: {                                                
        path: path.join(__dirname, '/dist'),  
        filename: 'bundle.js'                 
    },
    plugins: [                      
        new HtmlWebpackPlugin({               
            filename: 'index.html',               
            template: './src/index.html'      
        }),

    ],
    devServer: {                              
        port: 3000,                           //the devServer will start in port 3000
        historyApiFallback: true,             //this property helps with routing in our react app, everytime we refresh the page, react router will send a request to a server, but this property will make sure it searches for an index file first
    },
    
    module: {
        rules: [                               
            {                                  
                test: /\.js$/, 
                use: {
                    loader: 'babel-loader',  
                    options: {presets: ['@babel/preset-env', '@babel/preset-react']} 
                    }                                                                 
            },
            {
                test: /\.css$/,
                use: [{loader: 'style-loader'}, {loader: 'css-loader'}]             
            },
            {
                test: /\.(png|jpg|webp|mp4|wav|svg)$/,
                type: 'asset/resource'                                             
            },                                                                     
        ]
    },
}