const { asClass } = require("awilix");

module.exports = {
  error_middleware: asClass(require("./error-middleware.js")),
  auth_middleware: asClass(require("./auth-middleware.js")),
};
