const express = require("express")
const router = express.Router()
const { User, Organization } = require("../models")
const Errors = require("../lib/errors")
const auth = require("../lib/auth")

router.all("*", auth, async (req, res, next) => {
  try {
    if (req.user.role !== "admin") {
      throw Errors.unauthorized
    } else {
      next()
    }
  } catch (err) {
    next(err)
  }
})

router.get("/stats", auth, async (req, res, next) => {
  try {
    res.json({
      users: await User.count({}),
      admins: await User.count({ role: "admin" }),
      organizations: await Organization.count({}),
      system: {
        nodeVersion: process.version,
        platform: process.platform,
        arch: process.arch,
        uptime: process.uptime(),
        memoryUsage: process.memoryUsage(),
        cpuUsage: process.cpuUsage()
      }
    })
  } catch (e) {
    next(e)
  }
})

module.exports = router
