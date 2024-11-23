"use strict";
const { Model } = require("sequelize");
const { verificationType } = require("./verification-type");

module.exports = (sequelize, DataTypes) => {
  class VerificationLogs extends Model {

    static associate(models) {
      VerificationLogs.belongsTo(models.User, { foreignKey: "user_id", as: "user_details" });
      models.User.hasMany(VerificationLogs, { foreignKey: "user_id", as: "verifications" });
    }

    toJSON() {
      const values = { ...this.get() };
      delete values.id;
      delete values.user_id;
      return values;
    }

  }

  VerificationLogs.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      uuid: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
      },
      purpose: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      type: {
        type: DataTypes.ENUM(...verificationType.getValues()),
        allowNull: false,
      },
      otp: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      user_id: {
        type: DataTypes.INTEGER,
        ref: "users",
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      created_at: {
        allowNull: false,
        type: DataTypes.DATE,
        defaultValue: new Date(),
      },
      expires_at: {
        allowNull: false,
        type: DataTypes.DATE,
      },
      used_at: {
        type: DataTypes.DATE,
      },
    },
    {
      sequelize,
      modelName: "Verification",
      tableName: "verifications",
      updatedAt: false,
    }
  );
  return VerificationLogs;
};
