const { BadRequest } = require("../../libs/error");
const UserService = require("./user-service");

module.exports = class PatchUserDetailsService extends UserService {
  execute = async ({ user: { user_id }, phone_no, pincode, city, country, state }) => {
    const response = await this.user_repository.update({
      criteria: { uuid: user_id },
      payload: { image: null, phone_no, pincode, city, country, state  },
      options: { returning: true, plain: true },
    });
    console.log('response: ', response);
    if (!response[1]) throw new BadRequest("User not found");
    const user = response
    delete user.password;
    delete user.role_id;
    delete user.id;
    return user;
  };
};
