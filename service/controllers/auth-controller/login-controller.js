const AuthController = require("./auth-controller");
const { SUCCESS } = require("../../libs/constants");

class LoginController extends AuthController {
  constructor({ login_service }) {
    super();
    this.service = login_service;
  }
  
  execute = async (req) => {
    const result = await this.service.handle(req.body);
    if (!result?.token) {
      return [{ message: "OTP Sent Successfully" }, SUCCESS];
    }
    return [result, SUCCESS];
  };
}

module.exports = LoginController;
