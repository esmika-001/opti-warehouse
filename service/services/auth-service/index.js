const { asClass } = require("awilix");

module.exports = {
  register_service: asClass(require("./register-auth-service")).scoped(),
  login_service: asClass(require("./login-auth-service")).scoped(),
  validate_two_step_auth_service: asClass(require("./validate-two-step-auth-service")).scoped(),
  forgot_password_service: asClass(require("./forgot-password-auth-service")).scoped(),
  validate_reset_password_token_service: asClass(require("./validate-reset-password-token-auth-service")).scoped(),
  reset_password_service: asClass(require("./reset-password-auth-service")).scoped(),
  change_password_service: asClass(require("./change-password-auth-service")).scoped(),
  toggle_two_step_verification_service: asClass(require("./toggle-two-step-verification-auth-service")).scoped(),
};
