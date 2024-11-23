const { BadRequest } = require("../../libs/error");
const VerificationService = require("./verification-service");
const { userStatus } = require("../../models/user/user-status");
const { User } = require("../../models");

module.exports = class ValidateOneTimeVerificationCodeService extends VerificationService {
  execute = async ({ email, otp, purpose, transaction }) => {
    const verification = await this.verification_logs_repository.findOne({
      criteria: { email, otp, type: "OTP", purpose },
      options: { transaction },
      include: [{ model: User, as: "user_details" }],
    });

    if (!verification) throw new BadRequest("Invalid OTP");
    if (verification.user_details.status !== userStatus.ENUM.ACTIVE) throw new BadRequest("User Not Found");
    if (verification.expires_at < new Date()) throw new BadRequest("OTP Expired");
    await this.verification_logs_repository.update({
      payload: { used_at: new Date() },
      criteria: { id: verification.id },
      options: { transaction },
    });

    // EDA coming soon

    return verification;
  };
};
