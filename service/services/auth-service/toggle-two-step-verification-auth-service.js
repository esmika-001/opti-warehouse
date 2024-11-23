const { BadRequest } = require("../../libs/error");
const { userStatus } = require("../../models/user/user-status");
const AuthService = require("./auth-service");

class ToggleTwoStepVerificationService extends AuthService {
  execute = async ({ user }) => {
    console.log('user: ', user);
    return await this.user_repository.handleManagedTransaction(async (transaction) => {
      const userData = await this.user_repository.findUser({
        criteria: { uuid: user.user_id },
        options: { transaction },
      });
      
      if (!user || userData.status !== userStatus.ENUM.ACTIVE) throw new BadRequest("Invalid User");

      const updatedUser = await this.user_repository.update({
        criteria: { uuid: userData.uuid },
        options: { transaction, returning: true },
        payload: { is_two_step_verification_enabled: !userData.is_two_step_verification_enabled },
      });

      return updatedUser;
    });
  };
}

module.exports = ToggleTwoStepVerificationService;
