const { BadRequest } = require("../../libs/error");
const UserService = require("./user-service");

module.exports = class SetUserImageService extends UserService {
  execute = async (req) => {
    const { user_id } = req.body.user;
    const { image } = req.files;
    const response = await this.user_repository.update({
      criteria: { uuid: user_id },
      payload: { image: image[0].destination + image[0].filename },
      options: { returning: true, plain: true },
    });
    if (!response[1]) throw new BadRequest("User not found");

    delete response[1].password;
    delete response[1].role_id;
    delete response[1].id;
    return response[1];
  };
};
