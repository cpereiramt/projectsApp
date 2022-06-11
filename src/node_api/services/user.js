const config = require("../configs/config.json");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const db = require("../configs/db-connection");

module.exports = {
  authenticate,
  getAll,
  getById,
  create,
};

async function authenticate({ email, password }) {
  const user = await db.User.scope("withHash").findOne({ where: { email } });

  if (!user || !(await bcrypt.compare(password, user.hash)))
    throw "Username or password is incorrect";

  const token = jwt.sign({ sub: user.userID }, config.secret, {
    expiresIn: "2d",
  });
  return { ...omitHash(user.get()), token };
}

async function getAll() {
  return await db.User.findAll();
}

async function getById(id) {
  return await getUser(id);
}

async function create(params) {
  // validate
  if (await db.User.findOne({ where: { email: params.email } })) {
    throw 'Email"' + params.email + '" is already registred for another user';
  }

  // hash password
  if (params.password) {
    params.hash = await bcrypt.hash(params.password, 10);
    console.log(params);
  }

  // save user
  await db.User.create(params);
}

// helper functions

async function getUser(id) {
  const user = await db.User.findByPk(id);
  if (!user) throw "User not found";
  return user;
}

function omitHash(user) {
  const { hash, ...userWithoutHash } = user;
  return userWithoutHash;
}
