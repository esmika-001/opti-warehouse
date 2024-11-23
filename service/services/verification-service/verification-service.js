const BaseService = require("../common/base-service");

module.exports = class VerificationService extends BaseService {
  constructor({ verification_logs_repository }) {
    super();
    this.verification_logs_repository = verification_logs_repository;
  }
}