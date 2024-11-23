const cookieParser = require("cookie-parser");

class Parsers {
  constructor({ express }) {
    this.express = express;
  }

  cookie_parser = () => cookieParser();

  json_parser = () => this.express.json();

  url_encoded_parser = () => this.express.urlencoded({ extended: true });

  static = () => this.express.static("public");

  static_path = () => ["/uploads/images", this.express.static("uploads/images")];
}

module.exports = Parsers;
