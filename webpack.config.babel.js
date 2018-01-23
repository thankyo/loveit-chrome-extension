const webpack = require("webpack"),
    path = require("path"),
    env = require("./utils/env"),
    CleanWebpackPlugin = require("clean-webpack-plugin"),
    CopyWebpackPlugin = require("copy-webpack-plugin"),
    HtmlWebpackPlugin = require("html-webpack-plugin"),
    WriteFilePlugin = require("write-file-webpack-plugin");

const fileExtensions = ["jpg", "jpeg", "png", "gif", "eot", "otf", "svg", "ttf", "woff", "woff2"];

const options = {
  entry: {
    popup: path.join(__dirname, "src")
  },
  output: {
    path: path.join(__dirname, "build"),
    filename: "[name].bundle.js"
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        loader: "style-loader!css-loader",
        exclude: /node_modules/
      },
      {
        test: new RegExp('\.(' + fileExtensions.join('|') + ')$'),
        loader: "file-loader?name=[name].[ext]",
        exclude: /node_modules/
      },
      {
        test: /\.html$/,
        loader: "html-loader",
        exclude: /node_modules/
      },
      {
        test: /\.(js|jsx)$/,
        loader: "babel-loader",
        exclude: /node_modules/
      },
      {
        test: /\.s(c|a)ss$/,
        use: [{
          loader: "style-loader" // creates style nodes from JS strings
        }, {
          loader: "css-loader" // translates CSS into CommonJS
        }, {
          loader: "sass-loader" // compiles Sass to CSS
        }]
      }
    ]
  },
  plugins: [
    // clean the build folder
    new CleanWebpackPlugin(["build"]),
    // expose and write the allowed env vars on the compiled bundle
    new webpack.DefinePlugin({
      "process.env.NODE_ENV": JSON.stringify(env.NODE_ENV)
    }),
    new CopyWebpackPlugin([{
      from: "assets/manifest.json",
      transform: function (content, path) {
        // generates the manifest file using the package.json informations
        let data = {
          description: process.env.npm_package_description,
          name: process.env.npm_package_name,
          version: process.env.npm_package_version,
          ...JSON.parse(content.toString())
        };
        return Buffer.from(JSON.stringify(data))
      }
    }, {
      from: "assets/inject.js"
    }, {
      from: "assets/img"
    }
    ]),
    new HtmlWebpackPlugin({
      template: path.join(__dirname, "assets", "popup.html"),
      filename: "popup.html",
      chunks: ["popup"]
    }),
    new WriteFilePlugin()
  ],
  devServer: {
    hot: true,
    port: 7070,
    contentBase: path.join(__dirname, "../build"),
    headers: {
      "Access-Control-Allow-Origin": "*"
    }
  }
};

if (env.NODE_ENV === "development") {
  options.devtool = "cheap-module-eval-source-map";
  options.plugins = [ new webpack.HotModuleReplacementPlugin() ].concat(options.plugins || []);

}

module.exports = options;
