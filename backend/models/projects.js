"use strict"
const { Model } = require("sequelize")

module.exports = (sequelize, DataTypes) => {
  class Project extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {}
  }
  Project.init(
    {
      username: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false
      },
      description: {
        type: DataTypes.STRING,
        allowNull: true
      },
      avatar: {
        type: DataTypes.STRING,
        allowNull: true
      },
      visibility: {
        type: DataTypes.ENUM(["public", "internal", "private"]),
        allowNull: false,
        defaultValue: "internal"
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
      modelName: "Project"
    }
  )

  return Project
}
