const { BadRequest } = require("../../libs/error");
const AuthService = require("./auth-service");
const { userStatus } = require("../../models/user/user-status");

class ForgotPasswordService extends AuthService {
  constructor({ send_reset_password_token_service, user_repository }) {
    super({ user_repository });
    this.send_reset_password_token_service = send_reset_password_token_service;
  }

  execute = async ({ email }) => {
    return await this.user_repository.handleManagedTransaction(async (transaction) => {
      if (!email) throw new BadRequest("Email Required");

      const user = await this.user_repository.findOne({ criteria: { email }, options: { transaction } });

      if (!user) throw new BadRequest("User Not Found!");
      if (user.status !== userStatus.ENUM.ACTIVE) throw new BadRequest("User is not found!");

      // verification-service
      await this.send_reset_password_token_service.handle({ user, purpose: "reset_password", transaction });

      return { message: "Reset Password Link Sent Successfully" };
    });
  };
}

module.exports = ForgotPasswordService;
