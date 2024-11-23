const { asClass } = require("awilix");

module.exports = {
  send_one_time_verification_code_service: asClass(require("./send-one-time-verification-code-service")).scoped(),
  validate_one_time_verification_code_service: asClass(require("./validate-one-time-verification-code-service")).scoped(),
  send_reset_password_token_service: asClass(require("./send-reset-password-token-service")).scoped(),
  validate_reset_password_token_service: asClass(require("./validate-reset-password-token-service")).scoped(),
};
