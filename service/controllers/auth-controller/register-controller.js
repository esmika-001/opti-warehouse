const AuthController = require("./auth-controller");
const { CREATED } = require("../../libs/constants");

class RegisterController extends AuthController {
  constructor({ register_service }) {
    super();
    this.service = register_service;
  }

  execute = async (req) => {
    const result = await this.service.handle(req.body);
    return [result, CREATED];
  };
}

module.exports = RegisterController;
