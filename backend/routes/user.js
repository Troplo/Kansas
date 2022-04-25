const express = require("express")
const router = express.Router()
const { User } = require("../models")
const auth = require("../lib/auth")

router.get("/", auth, async (req, res, next) => {
  try {
    res.json(req.user)
  } catch (e) {
    next(e)
  }
})

module.exports = router
