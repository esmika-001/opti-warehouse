const { SUCCESS } = require("../../libs/constants");
const AuthController = require("./auth-controller");

class ValidateResetPasswordTokenController extends AuthController {
  constructor({ validate_reset_password_token_service }) {
    super();
    this.service = validate_reset_password_token_service;
  }

  execute = async (req) => {
    const result = await this.service.handle(req.params);
    return [result, SUCCESS];
  };
}

module.exports = ValidateResetPasswordTokenController;
