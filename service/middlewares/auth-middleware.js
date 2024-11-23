const { utils } = require("../libs");
const { Unauthorized } = require("../libs/error");

class AuthMiddleware {
  handle = async (req, res, next) => {
    const token = req.headers.authorization;

    // console.log('token: ', token);

    if (!token) throw new Unauthorized("Unauthorized");

    try {
      const decode_token = utils.verify_token(token);
      
      // console.log('decode_token: ', decode_token);

      req.body.user = decode_token;
      next();
      
    } catch (err) {
      console.log("err_in_auth_verify: ", err);
      throw new Unauthorized("Unauthorized");
    }
  };
}

module.exports = AuthMiddleware;
