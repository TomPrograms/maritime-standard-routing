const pathToRegexp = require("path-to-regexp");

module.exports = class RoutingEngine {
  constructor(options) {
    this.options = options || {};
  }

  createRegex(route) {
    this.keys = [];
    let regex = pathToRegexp(route, this.keys, this.options);
    this.regex = regex;
    return regex;
  }

  match(path) {
    this.lastMatch = this.regex.exec(path);
    return this.lastMatch ? true : false;
  }

  createParams(path) {
    let params = {};

    for (let i = 1; i < this.lastMatch.length; i++) {
      let key = this.keys[i - 1];
      let prop = key.name;
      let val = decodeURIComponent(this.lastMatch[i]);

      if (
        val !== undefined ||
        !Object.prototype.hasOwnProperty.call(params, prop)
      ) {
        params[prop] = val;
      }
    }

    return params;
  }
};
