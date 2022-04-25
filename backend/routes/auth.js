const express = require("express")
const router = express.Router()
const { User } = require("../models")
const { Op } = require("sequelize")
const argon2 = require("argon2")
const jwt = require("jsonwebtoken")
const Errors = require("../lib/errors")

router.post("/login", async (req, res, next) => {
  try {
    const user = await User.findOne({
      where: {
        [Op.or]: [{ email: req.body.username }, { username: req.body.username }]
      },
      attributes: { exclude: ["totpSecret"] }
    })
    if (user) {
      if (user.disabled) {
        throw Errors.userDisabled
      }
      const passwordMatch = await argon2
        .verify(user.password, req.body.password)
        .catch((err) => {
          console.log(err)
          throw Errors.invalidCredentials
        })
      if (passwordMatch) {
        const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET)
        res.json({
          token
        })
      } else {
        throw Errors.invalidCredentials
      }
    } else {
      throw Errors.invalidCredentials
    }
  } catch (e) {
    next(e)
  }
})

router.post("/register", async (req, res, next) => {
  try {
    if (JSON.parse(process.env.REGISTRATIONS_ENABLED)) {
      if (req.body.password.length < 8) {
        throw Errors.invalidParameter(
          "password",
          "Password must be at least 8 characters in length."
        )
      }
      const users = await User.count({})
      const user = await User.create({
        username: req.body.username,
        name: req.body.username,
        email: req.body.email,
        password: await argon2.hash(req.body.password),
        role: !!users ? "user" : "admin"
      })
      res.json({
        token: jwt.sign({ id: user.id }, process.env.JWT_SECRET)
      })
    } else {
      throw Errors.registrationsDisabled
    }
  } catch (e) {
    next(e)
  }
})

module.exports = router
