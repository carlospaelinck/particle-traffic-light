var
  path    = require('path'),
  webpack = require('webpack');

module.exports = {
  watch: true,

  entry: [
    './src/app.js'
  ],

  output: {
    path: __dirname + '/js',
    filename: 'app.js'
  },

  module: {
    loaders: [
      {
        test: /\.js?$/,
        include: [
          path.resolve(__dirname, 'src')
        ],
        exclude: /node_modules/,
        loader: 'babel-loader'
      },
      {
        test: /\.sass$/,
        loader: "style!css!sass"
      }
    ]
  },

  resolve: {
    alias: {
      ionic: path.join(__dirname, '/www/lib/ionic/js/ionic.bundle.js')
    },
    root: [
      path.join(__dirname, 'node_modules'),
      path.join(__dirname, 'www/lib')
    ],
    extensions: ['', '.js']
  },

  plugins: [
    new webpack.NoErrorsPlugin()
  ]
};
