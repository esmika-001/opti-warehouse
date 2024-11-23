const { Conflict, BadRequest } = require("../../libs/error");
const { userStatus } = require("../../models/user/user-status");
const AuthService = require("./auth-service");
const email_regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

class RegisterService extends AuthService {
  execute = async ({ name, username, email, password, phone_no }) => {
    const response = await this.user_repository.handleManagedTransaction(async (transaction) => {
      if (!name || name.length < 6) throw new BadRequest("Name is invalid");
      if (!email || !email_regex.test(email)) throw new BadRequest("Email Required");
      if (!password || password.length < 6 || password.length > 32) throw new BadRequest("Password is invalid");
      if (!username || username.length < 6 || username.length > 32) throw new BadRequest("Username is invalid");

      const is_existing_email = await this.user_repository.findOne({ criteria: { email }, options: { transaction } });
      if (is_existing_email) throw new Conflict("Email Already Exists!");

      const is_existing_username = await this.user_repository.findOne({
        criteria: { username },
        options: { transaction },
      });
      if (is_existing_username) throw new Conflict("Username Already Exists!");

      return await this.user_repository.create({
        payload: { status: userStatus.ENUM.ACTIVE, name, username, email, password, phone_no, is_two_step_verification_enabled: false },
        options: { transaction },
      });
    });

    return this.gen_response_with_token(response);
  };
}

module.exports = RegisterService;
