require("dotenv").config();
const { createContainer, asClass, asValue } = require("awilix");

class Server {
  constructor({ root_router, error_middleware, parsers, app }) {
    this.app = app;
    this.root_router = root_router;
    this.error_middleware = error_middleware;
    this.parsers = parsers;
  }

  setup_middlewares = () => {
    this.app.use(this.parsers.json_parser());
    this.app.use(this.parsers.cookie_parser());
    this.app.use(this.parsers.url_encoded_parser());
    this.app.use(this.parsers.static());
    this.app.use(...this.parsers.static_path());
    this.app.use(require("cors")());
  };

  setup_routes = () => {
    this.app.use(this.root_router.router);
  };

  setup_error_handlers = () => {
    this.app.use(this.error_middleware.handle_error);
    this.app.use(this.error_middleware.handle_not_found);
    this.error_middleware.handle_uncaught_error();
  };

  run_engine = async () => {
    const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

    this.setup_middlewares();
    process.stdout.write("3...");
    await sleep(200);

    this.setup_routes();
    process.stdout.write("2...");
    await sleep(200);

    this.setup_error_handlers();
    process.stdout.write("1...");
    await sleep(200);

    "Running Engine".split("").forEach(async (char, index) => {
      await sleep(50 * index);
      process.stdout.write(char);
    });

    await sleep(800);

    this.app.listen(process.env.PORT, () => console.log(`\nServer Up and running on port ${process.env.PORT}`));
  };
}
const container = createContainer();

container.register({
  server: asClass(Server).singleton(),
  app: asValue(require("express")()),
  express: asValue(require("express")),
  ...require("./routes"),
  ...require("./middlewares"),
  ...require("./controllers"),
  ...require("./libs").container,
  ...require("./services"),
  ...require("./repositories"),
});

module.exports = container;
