const pathToRegexp = require("path-to-regexp");

/**
 * Convert standard route to regexp and compile list of keys.
 *
 * @param {String} [path] Base routing path to build regexp for.
 * @param {Array} [keys] List of keys to pass to path-to-regexp.
 * @param {Object} [options] Options to apply to path-to-regexp.
 *
 * @return {Object} Object containing created regex and route keys array.
 */
module.exports.toRegex = function(path, keys = [], options) {
  let regex = pathToRegexp(path, keys, options);
  return {
    regex,
    keys
  };
};

/**
 * Create parameters from HTTP requested route and the array of route keys.
 *
 * @param {String} [match] Array of matches returned by regex.exec().
 * @param {Array} [keys] Array of keys from routes.
 *
 * @return {Object} Object containing all route params.
 * @private
 */
module.exports.createParams = function(match, keys) {
  params = {};

  for (let i = 1; i < match.length; i++) {
    let key = keys[i - 1];
    let prop = key.name;
    let val = decodeURIComponent(match[i]);

    if (
      val !== undefined ||
      !Object.prototype.hasOwnProperty.call(params, prop)
    ) {
      params[prop] = val;
    }
  }

  return params;
};
