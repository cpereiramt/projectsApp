const { expressjwt: jwt } = require("express-jwt");
const { secret } = require("../configs/config.json");
const db = require("../configs/db-connection");

module.exports = authorize;

function authorize() {
  return [
    jwt({ secret: secret, algorithms: ["HS256"] }),

    async (req, res, next) => {
      const user = await db.User.findByPk(req.auth.sub);
      if (!user) return res.status(401).json({ message: "Unauthorized" });
      req.user = user.get();
      next();
    },
  ];
}
