const express = require("express");

const useRouter = express.Router();

const { userController } = require("../controllers");

const authorize = require("../middlewares/authorize");

useRouter.post(
  "/authenticate",
  userController.authenticateSchema,
  userController.authenticate
);
useRouter.post(
  "/register",
  userController.registerSchema,
  userController.register
);
useRouter.get("/current", authorize(), userController.getCurrent);
useRouter.get("/:id", authorize(), userController.getById);

module.exports = useRouter;
