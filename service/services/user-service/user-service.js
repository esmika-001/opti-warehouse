const BaseService = require("../common/base-service");

module.exports = class UserService extends BaseService {
  constructor({ user_repository }) {
    super();
    this.user_repository = user_repository;
  }
};
