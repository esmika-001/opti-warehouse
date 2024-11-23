const ENUM = require("../common/enum");

class VerificationType extends ENUM {
  static ENUM = {
    OTP: "OTP",
    TOKEN: "TOKEN",
  };
}

exports.verificationType = VerificationType
