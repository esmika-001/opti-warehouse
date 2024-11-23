const { InternalServerError } = require("../../libs/error");
const VerificationService = require("./verification-service");

module.exports = class SendResetPasswordTokenService extends VerificationService {
  execute = async ({ purpose = "reset_password", user, transaction }) => {
    
    const verificationLog = await this.verification_logs_repository.create({
      payload: {
        user_id: user.id,
        email: user.email,
        purpose,
        expires_at: new Date(Date.now() + 1000 * 60 * 60 * 2),
        type: "TOKEN",
      },
      options: { transaction },
    });

    // const token = verificationLog.uuid;
    // const client = process.env.CLIENT_URL;

    // await mail_service.mail_reset_link({
    //   to: user.email,
    //   subject: "Reset Password Link",
    //   url: `${client}/reset_password/${token}`,
    //   name: user.name,
    // });                                      // EDA coming soon

    if (!verificationLog) throw new InternalServerError("Error in sending Reset Password Link");
  };
};
