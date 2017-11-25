const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const PATHS = {
  frontend: path.join(__dirname, 'frontend'),
  build: path.join(__dirname, 'public'),
};


const commonConfig= {
  entry: {
    frontend: PATHS.frontend
  },
  output: {
    path: PATHS.build,
    filename: '[name].js',
    publicPath: '/'
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: 'My cash',
      template: path.join(PATHS.frontend, 'template.html')
    }),
  ],
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"]
      },
      {
        test: /\.js$/,
        exclude:/node_modules/,
        use: "babel-loader",
      },
      {
        test: /\.(eot|svg|ttf|woff|woff2)$/,
        loader: 'file-loader',
      },
      {
        test: /\.woff$/,
        use: {
          loader: "url-loader",
          options: {
            limit: 50000,
          },
        },
      },
    ],
  }
};

const productionConfig = () => commonConfig;

const developmentConfig = () => {
  const config = {
    devServer: {
      historyApiFallback: true,
      stats: 'errors-only',
      host: process.env.HOST, // Defaults to `localhost`
      port: process.env.PORT, // Defaults to 8080
      proxy: {
        '/api/**': "http://localhost:3000/"
      }
    },
  };

  return Object.assign(
    {},
    commonConfig,
    config
  );
};

module.exports=(env)=> {
  if (env === 'production') {
    return productionConfig();
  }

  return developmentConfig()
}