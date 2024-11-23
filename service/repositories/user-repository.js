const { BadRequest } = require("../libs/error");
const BaseRepository = require("./base-repository");
const { User } = require("../models");
const { userStatus } = require("../models/user/user-status");

class UserRepository extends BaseRepository {
  constructor() {
    super({ model: User });
  }
 
  async findUser({ criteria, options }) {
    const resp = await this.findOne({
      criteria,
      options: { attributes: { exclude: ["password", "id"] }, ...options },
    });
    return resp.toJSON();
  }

  async findAllUser({ order = "DESC", limit, offset }) {
    const resp = await this.findAll({ include: this.include, order, limit, offset });
    return resp.toJSON();
  }

  async find_and_compare_password({ criteria: { email, password }, options = {} }) {
    const user = await this.findOne({ criteria: { email }, options: { ...options, plain: true } });
    if (!user) throw new BadRequest("Invalid email or password");
    if (user.status !== userStatus.ENUM.ACTIVE) throw new BadRequest(`User is ${user.status}`);
    const check = await user.comparePassword(password);
    if (!check) throw new BadRequest("Invalid email or password");
    return user.toJSON();
  }
}

module.exports = UserRepository;
