const { SUCCESS } = require("../../libs/constants");
const AuthController = require("./auth-controller");

class ResetPasswordController extends AuthController {
  constructor({ reset_password_service }) {
    super();
    this.service = reset_password_service;
  }

  execute = async (req) => {
    const result = await this.service.handle(req.body, req.params);
    return [result, SUCCESS];
  };
}

module.exports = ResetPasswordController;
