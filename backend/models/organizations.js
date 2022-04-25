"use strict"
const { Model } = require("sequelize")

module.exports = (sequelize, DataTypes) => {
  class Organization extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {}
  }
  Organization.init(
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false
      },
      username: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: {
          msg: "This username is already taken.",
          fields: ["username"],
          val: true
        },
        validate: {
          is: {
            args: [/^[a-zA-Z0-9_]*$/],
            msg: "Your username may only contain alphanumeric characters."
          },
          len: {
            args: [2, 30],
            msg: "Your username must be between 2-20 characters."
          }
        }
      },
      avatar: {
        type: DataTypes.STRING,
        allowNull: true
      },
      disabled: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false
      },
      visibility: {
        type: DataTypes.ENUM(["public", "internal", "private"]),
        allowNull: false,
        defaultValue: "internal"
      },
      userId: {
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
      modelName: "Organization"
    }
  )

  return Organization
}
