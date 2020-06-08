module.exports = {
    mode: "development",
    devtool: "inline-source-map",
    entry: "./App.tsx",
    output: {
      filename: "bundle.js"
    },
    resolve: {
      // Add `.ts` and `.tsx` as a resolvable extension.
      extensions: [".ts", ".tsx", ".js"],
      alias: {
        '@Methods': path.resolve(__dirname, 'src/methods/'),
        '@Utils': path.resolve(__dirname, 'src/utils/'),
},
    },
    module: {
      rules: [
        // all files with a `.ts` or `.tsx` extension will be handled by `ts-loader`
        { test: /\.tsx?$/, loader: "ts-loader" }
      ]
    }
  };

