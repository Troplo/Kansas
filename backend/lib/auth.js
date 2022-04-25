const jwt = require("jsonwebtoken")
const Errors = require("./errors.js")
const { User } = require("../models")
const { Op } = require("sequelize")

module.exports = function (req, res, next) {
  try {
    const token = req.header("Authorization")

    if (token) {
      jwt
        .verify(token, process.env.JWT_SECRET, async (err, user) => {
          if (err) {
            res.status(401)
            res.json({
              errors: [
                {
                  name: "invalidJWT",
                  message:
                    "Your authorization token is invalid or has expired.",
                  status: 401
                }
              ]
            })
          } else {
            const account = await User.findOne({
              where: {
                id: user.id,
                disabled: false
              },
              attributes: {
                exclude: ["password", "totpSecret"]
              }
            })
            if (account) {
              req.user = account
              next()
            } else {
              res.status(401)
              res.json({
                errors: [
                  {
                    name: "invalidJWT",
                    message:
                      "Your authorization token is invalid or has expired.",
                    status: 401
                  }
                ]
              })
            }
          }
        })
        .catch(() => {
          res.status(401)
          res.json({
            errors: [
              {
                name: "invalidJWT",
                message: "Your authorization token is invalid or has expired.",
                status: 401
              }
            ]
          })
        })
    } else {
      res.status(401)
      res.json({
        errors: [
          {
            name: "invalidJWT",
            message: "Your authorization token is invalid or has expired.",
            status: 401
          }
        ]
      })
    }
  } catch (err) {
    res.status(401)
    res.json({
      errors: [
        {
          name: "invalidJWT",
          message: "Your authorization token is invalid or has expired.",
          status: 401
        }
      ]
    })
  }
}
