'use strict';

function connection(key, val) {
  return function(req, res, next) {
    req[key] = val;
    next();
  };
}

module.exports = connection;