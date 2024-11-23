class BadRequest extends Error {}

class NotFound extends Error {}

class NoContent extends Error {}

class Conflict extends Error {}

class Unauthorized extends Error {}

class Forbidden extends Error {}

class InternalServerError extends Error {}

module.exports = {
  BadRequest,
  NotFound,
  NoContent,
  Conflict,
  Unauthorized,
  Forbidden,
  InternalServerError,
};
