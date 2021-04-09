var express = require("express");
var path = require("path");
var HtmlWebpackPlugin = require("html-webpack-plugin");
const webpack = require("webpack");
const dotenv = require("dotenv");

module.exports = {
    entry: "./src/app.js",
    output: {
        path: path.resolve(__dirname, "dist"),
        filename: "bundle.js",
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: "./src/index.html",
        }),
        new webpack.DefinePlugin({
            "process.env": JSON.stringify(dotenv.config().parsed),
        }),
    ],
    devServer: {
        contentBase: path.join(__dirname, "dist"),
        open: true,
        port: 9000,
        before: function (app, server) {
            app.use("/api", express.static(path.join(__dirname, "data")));
        },
    },
};
