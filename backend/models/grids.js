"use strict"
const { Model } = require("sequelize")

module.exports = (sequelize, DataTypes) => {
  class Grid extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {}
  }
  Grid.init(
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false
      },
      description: {
        type: DataTypes.STRING,
        allowNull: true
      },
      projectId: {
        type: DataTypes.BIGINT,
        allowNull: false
      },
      position: {
        type: DataTypes.BIGINT,
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
      modelName: "Grid"
    }
  )

  return Grid
}
