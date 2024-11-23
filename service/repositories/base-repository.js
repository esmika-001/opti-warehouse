const { sequelize } = require("../config/db-connection");
const { badRequest } = require("../libs/error");
class BaseRepository {
  constructor({ model }) {
    this.model = model;
  }

  async create({ payload, options = {} }) {
    const instance = await this.model.create(payload, options);
    return instance?.toJSON() || instance;
  }

  async count({ criteria = {}, options = {} }) {
    return await this.model.count({ criteria, options });
  }

  async update({ payload, criteria, options }) {
    console.log('criteria: ', criteria);
    const response = await this.model.update(payload, { where: criteria, ...options });
    return JSON.parse(JSON.stringify(response));
  }

  findById(id) {
    return this.items.find((item) => item.id === id);
  }

  async findOne({ criteria, include = [], attributes = {}, options = {} }) {
    const res = await this.model.findOne({ where: criteria, include, attributes, ...options });
    return res;
  }

  async findAll({
    criteria = {},
    include = [],
    order = "DESC",
    attributes = {},
    offset = 0,
    paranoid = true,
    limit = null,
  }) {
    let findQuery = { where: criteria, include, attributes, offset, order, paranoid };
    if (limit) findQuery.limit = limit;
    return await this.model.findAll(findQuery);
  }

  async findAndCountAll({ criteria = {}, include = [], order, attributes = {}, offset = 0, limit = 10 }) {
    return await this.model.findAndCountAll({ where: criteria, include, attributes, offset, order, limit });
  }

  async createBulk(payload, options) {
    return await this.model.bulkCreate(payload, options);
  }

  async softDelete(criteria, options = null) {
    const response = await this.model.destroy({ where: criteria }, options);
    return response;
  }

  async startTransaction() {
    return sequelize.transaction();
  }

  async commitTransaction(transaction) {
    return transaction.commit();
  }

  async rollbackTransaction(transaction) {
    return transaction.rollback();
  }

  async handleManagedTransaction(callback) {
    return await sequelize.transaction(callback);
  }

  async getId(uuid) {
    const resp = await this.model.findOne({ where: { uuid } });
    if (resp === null) throw new badRequest("Invalid Element");
    return resp.toJSON().id;
  }
}

module.exports = BaseRepository;
