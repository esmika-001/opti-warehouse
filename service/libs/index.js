const { asClass } = require("awilix");

module.exports = {
  utils: require("./utils"),
  constants: require("./constants"),
  errors: require("./error"),
  container: {
    cors: asClass(require("./cors")),
    parsers: asClass(require("./parsers")),
  },
};
