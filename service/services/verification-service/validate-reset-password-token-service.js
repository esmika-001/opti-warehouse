const { BadRequest } = require("../../libs/error");
const VerificationService = require("./verification-service");
const { userStatus } = require("../../models/user/user-status");
const { User } = require("../../models");

module.exports = class ValidateResetPasswordTokenService extends VerificationService {
  execute = async ({ token, transaction }) => {
    const verificationLog = await this.verification_logs_repository.findOne({
      criteria: { uuid: token },
      options: { transaction },
      include: [{ model: User, as: "user_details" }],
    });

    if (!verificationLog) throw new BadRequest("Token Invalid!");
    if (verificationLog.expires_at < new Date()) throw new BadRequest("Token Expired!");

    return verificationLog;
  };
};
