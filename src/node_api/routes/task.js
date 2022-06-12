const express = require("express");

const taskRouter = express.Router();
const authorize = require("../middlewares/authorize");

const { taskController } = require("../controllers");

taskRouter.post(
  "/create",
  authorize(),
  taskController.createSchema,
  taskController.create
);
taskRouter.delete("/:id", authorize(), taskController._delete);

taskRouter.get(
  "/getByProject/:projectID",
  authorize(),
  taskController.getAllTasksByProject
);

taskRouter.put("/:id", authorize(), taskController.update);
taskRouter.put("/finish/:id", authorize(), taskController.finishTask);

module.exports = taskRouter;
