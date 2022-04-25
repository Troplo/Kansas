const express = require("express")
const router = express.Router()
const { User, Organization, Member } = require("../models")
const { Op } = require("sequelize")
const auth = require("../lib/auth")

router.get("/", auth, async (req, res, next) => {
  try {
    // find all organizations that the user is a member of, and all organizations that have visibility of public
    const organizations = await Organization.findAll({
      where: {
        [Op.or]: [
          { visibility: "public" },
          { visibility: "internal" },
          {
            id: {
              [Op.in]: await Member.findAll({
                where: {
                  userId: req.user.id
                },
                attributes: ["organizationId"]
              })
            }
          }
        ]
      }
    })

    res.json(organizations)
  } catch (e) {
    next(e)
  }
})

router.post("/", auth, async (req, res, next) => {
  try {
    const organization = await Organization.create({
      name: req.body.name,
      username: req.body.username,
      description: req.body.description,
      visibility: req.body.visibility,
      userId: req.user.id
    })
    res.json(organization)
  } catch (e) {
    next(e)
  }
})

router.get("/:username", auth, async (req, res, next) => {
  try {
    const organization = await Organization.findOne({
      where: {
        username: req.params.username
      }
    })
    res.json(organization)
  } catch (e) {
    next(e)
  }
})

module.exports = router
