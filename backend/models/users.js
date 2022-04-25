"use strict"
const { Model } = require("sequelize")

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {}
  }
  User.init(
    {
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
      email: {
        type: DataTypes.STRING,
        unique: {
          msg: "This email is already taken.",
          fields: ["email"],
          val: true
        },
        validate: {
          isEmail: {
            msg: "Please enter a valid email."
          }
        },
        allowNull: false
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false
      },
      emailVerified: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false
      },
      role: {
        type: DataTypes.ENUM(["user", "admin", "manager"]),
        allowNull: false,
        defaultValue: "user"
      },
      disabled: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false
      },
      avatar: {
        type: DataTypes.STRING,
        allowNull: true
      },
      totpSecret: {
        type: DataTypes.STRING,
        allowNull: true
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
      modelName: "User"
    }
  )

  return User
}
