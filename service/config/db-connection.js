const { Sequelize } = require("sequelize");

if (!process.env.NODE_ENV) {
  console.log("NODE_ENV is not defined.");
  process.exit(128);
}
const config = require("./config.js")[process.env.NODE_ENV];
const sequelize = new Sequelize(config);

const check_connection = async () => {
  try {
    await sequelize.authenticate();
    console.log("Connection has been established successfully.");
    return true;
  } catch (error) {
    console.log(`Failed to establish connection to the database: ${error.message || error}`);
    throw error;
  }
};

module.exports = {
  sequelize,
  check_connection,
};
