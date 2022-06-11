const express = require("express");
const indexRouter = express.Router();
const indexController = require("../controllers/index");
indexRouter.get("/", (req, res) => indexController.get(req, res));

module.exports = { indexRouter };
