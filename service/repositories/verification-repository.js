const { Verification } = require("../models");
const BaseRepository = require("./base-repository");

class VerificationLogsRepository extends BaseRepository {
  constructor() {
    super({ model: Verification });
  }
}

module.exports = VerificationLogsRepository;
