# ∉ strict-css-modules-loader

[CSS Modules](https://github.com/css-modules/css-modules) lets you access a `styles` object, to access a localised class name.

The problem is `styles['this-style-does-not-exist']` will silently return `undefined`. Often you only refer to a non-existent style if you have written a typo, or forgotten to update another file, after removing a style.

[strict-css-modules-loader] wraps your `styles` object in a proxy to warn you when accessing non-existent styles.

```javascript
var x = styles["this-does-not-exist"];
// error: [strict-css-modules-loader] The CSS class "this-does-not-exist" does not exist in /path/my-css.css!

console.log(x);
// log: `undefined`
```

## Install

```bash
npm install --save-dev strict-css-modules-loader
```

or

```bash
yarn add -D strict-css-modules-loader
```

## Requirements

[strict-css-modules-loader] requires at least **Node v4**.

## Usage

Add this line to your webpack config, where you set up your CSS modules:

```diff
const webpackConfig = {
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          { loader: "style-loader" },
+          { loader: "strict-css-modules-loader" },
          { loader: "css-loader", options: { modules: true } }
        ]
      }
    ]
  }
};
```

and you're done! You should now see console errors if you use non-existent styles.

## Production

If building in production-mode, then this loader does absolutely nothing, and should not affect your bundle size at all.

## Contributing

Contributors are welcome! 😊

Please check out the [CONTRIBUTING.md](./CONTRIBUTING.md).

## License

[MIT](/LICENSE)
