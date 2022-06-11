const userController = require("./user");
async function indexGet(req, res, next) {
  res.send("Hello World!");
}

module.exports = {
  get: indexGet,
  userController,
};
