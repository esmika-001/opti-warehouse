const { SUCCESS } = require("../../libs/constants");
const UserController = require("./user-controller");

class RemoveUserImagesController extends UserController {
  constructor({ remove_user_image_service }) {
    super();
    this.service = remove_user_image_service;
  }
  execute = async (req) => {
    const response = await this.service.handle(req);
    return [response, SUCCESS];
  };
}

module.exports = RemoveUserImagesController;
