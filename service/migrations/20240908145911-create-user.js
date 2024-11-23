"use strict";
const { userStatus } = require("../models/user/user-status");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("users", {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      uuid: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        allowNull: false,
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      password: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      is_two_step_verification_enabled: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
      },
      username: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
      },
      status: {
        type: Sequelize.ENUM(userStatus.getValues()),
        allowNull: false,
      },
      image: {
        type: Sequelize.STRING,
      },
      phone_no: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      email: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
      },
      pincode:{
        type: Sequelize.STRING,
        allowNull: true,
      }, 
      city:{
        type: Sequelize.STRING,
        allowNull: true,
      }, 
      country:{
        type: Sequelize.STRING,
        allowNull: true,
      }, 
      state:{
        type: Sequelize.STRING,
        allowNull: true,
      },
      created_at: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updated_at: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("users");
  },
};
