const { asClass } = require("awilix");

module.exports = {
  base_repository: asClass(require("./base-repository.js")).scoped(),
  user_repository: asClass(require("./user-repository.js")).scoped(),
  verification_logs_repository: asClass(require("./verification-repository.js")).scoped()
};
