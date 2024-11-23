const BaseService = require("../common/base-service");
const utils = require("../../libs/utils");

class AuthService extends BaseService {
  constructor({ user_repository }) {
    super();
    this.user_repository = user_repository;
  }

  gen_response_with_token = async (userData) => {
    const user = await this.user_repository.findUser({ criteria: { uuid: userData.uuid } });
    const data = {
      ...user,
      password: undefined,
    };
    const token = await utils.create_token({
      email: user.email,
      user_id: user.uuid,
      username: user.username,
    });
    return { data, token: token };
  };
}

module.exports = AuthService;
 