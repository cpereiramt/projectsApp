const userController = require("./user");
const projectController = require("./project");
async function indexGet(req, res, next) {
  res.send("Hello World!");
}

module.exports = {
  get: indexGet,
  userController,
  projectController,
};
