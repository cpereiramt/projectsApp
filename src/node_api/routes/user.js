const express = require("express");

const useRouter = express.Router();

const {
  authenticate,
  register,
  getById,
  getCurrent,
  authenticateSchema,
  registerSchema,
} = require("../controllers/user");
const authorize = require("../middlewares/authorize");

useRouter.post("/authenticate", authenticateSchema, authenticate);
useRouter.post("/register", registerSchema, register);
useRouter.get("/current", authorize(), getCurrent);
useRouter.get("/:id", authorize(), getById);

module.exports = useRouter;
