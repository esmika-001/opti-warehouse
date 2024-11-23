const { SUCCESS } = require("../../libs/constants");
const AuthController = require("./auth-controller");

class ToggleTwoStepVerificationService extends AuthController {
  constructor({ toggle_two_step_verification_service }) {
    super();
    this.service = toggle_two_step_verification_service;
  }

  execute = async (req) => {
    const result = await this.service.handle(req.body);
    return [result, SUCCESS];
  };
}

module.exports = ToggleTwoStepVerificationService;
