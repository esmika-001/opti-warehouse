"use strict";
const { Model } = require("sequelize");
const bcrypt = require("bcrypt");
const { userStatus } = require("./user-status");

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    async comparePassword(password) {
      return await bcrypt.compare(password, this.password);
    }

    toJSON() {
      return this.get();
    }
  }
  User.init(
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      uuid: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: true,
        },
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: true,
        },
      },
      username: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
          notEmpty: true,
        },
      },
      status: {
        type: DataTypes.ENUM(...userStatus.getValues()),
        allowNull: false,
      },
      is_two_step_verification_enabled: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
      image: {
        type: DataTypes.STRING,
      },
      phone_no: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: true,
          isNumeric: true,
        },
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
          isEmail: true,
        },
      },
      pincode:{
        type: DataTypes.STRING,
        allowNull: true,
      }, 
      city:{
        type: DataTypes.STRING,
        allowNull: true,
      }, 
      country:{
        type: DataTypes.STRING,
        allowNull: true,
      }, 
      state:{
        type: DataTypes.STRING,
        allowNull: true,
      },
      created_at: {
        allowNull: false,
        type: DataTypes.DATE,
      },
      updated_at: {
        allowNull: false,
        type: DataTypes.DATE,
      },
    },
    {
      sequelize,
      modelName: "User",
      tableName: "users",
      hooks: {
        beforeSave: async (user, options) => {
          if (user.changed("password")) {
            const salt = await bcrypt.genSalt(10);
            user.password = await bcrypt.hash(user.password, salt);
          }
        },
      },
    }
  );
  return User;
};
