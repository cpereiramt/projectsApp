const { expressjwt: jwt } = require("express-jwt");
const { secret } = require("../configs/config.json");
const db = require("../configs/db-connection");

module.exports = authorize;

function authorize() {
  return [
    // authenticate JWT token and attach decoded token to request as req.user
    jwt({ secret: secret, algorithms: ["HS256"] }),

    // attach full user record to request object
    async (req, res, next) => {
      // console.warn(req.headers["authorization"], "dfasdfasdf", req.auth);
      // get user with id from token 'sub' (subject) property

      const user = await db.User.findByPk(req.auth.sub);

      // check user still exists
      if (!user) return res.status(401).json({ message: "Unauthorized" });

      // authorization successful
      req.user = user.get();
      next();
    },
  ];
}
