module.exports = function(content, map, meta) {
  // we skip at the build and the runtime level, to not include this loader in
  // production mode, regardless of how the developer is defining "production mode"
  if (process.env.NODE_ENV === "production") {
    this.callback(null, content, map, meta);
    return;
  }

  var newContent = content.replace(/module.exports = /, "var rawLocals = ");
  newContent += `
    // IE 11 etc. cannot use Proxy
    var canUseProxy = typeof Proxy !== "undefined" && Proxy.constructor;

    // we skip at the build and the runtime level, to not include this loader in
    // production mode, regardless of how the developer is defining "production mode"
    var shouldUseProxy = process.env.NODE_ENV !== "production";

    module.exports = canUseProxy && shouldUseProxy
      ? new Proxy(rawLocals, {
        get: function(obj, prop) {
          if(obj.hasOwnProperty(prop) || prop === '__esModule') { return obj[prop]; }
          else {
            var allowedKeys = Object
              .keys(obj)
              .map(function(k) { return ' - "' + k + '"' })
              .join('\\n');
            console.error(
              '%c[strict-css-modules-loader]',
              'background: red; color: white',
              'The CSS class "' + prop.toString() + '" does not exist in ${
                this.resourcePath
              }! The available classes are:\\n' + allowedKeys);
          }
        },
        set: function(obj, prop, value) {
          console.error(
            '%c[strict-css-modules-loader]',
            'background: red; color: white',
            'There should be no good reason to set the styles of ${
              this.resourcePath
            } dynamically! "' + prop + '" is being set to "' + value + '"');
          obj[prop] = value;
        }
      })
    : rawLocals
  `;

  this.callback(null, newContent, map, meta);
};
