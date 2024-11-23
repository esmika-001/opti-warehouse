const AuthController = require("./auth-controller");
const { SUCCESS } = require("../../libs/constants");

class ChangePasswordController extends AuthController {
  constructor({ change_password_service }) {
    super();
    this.service = change_password_service;
  }
  
  execute = async (req) => {
    const result = await this.service.handle(req.body);
    return [result, SUCCESS];
  };
}

module.exports = ChangePasswordController;
