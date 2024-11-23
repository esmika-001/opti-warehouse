const AuthController = require("./auth-controller");
const { SUCCESS } = require("../../libs/constants");

class ForgotPasswordController extends AuthController {
  constructor({ forgot_password_service }) {
    super();
    this.service = forgot_password_service;
  }
  
  execute = async (req) => {
    const result = await this.service.handle(req.body);
    return [result, SUCCESS];
  };
}

module.exports = ForgotPasswordController;
