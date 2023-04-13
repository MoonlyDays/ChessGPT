const path = require('path');

module.exports = {
    mode: "production",
    watch: true,
    entry: { build: "./src/index.ts" },
    output: {
        path: path.resolve(__dirname, './content/scripts'),
        filename: "chess.js"
    },
    resolve: {
        extensions: [".ts", ".tsx", ".js"]
    },
    module: {
        rules: [{
            test: /\.tsx?$/,
            loader: "ts-loader"
        }]
    },
};