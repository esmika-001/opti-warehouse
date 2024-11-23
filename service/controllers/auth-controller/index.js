const { asClass } = require("awilix");

module.exports = {
  login_controller: asClass(require("./login-controller")).scoped(),
  register_controller: asClass(require("./register-controller")).scoped(),
  forgot_password_controller: asClass(require("./forgot-password-controller")).scoped(),
  reset_password_controller: asClass(require("./reset-password-controller")).scoped(),
  change_password_controller: asClass(require("./change-password-controller")).scoped(),
  validate_reset_password_token_controller: asClass(require("./validate-reset-password-token-controller")).scoped(),
  validate_two_step_auth_controller: asClass(require("./validate-two-step-controller")).scoped(),
  toggle_two_step_verification_controller: asClass(require("./toggle-two-step-verification-controller")).scoped(),
};
