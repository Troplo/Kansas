const express = require("express")
const router = express.Router()
const { User } = require("../models")

router.get("/", async (req, res, next) => {
  try {
    const users = await User.count({})
    res.json({
      name: process.env.NAME,
      registrations: JSON.parse(process.env.REGISTRATIONS_ENABLED),
      accounts: !!users.length,
      requireEmailVerification: JSON.parse(
        process.env.REQUIRE_EMAIL_VERIFICATION
      )
    })
  } catch (e) {
    next(e)
  }
})

module.exports = router
