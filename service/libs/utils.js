const jwt = require("jsonwebtoken");

exports.verify_token = (token) => {
  return jwt.verify(token, process.env.JWT_SECRET);
};

exports.create_token = async (data) => {
  return jwt.sign(data, process.env.JWT_SECRET, { expiresIn: "7d" });
};


