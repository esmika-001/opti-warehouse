const { SUCCESS, NO_CONTENT } = require("../../libs/constants");
const UserController = require("./user-controller");

class GetUserDetailsController extends UserController {
  constructor({ get_user_details_service }) {
    super();
    this.service = get_user_details_service;
  }
  execute = async (req) => {
    const response = await this.service.handle(req);
    if (!response) return [null, NO_CONTENT];
    return [response, SUCCESS];
  };
}

module.exports = GetUserDetailsController;
