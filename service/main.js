const container = require("./app");

const server = container.resolve("server");
server.run_engine();
