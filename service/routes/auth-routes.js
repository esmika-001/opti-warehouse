class AuthRouter {
  constructor({
    express,
    login_controller,
    register_controller,
    validate_two_step_auth_controller,
    forgot_password_controller,
    validate_reset_password_token_controller,
    reset_password_controller,
    change_password_controller,
    auth_middleware,
    toggle_two_step_verification_controller
  }) {
    this.router = express.Router();
    this.login_controller = login_controller;
    this.register_controller = register_controller;
    this.validate_two_step_auth_controller = validate_two_step_auth_controller;
    this.forgot_password_controller = forgot_password_controller;
    this.validate_reset_password_token_controller = validate_reset_password_token_controller;
    this.reset_password_controller = reset_password_controller;
    this.change_password_controller = change_password_controller;
    this.toggle_two_step_verification_controller = toggle_two_step_verification_controller;

    this.auth_middleware = auth_middleware;

    this.setup_routes();
  }

  setup_routes = () => {
    this.router
      .post("/login", (req, res, next) => this.login_controller.handle_request(req, res, next))
      .post("/register", (req, res, next) => this.register_controller.handle_request(req, res, next))
      .post("/login/verify", (req, res, next) => this.validate_two_step_auth_controller.handle_request(req, res, next))

      .post("/forgot-password", (req, res, next) => this.forgot_password_controller.handle_request(req, res, next))
      .get("/reset-password/:token", (req, res, next) =>
        this.validate_reset_password_token_controller.handle_request(req, res, next)
      )
      .post("/reset-password/:token", (req, res, next) => this.reset_password_controller.handle_request(req, res, next))

      .patch(
        "/change-password",
        (req, res, next) => this.auth_middleware.handle(req, res, next),
        (req, res, next) => this.change_password_controller.handle_request(req, res, next)
      )
      .get(
        "/toggle-two-step",
        (req, res, next) => this.auth_middleware.handle(req, res, next),
        (req, res, next) => this.toggle_two_step_verification_controller.handle_request(req, res, next)
      );
  };
}

module.exports = AuthRouter;
