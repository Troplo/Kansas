const express = require("express")
const router = express.Router()
const { User, Project, Grid } = require("../models")
const auth = require("../lib/auth")
router.post("/", auth, async (req, res, next) => {
  try {
    const project = await Project.create({
      name: req.body.name,
      username: req.body.username,
      description: req.body.description,
      ownerId: req.user.id,
      ownerType: "user"
    })
    await Grid.create({
      projectId: project.id,
      name: "To-do",
      description: "To-do list",
      position: 0
    })
    await Grid.create({
      projectId: project.id,
      name: "In progress",
      description: "In progress list",
      position: 1
    })
    await Grid.create({
      projectId: project.id,
      name: "Completed",
      description: "Completed list",
      position: 2
    })
    res.json(project)
  } catch (e) {
    next(e)
  }
})

module.exports = router
