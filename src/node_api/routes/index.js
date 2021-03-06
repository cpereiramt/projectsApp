const express = require("express");
const indexRouter = express.Router();
const userRouter = require("./user");
const projectRouter = require("./project");
const indexController = require("../controllers/index");
const taskRouter = require("./task");

indexRouter.get("/", (req, res) => indexController.get(req, res));

module.exports = { indexRouter, userRouter, projectRouter, taskRouter };
