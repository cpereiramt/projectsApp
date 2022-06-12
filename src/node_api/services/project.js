const db = require("../configs/db-connection");

module.exports = {
  create,
  _delete,
  getAllProjectsByUser,
  update,
};

async function create(params) {
  const { name, userId } = params;
  if (name) {
    const project = await db.Project.create(params);
    await project.addUser(userId);
    return project;
  }

  throw "Project name is required";
}

async function _delete(id, userId) {
  const project = await db.Project.findByPk(id);

  if (!project) throw "Project not found";
  await project
    .getUsers()
    .then((users) => {
      if (userId === users[0].dataValues.userID) {
        project.destroy();
      }
      if (userId !== users[0].dataValues.userID) {
        throw "Project not found for this user";
      }
    })
    .catch((err) => {
      throw err;
    });
}

async function getAllProjectsByUser(userId) {
  const user = await db.User.findByPk(userId);
  if (!user) throw "User not found";
  const projects = await user.getProjects();
  return projects;
}

async function update(id, params, userId) {
  const project = await db.Project.findByPk(id);
  if (!project) throw "Project not found";
  await project
    .getUsers()
    .then((users) => {
      if (userId === users[0].dataValues.userID) {
        project.update(params);
      }
      if (userId !== users[0].dataValues.userID) {
        throw "Project not found for this user";
      }
    })
    .catch((err) => {
      throw err;
    });

  return project;
}
