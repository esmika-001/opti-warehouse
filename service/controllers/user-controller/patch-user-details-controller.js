const { SUCCESS, NO_CONTENT } = require("../../libs/constants");
const UserController = require("./user-controller");

class PatchUserDetailsController extends UserController {
  constructor({ patch_user_details_service }) {
    super();
    this.service = patch_user_details_service;
  }
  execute = async (req) => {
    const response = await this.service.handle(req.body);
    if (!response) return [null, NO_CONTENT];
    return [null, SUCCESS];
  };
}

module.exports = PatchUserDetailsController;
