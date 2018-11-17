const path = require('path');
const MyExampleWebpackPlugin = require('./MyExampleWebpackPlugin');

module.exports = {
    entry: './index.js',
    output: {
        filename: 'main.js',
        path: path.resolve(__dirname, 'dist')
    },
    plugins: [
        new MyExampleWebpackPlugin() 
    ]
}