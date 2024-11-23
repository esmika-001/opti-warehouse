const { BadRequest } = require("../../libs/error");
const AuthService = require("./auth-service");
const { User } = require("../../models");

class ResetPasswordService extends AuthService {
  constructor({ validate_reset_password_token_service, user_repository }) {
    super({ user_repository });
    this.validate_reset_password_token_service = validate_reset_password_token_service;
  }

  execute = async ({ password }, { token }) => {
    const resp = await this.user_repository.handleManagedTransaction(async (transaction) => {
      if (!token) throw new BadRequest("Token Required");
      if (!password) throw new BadRequest("Password Required");

      const verificationLog = JSON.parse(
        JSON.stringify(await this.validate_reset_password_token_service.handle({ token, transaction }))
      );

      const user = verificationLog.user_details;

      if (!user) throw new BadRequest("User Not Found!");
      if (user.status !== userStatus.ENUM.ACTIVE) throw new BadRequest("User is not found!");

      const updatedUser = await this.user_repository.findOne({
        criteria: { uuid: user.uuid },
        options: { transaction },
      });

      updatedUser.password = password;
      if (await updatedUser.save({ transaction })) {
        await this.verification_logs_repository.update({
          criteria: { uuid: token },
          payload: { used_at: new Date() },
          options: { transaction },
        });
      }

      await this.verification_logs_repository.update({
        criteria: { uuid: token },
        payload: { used_at: new Date() },
        options: { transaction },
      });

      return user;
    });
    return await gen_response_with_token(resp);
  };
}

module.exports = ResetPasswordService;
