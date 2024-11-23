const { SUCCESS } = require("../libs/constants");
const { asClass } = require("awilix");

class RootRouter {
  constructor({ express, auth_router, user_router }) {
    this.router = express.Router();
    this.auth_router = auth_router;
    this.user_router = user_router;
    this.setup_routes();
  }

  setup_routes = () => {
    this.router.get("/", (req, res) => res.status(SUCCESS).send("opti-warehouse Service 1.0.0"));

    this.router.use("/user", this.user_router.router);
    this.router.use("/auth", this.auth_router.router);
  };
}

module.exports = {
  root_router: asClass(RootRouter),
  auth_router: asClass(require("./auth-routes")),
  user_router: asClass(require("./user-routes")),
};
