const express = require("express");

const projectRouter = express.Router();
const authorize = require("../middlewares/authorize");

const { projectController } = require("../controllers");

projectRouter.post(
  "/create",
  authorize(),
  projectController.createSchema,
  projectController.create
);
projectRouter.delete("/:id", authorize(), projectController._delete);

projectRouter.get(
  "/getByUser",
  authorize(),
  projectController.getAllProjectsByUser
);

projectRouter.put(
  "/:id",
  authorize(),
  projectController.createSchema,
  projectController.update
);

module.exports = projectRouter;
