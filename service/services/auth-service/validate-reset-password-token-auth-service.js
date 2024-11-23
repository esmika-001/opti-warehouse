const { BadRequest } = require("../../libs/error");
const { userStatus } = require("../../models/user/user-status");
const AuthService = require("./auth-service");
const { User } = require("../../models");

class ValidateResetPasswordTokenService extends AuthService {
  constructor({ validate_reset_password_token_service, user_repository }) {
    super({ user_repository });
    this.validate_reset_password_token_service = validate_reset_password_token_service;
  }
  
  execute = async ({ token }) => {
    return await this.user_repository.handleManagedTransaction(async (transaction) => {
      if (!token) throw new BadRequest("Token Required");

      const verificationLog = await this.validate_reset_password_token_service.handle({ token, transaction });
      const user = verificationLog.user_details;

      if (!user) throw new BadRequest("User Not Found!");
      if (user.status !== userStatus.ENUM.ACTIVE) throw new BadRequest("User is not found!");

      if (user.email !== verificationLog.email) throw new BadRequest("Email Mismatch!");

      return { message: "Token Verified Successfully" };
    });
  };
}

module.exports = ValidateResetPasswordTokenService;
