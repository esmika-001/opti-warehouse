const AuthService = require("./auth-service");
const { BadRequest } = require("../../libs/error");
const { userStatus } = require("../../models/user/user-status");

class LoginService extends AuthService {
  constructor({ user_repository, send_one_time_verification_code_service }) {
    super({ user_repository });
    this.send_one_time_verification_code_service = send_one_time_verification_code_service;
  }
  
  execute = async ({ email, password }) => {
    return await this.user_repository.handleManagedTransaction(async (transaction) => {
      if (!email) throw new BadRequest("Email Required");
      if (!password) throw new BadRequest("Password Required");

      const user = await this.user_repository.find_and_compare_password({
        criteria: { email, password },
        options: { transaction },
      });

      if (user.status !== userStatus.ENUM.ACTIVE) throw new BadRequest("User Blocked");

      if (user.is_two_step_verification_enabled)
        return await this.send_one_time_verification_code_service.handle({ email, purpose: "login", user, transaction });

      else return this.gen_response_with_token(user);
    });
  };
}

module.exports = LoginService;
