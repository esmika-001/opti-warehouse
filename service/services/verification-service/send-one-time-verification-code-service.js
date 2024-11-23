const VerificationService = require("./verification-service");

module.exports = class SendOneTimeVerificationCodeService extends VerificationService {
  
  execute = async ({ email, purpose, user, transaction }) => {
    const otp = Math.floor(100000 + Math.random() * 900000);
    console.log("otp: ", otp);
    await this.verification_logs_repository.create({
      payload: {
        email,
        otp,
        type: "OTP",
        purpose,
        expires_at: new Date(Date.now() + 1000 * 60 * 10),
        user_id: user.id,
      },
      options: { transaction },
    });
    // await    outbox           // EDA coming soon
    const message = {
      email,
      otp,
      purpose,
      template: "OTP",
    };
    // await this.outbox_message_repository.storeOutboxMessage({
    //   outbox_message: new SendVerificationCodeEvent(message),
    //   transaction,
    // });
    return { message: "OTP Sent Successfully" };
  };
};
