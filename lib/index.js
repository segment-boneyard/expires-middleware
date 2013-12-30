var ms = require('ms');


/**
 * Returns a middleware to limit the Cache-Control header for `expiration`
 * duration
 *
 * @param {String|Number} expiration ('1m' or 60000)
 * @return {Function}
 */

module.exports = function (expiration) {
  if (typeof expiration === 'string') expiration = ms(expiration);
  expiration = Math.floor(expiration / 1000);

  return function (req, res, next) {
    res.set('Cache-Control', 'public, max-age=' + expiration);
    next();
  };
};