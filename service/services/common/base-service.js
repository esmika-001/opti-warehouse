const { InternalServerError } = require("../../libs/error");

class BaseService {
  handle = async (payload) => await this.execute(payload);

  execute = async (payload) => {
    throw new InternalServerError("Method not implemented");
  };
}

module.exports = BaseService;
