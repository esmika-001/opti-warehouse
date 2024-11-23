const { SUCCESS } = require("../../libs/constants");
const AuthController = require("./auth-controller");

class ValidateTwoStepAuthController extends AuthController {
  constructor({ validate_two_step_auth_service }) {
    super();
    this.service = validate_two_step_auth_service;
  }

  execute = async (req) => {
    const result = await this.service.handle(req.body);
    return [result, SUCCESS];
  };
}

module.exports = ValidateTwoStepAuthController;
