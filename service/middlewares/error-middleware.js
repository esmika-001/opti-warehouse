const {
  BAD_REQUEST,
  NOT_FOUND,
  NO_CONTENT,
  CONFLICT,
  INTERNAL_SERVER_ERROR,
  UNAUTHORIZED,
  FORBIDDEN,
} = require("../libs/constants");
const {
  BadRequest,
  Conflict,
  Forbidden,
  InternalServerError,
  NoContent,
  NotFound,
  Unauthorized,
} = require("../libs/error");
const { Sequelize } = require("sequelize");
class ErrorMiddleware {
  static error_handler = (error) => {
    switch (true) {
      case error instanceof Sequelize.ValidationError:
        error.message = ErrorMiddleware.get_error_message(error);
        return BAD_REQUEST;
      case error instanceof BadRequest:
        return BAD_REQUEST;
      case error instanceof NotFound:
        return NOT_FOUND;
      case error instanceof NoContent:
        return NO_CONTENT;
      case error instanceof Conflict:
        return CONFLICT;
      case error instanceof InternalServerError:
        return INTERNAL_SERVER_ERROR;
      case error instanceof Unauthorized:
        return UNAUTHORIZED;
      case error instanceof Forbidden:
        return FORBIDDEN;
      default:
        return INTERNAL_SERVER_ERROR;
    }
  };

  static get_error_message = (error) => {
    const error_messages = error.errors.map((err) => err.message);
    return error_messages.join(", ");
  };

  handle_error(err, req, res, next) {
    console.error(err.message);
    res.status(ErrorMiddleware.error_handler(err)).send(err.message);
  }

  handle_uncaught_error = () =>
    process.on("uncaughtException", (err) => {
      console.log("Uncaught exception:", err);
    });

  handle_not_found(req, res) {
    res.status(NOT_FOUND).send("404: Page not found");
  }
}

module.exports = ErrorMiddleware;
