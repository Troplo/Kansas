"use strict"
const { Model } = require("sequelize")

module.exports = (sequelize, DataTypes) => {
  class Member extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {}
  }
  Member.init(
    {
      userId: {
        type: DataTypes.BIGINT,
        allowNull: false,
        references: {
          model: "Users",
          key: "id"
        },
        onUpdate: "cascade",
        onDelete: "cascade"
      },
      organizationId: {
        type: DataTypes.BIGINT,
        allowNull: false
      },
      role: {
        type: DataTypes.ENUM,
        values: ["owner", "admin", "member", "viewer"],
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
      modelName: "Member"
    }
  )

  return Member
}
