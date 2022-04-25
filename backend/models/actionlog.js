"use strict"
const { Model } = require("sequelize")

module.exports = (sequelize, DataTypes) => {
  class ActionLog extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {}
  }
  ActionLog.init(
    {
      userId: {
        type: DataTypes.BIGINT,
        allowNull: false
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false
      },
      projectId: {
        type: DataTypes.BIGINT,
        allowNull: false
      },
      ownerId: {
        type: DataTypes.BIGINT,
        allowNull: false
      },
      ownerType: {
        type: DataTypes.ENUM(["user", "organization"]),
        allowNull: false
      },
      createdAt: {
        allowNull: false,
        type: DataTypes.DATE
      },
      updatedAt: {
        allowNull: false,
        type: DataTypes.DATE
      }
    },
    {
      sequelize,
      modelName: "ActionLog"
    }
  )

  return ActionLog
}
